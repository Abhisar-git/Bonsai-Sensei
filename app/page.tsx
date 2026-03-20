"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { quickPrompts, rituals, seasonNotes } from "@/lib/knowledge";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  stamp: string;
};

type Season = "Spring" | "Summer" | "Autumn" | "Winter";

const timeStamp = () =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());

const getSeason = (date = new Date()): Season => {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return "Spring";
  if (month >= 5 && month <= 7) return "Summer";
  if (month >= 8 && month <= 10) return "Autumn";
  return "Winter";
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

  const season = useMemo(() => getSeason(), []);
  const seasonNote = seasonNotes[season];

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
            <div className="brand-title">Bonsai Sensei</div>
            <div className="brand-subtitle">Quiet care companion</div>
          </div>
        </div>
        <div className="chip">Session ready</div>
      </header>

      <main className="layout">
        <section className="panel">
          <div>
            <h1 className="panel-title">A living studio for tiny forests.</h1>
            <p className="panel-lede">
              Bonsai Sensei is trained on bonsai care rituals and seasonal
              guidance. Ask about watering, repotting, design balance, or a
              specific species, and it will reply with calm, practical steps.
            </p>
          </div>

          <div className="chip-row">
            <span className="chip">Indoor Care</span>
            <span className="chip">Outdoor Care</span>
            <span className="chip">Seasonal Rhythm</span>
            <span className="chip">Design Flow</span>
          </div>

          <div className="card-grid">
            <div className="card">
              <div className="card-label">Season Lens</div>
              <div className="card-title">{season}</div>
              <p className="card-body">{seasonNote.detail}</p>
            </div>
            <div className="card">
              <div className="card-label">Current Focus</div>
              <div className="card-title">{seasonNote.focus}</div>
              <p className="card-body">
                Match pruning, watering, and feeding to the seasonal energy of
                the tree.
              </p>
            </div>
            <div className="card">
              <div className="card-label">Studio Mood</div>
              <div className="card-title">Slow and precise</div>
              <p className="card-body">
                Small adjustments, clean cuts, and steady observation.
              </p>
            </div>
          </div>

          <div>
            <div className="card-label">Daily Rituals</div>
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
            <span>Built for mindful caretaking.</span>
            <span>Ask as if you are standing at the bench.</span>
          </div>
        </section>

        <section className="chat-panel">
          <div className="chat-header">
            <h2>Care Session</h2>
            <div className="status">
              {isLoading ? "Listening" : "Ready"} - {season}
            </div>
          </div>

          <div className="chat-window">
            {messages.length === 0 ? (
              <div className="empty-state">
                <div className="empty-title">Begin with a clear observation.</div>
                <p className="empty-body">
                  The sensei listens best to details: species, light exposure,
                  watering rhythm, and the symptom you notice. Try one of these
                  prompts to start.
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
              placeholder="Describe your tree and the symptom you see..."
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
            Bonsai Sensei answers from a curated care library and adapts to your
            cues.
          </div>
        </section>
      </main>
    </div>
  );
}
