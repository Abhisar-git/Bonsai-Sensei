export type KnowledgeEntry = {
  id: string;
  title: string;
  tags: string[];
  summary: string;
  tips: string[];
  phase: "Hook" | "Build" | "Reversal" | "Finale" | "Any";
};

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "inciting-disturbance",
    title: "Inciting Disturbance",
    tags: ["inciting", "hook", "opening", "disturbance"],
    summary:
      "Start with a disruption that cannot be ignored and forces the protagonist to move.",
    tips: [
      "Open with a question the reader must answer.",
      "Let the disruption reveal a flaw or fear.",
      "Aim for forward motion by the end of page one.",
    ],
    phase: "Hook",
  },
  {
    id: "stakes-escalation",
    title: "Stakes Escalation",
    tags: ["stakes", "escalation", "risk", "pressure"],
    summary:
      "Raise the cost of failure every few scenes so tension climbs instead of loops.",
    tips: [
      "Escalate externally and internally at the same time.",
      "Turn a private problem into a public consequence.",
      "Track what is lost each time the protagonist fails.",
    ],
    phase: "Build",
  },
  {
    id: "ticking-clock",
    title: "Ticking Clock",
    tags: ["deadline", "clock", "time", "race"],
    summary:
      "A clear deadline compresses decisions and makes every delay costly.",
    tips: [
      "State the deadline early and remind the reader often.",
      "Make the clock visible through tangible markers.",
      "Shorten the time window after a major setback.",
    ],
    phase: "Build",
  },
  {
    id: "information-asymmetry",
    title: "Information Asymmetry",
    tags: ["mystery", "reveal", "withhold", "secrets"],
    summary:
      "Control what the reader knows versus what the protagonist knows to sustain suspense.",
    tips: [
      "Give the reader one clue more than the hero in key moments.",
      "Withhold the motive, not the action.",
      "Reveal new information only when it changes a decision.",
    ],
    phase: "Build",
  },
  {
    id: "misdirection",
    title: "Misdirection and Red Herrings",
    tags: ["misdirection", "red herring", "false lead"],
    summary:
      "Plant believable false leads that are motivated by character and theme.",
    tips: [
      "Every red herring should still move the plot forward.",
      "Tie false leads to a character need or bias.",
      "Pay off the clue later even if it was wrong.",
    ],
    phase: "Build",
  },
  {
    id: "reversal",
    title: "Midpoint Reversal",
    tags: ["midpoint", "reversal", "twist"],
    summary:
      "A reversal changes the stakes, the plan, or the meaning of earlier scenes.",
    tips: [
      "Make the reversal inevitable in hindsight.",
      "Shift the protagonist from reactive to proactive.",
      "Let the reversal expose the true antagonist force.",
    ],
    phase: "Reversal",
  },
  {
    id: "pressure-cooker",
    title: "Pressure-Cooker Scenes",
    tags: ["scene", "pressure", "conflict"],
    summary:
      "Build scenes where the protagonist must choose between two bad options.",
    tips: [
      "End the scene on a decision, not a result.",
      "Keep the conflict personal, not just procedural.",
      "Let every choice reveal character.",
    ],
    phase: "Any",
  },
  {
    id: "character-vulnerability",
    title: "Character Vulnerability",
    tags: ["character", "wound", "fear", "backstory"],
    summary:
      "Suspense lands harder when the protagonist has a private fear at stake.",
    tips: [
      "Expose the wound in a quiet scene before the danger spikes.",
      "Use the antagonist to press on that specific fear.",
      "Make the final choice require growth.",
    ],
    phase: "Any",
  },
  {
    id: "pacing-variation",
    title: "Pacing Variation",
    tags: ["pacing", "rhythm", "tempo"],
    summary:
      "Alternate tight, fast beats with slower investigative beats to keep tension elastic.",
    tips: [
      "Shorten sentences in action, lengthen in reflection.",
      "End chapters on an unanswered question.",
      "Cut to the next scene before the emotion cools.",
    ],
    phase: "Any",
  },
  {
    id: "set-piece",
    title: "Set-Piece Design",
    tags: ["set piece", "sequence", "setpiece"],
    summary:
      "Anchor each act with a memorable sequence that escalates the threat.",
    tips: [
      "Give every set-piece a fresh location and new obstacle.",
      "Let the antagonist gain ground during the set-piece.",
      "Finish with a hard consequence, not a neat escape.",
    ],
    phase: "Reversal",
  },
  {
    id: "clue-chain",
    title: "Clue Chain",
    tags: ["clues", "trail", "investigation"],
    summary:
      "Link clues so each discovery forces a new action instead of a recap.",
    tips: [
      "Each clue should narrow the field, not widen it.",
      "Avoid info dumps; let clues show up mid-conflict.",
      "A clue should always cost something to obtain.",
    ],
    phase: "Build",
  },
  {
    id: "antagonist-shadow",
    title: "Antagonist Shadow",
    tags: ["antagonist", "villain", "shadow"],
    summary:
      "Keep the antagonist present through consequences, not just appearances.",
    tips: [
      "Show the damage before the villain appears.",
      "Let the antagonist have a clear, rational goal.",
      "Give the antagonist leverage over the protagonist.",
    ],
    phase: "Any",
  },
  {
    id: "final-choice",
    title: "Final Choice",
    tags: ["finale", "choice", "climax"],
    summary:
      "The climax lands when the protagonist must choose between two costly truths.",
    tips: [
      "Make the final action echo the opening question.",
      "Pay off at least one seeded clue in the climax.",
      "Let the cost of victory be visible.",
    ],
    phase: "Finale",
  },
  {
    id: "twist-logic",
    title: "Twist Logic",
    tags: ["twist", "reveal", "surprise"],
    summary:
      "Great twists feel surprising in the moment and inevitable in hindsight.",
    tips: [
      "Plant three quiet clues and one loud distraction.",
      "The twist should change the protagonist's plan.",
      "Avoid twists that negate emotional investment.",
    ],
    phase: "Finale",
  },
  {
    id: "moral-geometry",
    title: "Moral Geometry",
    tags: ["theme", "ethics", "moral"],
    summary:
      "A thriller resonates when the ethical stakes match the external stakes.",
    tips: [
      "Give the hero a line they do not want to cross.",
      "Let the antagonist offer a tempting shortcut.",
      "Tie the final choice to the theme.",
    ],
    phase: "Any",
  },
  {
    id: "scene-engine",
    title: "Scene Engine",
    tags: ["scene", "goal", "conflict", "disaster"],
    summary:
      "Every scene should have a clear goal, a complication, and a shift at the end.",
    tips: [
      "Start late, end early.",
      "Let a scene end on a new problem, not a solved one.",
      "Escalate the danger or the moral cost.",
    ],
    phase: "Any",
  },
  {
    id: "dialogue-pressure",
    title: "Dialogue Under Pressure",
    tags: ["dialogue", "subtext", "interrogation"],
    summary:
      "Great thriller dialogue is double-meaning: what is said and what is threatened.",
    tips: [
      "Give each speaker a private objective.",
      "Use short lines when power shifts.",
      "Let silence do work.",
    ],
    phase: "Any",
  },
];

