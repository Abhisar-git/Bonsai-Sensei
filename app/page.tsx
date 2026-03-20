"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { quickPrompts, rituals, phaseNotes } from "@/lib/knowledge";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  stamp: string;
};

type Phase = "Hook" | "Build" | "Reversal" | "Finale";

const timeStamp = () =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());

const getPhase = (date = new Date()): Phase => {
  const month = date.getMonth();
  if (month >= 0 && month <= 2) return "Hook";
  if (month >= 3 && month <= 5) return "Build";
  if (month >= 6 && month <= 8) return "Reversal";
  return "Finale";
};

const makeId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const phase = useMemo(() => getPhase(), []);
  const phaseNote = phaseNotes[phase];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const newMessage: ChatMessage = {
      id: makeId(),
      role: "user",
      content: trimmed,
      stamp: timeStamp(),
    };

    const nextMessages = [...messages, newMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      const replyMessage: ChatMessage = {
        id: makeId(),
        role: "assistant",
        content: data.reply,
        sources: data.sources,
        stamp: timeStamp(),
      };

      setMessages((prev) => [...prev, replyMessage]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" />
          <div>
            <div className="brand-title">Suspense Studio</div>
            <div className="brand-subtitle">Thriller craft companion</div>
          </div>
        </div>
        <div className="chip">Writer mode</div>
      </header>

      <main className="layout">
        <section className="panel">
          <div>
            <h1 className="panel-title">A calm room for dangerous stories.</h1>
            <p className="panel-lede">
              Suspense Studio is trained on high-tension thriller techniques.
              Ask about hooks, stakes, reversals, and scene pressure, and it
              will answer with practical steps and a clear next move.
            </p>
          </div>

          <div className="chip-row">
            <span className="chip">Hook Craft</span>
            <span className="chip">Tension Curve</span>
            <span className="chip">Twist Logic</span>
            <span className="chip">Scene Pressure</span>
          </div>

          <div className="card-grid">
            <div className="card">
              <div className="card-label">Phase Lens</div>
              <div className="card-title">{phase}</div>
              <p className="card-body">{phaseNote.detail}</p>
            </div>
            <div className="card">
              <div className="card-label">Current Focus</div>
              <div className="card-title">{phaseNote.focus}</div>
              <p className="card-body">
                Align the reveal, the pressure, and the choice in each scene.
              </p>
            </div>
            <div className="card">
              <div className="card-label">Studio Mood</div>
              <div className="card-title">Clear and relentless</div>
              <p className="card-body">
                Cut the soft beats, keep the threat present, and move fast.
              </p>
            </div>
          </div>

          <div>
            <div className="card-label">Draft Rituals</div>
            <div className="ritual-list">
              {rituals.map((ritual) => (
                <div className="ritual" key={ritual.name}>
                  <span>{ritual.name}</span>
                  <span>{ritual.detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-footer">
            <span>Built for tension you can feel.</span>
            <span>Bring a scene. Leave with a sharper edge.</span>
          </div>
        </section>

        <section className="chat-panel">
          <div className="chat-header">
            <h2>Story Session</h2>
            <div className="status">
              {isLoading ? "Listening" : "Ready"} - {phase}
            </div>
          </div>

          <div className="chat-window">
            {messages.length === 0 ? (
              <div className="empty-state">
                <div className="empty-title">Start with the danger.</div>
                <p className="empty-body">
                  The studio listens best to specifics: protagonist goal,
                  antagonist pressure, and what the reader must fear. Try one of
                  these prompts to begin.
                </p>
                <div className="prompt-grid">
                  {quickPrompts.map((prompt) => (
                    <button
                      className="prompt-chip"
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.role}`}
                >
                  {message.content}
                  <div className="message-meta">
                    <span>{message.stamp}</span>
                    {message.sources?.map((source) => (
                      <span className="source-pill" key={source}>
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="typing" aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {error && <div className="error">{error}</div>}

          <form className="chat-input" onSubmit={handleSubmit}>
            <textarea
              placeholder="Describe your premise or the scene that needs tension..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage(input);
                }
              }}
            />
            <button className="send-button" type="submit" disabled={isLoading}>
              Send
            </button>
          </form>

          <div className="footer-note">
            Suspense Studio answers from a curated thriller craft library.
          </div>
        </section>
      </main>
    </div>
  );
}
