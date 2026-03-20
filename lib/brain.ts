import { knowledgeBase, phaseNotes } from "./knowledge";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type Phase = "Hook" | "Build" | "Reversal" | "Finale";

type ReplyPayload = {
  reply: string;
  sources: string[];
  phase: Phase;
};

const greetings = [
  "Welcome. Tell me the premise and the danger at the center.",
  "Good. What secret are you keeping from the reader right now?",
  "I am listening. Give me the protagonist, the fear, and the clock.",
];

const gratitudeReplies = [
  "Anytime. Tighten the next scene and send it over.",
  "Glad to help. Push the pressure one beat further.",
  "Always. Keep the suspense honest and the choices costly.",
];

const followUps = [
  "What is the protagonist afraid to lose?",
  "Where does the ticking clock show up on the page?",
  "Which scene is your current midpoint reversal?",
  "What decision ends your last chapter?",
];

const helpReply = `I can help with hooks, escalations, twists, pacing, and scene diagnostics.

Try asking:
- "Give me a hook for a locked-room thriller"
- "How do I design a midpoint reversal?"
- "Why do my scenes feel low tension?"`;

const urgencyTriggers = [
  "stuck",
  "flat",
  "boring",
  "slow",
  "no tension",
  "no stakes",
  "confusing",
];
const helpTriggers = ["help", "topics", "what can you do", "guide", "menu"];
const thanksTriggers = ["thanks", "thank you", "appreciate"];
const greetingTriggers = ["hi", "hello", "hey", "greetings", "good morning", "good evening"];

const synonymMap: Record<string, string[]> = {
  hook: ["opening", "inciting", "disturbance"],
  stakes: ["risk", "pressure", "cost"],
  twist: ["reversal", "reveal", "surprise"],
  clock: ["deadline", "time", "ticking"],
  clues: ["trail", "investigation", "mystery"],
  pacing: ["rhythm", "tempo"],
};

const pick = (items: string[]) => items[Math.floor(Math.random() * items.length)];

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (text: string) => {
  const base = normalize(text)
    .split(" ")
    .filter((token) => token.length > 1);
  const expanded = new Set(base);
  base.forEach((token) => {
    Object.entries(synonymMap).forEach(([key, synonyms]) => {
      if (token === key || synonyms.includes(token)) {
        expanded.add(key);
        synonyms.forEach((syn) => expanded.add(syn));
      }
    });
  });
  return Array.from(expanded);
};

const hasAny = (text: string, triggers: string[]) =>
  triggers.some((trigger) => text.includes(trigger));

const getPhase = (date = new Date()): Phase => {
  const month = date.getMonth();
  if (month >= 0 && month <= 2) return "Hook";
  if (month >= 3 && month <= 5) return "Build";
  if (month >= 6 && month <= 8) return "Reversal";
  return "Finale";
};

const rankKnowledge = (text: string) => {
  const tokens = tokenize(text);
  return knowledgeBase
    .map((entry) => {
      const title = entry.title.toLowerCase();
      const tags = entry.tags.map((tag) => tag.toLowerCase());
      const summary = entry.summary.toLowerCase();
      let score = 0;
      tokens.forEach((token) => {
        if (title.includes(token)) score += 3;
        if (tags.some((tag) => tag.includes(token))) score += 2;
        if (summary.includes(token)) score += 1;
      });
      return { entry, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.entry);
};

export const craftReply = (messages: ChatMessage[]): ReplyPayload => {
  const lastUser = [...messages].reverse().find((message) => message.role === "user");
  const phase = getPhase();

  if (!lastUser || !lastUser.content.trim()) {
    return {
      reply:
        "Give me your premise in one sentence and the threat in one sentence.",
      sources: [],
      phase,
    };
  }

  const cleaned = normalize(lastUser.content);

  if (hasAny(cleaned, greetingTriggers) && cleaned.split(" ").length < 5) {
    return {
      reply: `${pick(greetings)}\n\n${pick(followUps)}`,
      sources: [],
      phase,
    };
  }

  if (hasAny(cleaned, thanksTriggers)) {
    return {
      reply: pick(gratitudeReplies),
      sources: [],
      phase,
    };
  }

  if (hasAny(cleaned, helpTriggers)) {
    return {
      reply: helpReply,
      sources: [],
      phase,
    };
  }

  const matches = rankKnowledge(cleaned).slice(0, 3);
  const phaseNote = phaseNotes[phase];
  const urgent = hasAny(cleaned, urgencyTriggers);

  const intro = `Phase focus: ${phase} - ${phaseNote.focus}. ${phaseNote.detail}`;
  const responseParts: string[] = [intro];

  if (matches.length) {
    responseParts.push(
      "Here is what fits your note:",
      matches.map((match) => `- ${match.title}: ${match.summary}`).join("\n")
    );

    const topTips = matches[0].tips.slice(0, 2).map((tip) => `- ${tip}`);
    responseParts.push("Try this next:", topTips.join("\n"));
  } else {
    responseParts.push(
      "I can be more precise with a few details: protagonist goal, antagonist pressure, and the current scene outcome."
    );
  }

  if (urgent) {
    responseParts.push(
      "Rapid fix: add a clock, force a hard choice, and end the scene on a cost that cannot be undone."
    );
  }

  responseParts.push(pick(followUps));

  return {
    reply: responseParts.join("\n\n"),
    sources: matches.map((match) => match.title),
    phase,
  };
};