export const quickPrompts = [
  "Give me a suspense hook for a missing-person thriller.",
  "How do I build a ticking clock in Act 2?",
  "Help me design a midpoint reversal that feels earned.",
  "What makes a twist feel inevitable, not cheap?",
  "My scenes feel flat. How do I add pressure?",
  "Teach me a structure to pace a psychological thriller.",
];

export const rituals = [
  { name: "Cold open", detail: "Start with danger and an unanswered question." },
  { name: "Pressure pass", detail: "Raise stakes or moral cost every scene." },
  { name: "Clue audit", detail: "Track reveals and what each changes." },
];

export const phaseNotes: Record<
  "Hook" | "Build" | "Reversal" | "Finale",
  { focus: string; detail: string }
> = {
  Hook: {
    focus: "Disruption and curiosity",
    detail: "Hook the reader with a sharp disturbance and a driving question.",
  },
  Build: {
    focus: "Escalation and pressure",
    detail: "Raise stakes, compress time, and tighten the net around the hero.",
  },
  Reversal: {
    focus: "Meaning shifts",
    detail: "A reveal or twist changes the plan and forces a new strategy.",
  },
  Finale: {
    focus: "Confrontation and cost",
    detail: "Deliver the choice that tests the hero's values and resolves the question.",
  },
};
