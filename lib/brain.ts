import { knowledgeBase, seasonNotes } from "./knowledge";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type Season = "Spring" | "Summer" | "Autumn" | "Winter";

type ReplyPayload = {
  reply: string;
  sources: string[];
  season: Season;
};

const greetings = [
  "Welcome. Set your tree on the bench and tell me what you see.",
  "Good to see you. What is the tree asking for today?",
  "I am here. Describe the tree, and we will take it step by step.",
];

const gratitudeReplies = [
  "Anytime. Keep me posted on how the tree responds.",
  "Glad to help. One calm adjustment at a time.",
  "Always. Small moves create big change in bonsai.",
];

const followUps = [
  "What species are you working with?",
  "Is this tree indoors or outdoors?",
  "How long has it been in the current pot and soil?",
  "What does the new growth look like right now?",
];

const helpReply = `I can help with watering rhythm, light placement, pruning, wiring, repot timing, and troubleshooting.

Try asking:
- "My leaves are yellowing and soft"
- "Should I repot a juniper in spring?"
- "How do I reduce leaf size on a ficus?"`;

const urgentTriggers = ["dying", "dropping", "yellow", "brown", "mushy", "soft", "wilting", "shrivel"];
const helpTriggers = ["help", "topics", "what can you do", "guide", "menu"];
const thanksTriggers = ["thanks", "thank you", "appreciate"];
const greetingTriggers = ["hi", "hello", "hey", "greetings", "good morning", "good evening"];

const synonymMap: Record<string, string[]> = {
  water: ["watering", "moist", "moisture", "thirst"],
  light: ["sun", "sunlight", "bright", "shade"],
  soil: ["akadama", "pumice", "lava"],
  repot: ["repotting", "root", "roots"],
  pests: ["aphids", "mites", "scale", "bugs"],
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

const getSeason = (date = new Date()): Season => {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return "Spring";
  if (month >= 5 && month <= 7) return "Summer";
  if (month >= 8 && month <= 10) return "Autumn";
  return "Winter";
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
  const season = getSeason();

  if (!lastUser || !lastUser.content.trim()) {
    return {
      reply:
        "Tell me about your tree: species, where it lives, and what you are noticing.",
      sources: [],
      season,
    };
  }

  const cleaned = normalize(lastUser.content);

  if (hasAny(cleaned, greetingTriggers) && cleaned.split(" ").length < 5) {
    return {
      reply: `${pick(greetings)}\n\n${pick(followUps)}`,
      sources: [],
      season,
    };
  }

  if (hasAny(cleaned, thanksTriggers)) {
    return {
      reply: pick(gratitudeReplies),
      sources: [],
      season,
    };
  }

  if (hasAny(cleaned, helpTriggers)) {
    return {
      reply: helpReply,
      sources: [],
      season,
    };
  }

  const matches = rankKnowledge(cleaned).slice(0, 3);
  const seasonalNote = seasonNotes[season];
  const urgent = hasAny(cleaned, urgentTriggers);

  const intro = `Season focus: ${season} - ${seasonalNote.focus}. ${seasonalNote.detail}`;
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
      "I can be more precise with a few details: species, pot size, light exposure, and the symptom timeline."
    );
  }

  if (urgent) {
    responseParts.push(
      "Urgent care: pause heavy pruning, move the tree to bright shade, and check the roots for sour smell or mushy sections."
    );
  }

  responseParts.push(pick(followUps));

  return {
    reply: responseParts.join("\n\n"),
    sources: matches.map((match) => match.title),
    season,
  };
};
