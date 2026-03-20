export type KnowledgeEntry = {
  id: string;
  title: string;
  tags: string[];
  summary: string;
  tips: string[];
  season: "Spring" | "Summer" | "Autumn" | "Winter" | "Any";
};

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "watering-rhythm",
    title: "Watering Rhythm",
    tags: ["water", "moisture", "dry", "soil", "thirst"],
    summary:
      "Water when the top layer feels dry, then soak fully until water runs clear from the drain holes.",
    tips: [
      "Use a chopstick or bamboo skewer to check moisture near the roots.",
      "Hot, windy days can need a second pass; cool days often need less.",
      "Never follow a calendar alone. Follow the soil and the leaves.",
    ],
    season: "Any",
  },
  {
    id: "light-mapping",
    title: "Light Mapping",
    tags: ["light", "sun", "window", "shade", "brightness"],
    summary:
      "Most bonsai want bright light, but intensity and duration change by species and season.",
    tips: [
      "Rotate the pot weekly so growth stays balanced.",
      "If leaves stretch or pale, increase light slowly over 7 to 10 days.",
      "Outdoor trees need outdoor light. Indoor trees tolerate bright windows.",
    ],
    season: "Any",
  },
  {
    id: "soil-drainage",
    title: "Soil and Drainage",
    tags: ["soil", "akadama", "pumice", "drainage", "roots"],
    summary:
      "Fast draining soil keeps roots healthy by cycling air and water.",
    tips: [
      "A simple blend is akadama, pumice, and lava rock at roughly equal parts.",
      "If water pools on top, soil is breaking down and needs a refresh.",
      "Avoid garden soil, which compacts quickly.",
    ],
    season: "Any",
  },
  {
    id: "repotting-window",
    title: "Repotting Window",
    tags: ["repot", "roots", "spring", "pot", "soil"],
    summary:
      "Repot in early spring as buds swell, before strong leaf or needle push.",
    tips: [
      "Trim no more than one third of the roots at a time.",
      "Anchor the tree firmly so new feeder roots can set.",
      "Skip fertilizer for two weeks after repotting.",
    ],
    season: "Spring",
  },
  {
    id: "pruning-basics",
    title: "Pruning Basics",
    tags: ["prune", "trim", "branch", "shape"],
    summary:
      "Prune for structure first, then refine for density and pad shape.",
    tips: [
      "Cut to a side shoot to keep growth moving in the right direction.",
      "Thin crowded nodes so light reaches the inner canopy.",
      "Seal large cuts on sensitive species.",
    ],
    season: "Any",
  },
  {
    id: "wiring-technique",
    title: "Wiring Technique",
    tags: ["wire", "shape", "bend", "training"],
    summary:
      "Wire is for gentle, incremental bends. Think slow curves, not sharp angles.",
    tips: [
      "Choose wire thickness near one third of the branch thickness.",
      "Check monthly so the wire does not bite into bark.",
      "Remove wire as soon as the branch holds its line.",
    ],
    season: "Any",
  },
  {
    id: "fertilizing",
    title: "Fertilizing Cadence",
    tags: ["fertilizer", "feed", "nutrients"],
    summary:
      "Feed during active growth with a balanced fertilizer and taper off in late fall.",
    tips: [
      "Use lower nitrogen when you want tighter internodes.",
      "Skip feeding if the tree is stressed, repotted, or sick.",
      "Organic cakes give a slower, steadier release.",
    ],
    season: "Spring",
  },
  {
    id: "winter-protection",
    title: "Winter Protection",
    tags: ["winter", "frost", "dormancy", "cold"],
    summary:
      "Dormant trees need cold, but shallow pots freeze faster than the ground.",
    tips: [
      "Shelter from hard wind and drying sun on frozen days.",
      "Mulch the pot or heel it into the ground for insulation.",
      "Water lightly on warm days when soil thaws.",
    ],
    season: "Winter",
  },
  {
    id: "pest-control",
    title: "Pest Patrol",
    tags: ["pests", "aphids", "mites", "scale"],
    summary:
      "Early detection matters. Check leaf undersides and new shoots every week.",
    tips: [
      "Rinse foliage with a firm spray before using any treatment.",
      "Use insecticidal soap for soft-bodied pests.",
      "Isolate new trees for two weeks to avoid spreading issues.",
    ],
    season: "Any",
  },
  {
    id: "ficus-care",
    title: "Ficus Care",
    tags: ["ficus", "indoor", "tropical"],
    summary:
      "Ficus likes warmth, steady light, and a slightly moist root zone.",
    tips: [
      "Keep above 60 F and away from cold drafts.",
      "Prune after a flush of growth for best back budding.",
      "Defoliation is optional and should be partial for beginners.",
    ],
    season: "Any",
  },
  {
    id: "juniper-care",
    title: "Juniper Care",
    tags: ["juniper", "outdoor", "conifer"],
    summary:
      "Junipers must live outdoors and love full sun with good airflow.",
    tips: [
      "Never bring them indoors for more than a couple of days.",
      "Water only when the soil is slightly dry.",
      "Avoid heavy pruning in late fall.",
    ],
    season: "Any",
  },
  {
    id: "maple-care",
    title: "Maple Care",
    tags: ["maple", "deciduous", "ramification"],
    summary:
      "Japanese maples like morning sun, afternoon shade, and even moisture.",
    tips: [
      "Protect delicate leaves from scorching midday sun.",
      "Cut back to two nodes to keep tight structure.",
      "Leaf size reduces as the tree gains health and density.",
    ],
    season: "Any",
  },
  {
    id: "pine-care",
    title: "Pine Care",
    tags: ["pine", "candles", "needles"],
    summary:
      "Pines respond to timing. Candle work and needle plucking happen in specific windows.",
    tips: [
      "Cut candles on strong areas first to balance energy.",
      "Needle plucking improves light and airflow.",
      "Avoid heavy work in high summer heat.",
    ],
    season: "Summer",
  },
  {
    id: "azalea-care",
    title: "Azalea Care",
    tags: ["azalea", "flower", "acidic"],
    summary:
      "Azaleas want acidic soil, filtered light, and steady moisture.",
    tips: [
      "Prune right after flowering to protect next year buds.",
      "Use rainwater or low mineral water when possible.",
      "Protect from late frosts when buds are swelling.",
    ],
    season: "Spring",
  },
  {
    id: "jade-care",
    title: "Jade and Portulacaria",
    tags: ["jade", "succulent", "indoors"],
    summary:
      "Succulent bonsai need strong light and fast draining soil, with dry gaps between waterings.",
    tips: [
      "Let soil dry almost completely before watering again.",
      "Pinch tips to keep compact pads.",
      "Protect from cold and overwatering in winter.",
    ],
    season: "Any",
  },
  {
    id: "moss-top",
    title: "Moss Top Dressing",
    tags: ["moss", "surface", "aesthetic"],
    summary:
      "Moss keeps moisture even and gives a finished look, but it can hide soil issues.",
    tips: [
      "Use a thin layer so you can still read the soil.",
      "Remove moss temporarily if fungus gnats appear.",
      "Keep moss trimmed so it does not climb the trunk.",
    ],
    season: "Any",
  },
  {
    id: "root-rot",
    title: "Root Rot Rescue",
    tags: ["root rot", "yellow", "dropping", "mushy"],
    summary:
      "Soft roots and yellowing foliage usually mean the roots are staying wet too long.",
    tips: [
      "Unpot to inspect roots. Trim dark, mushy sections.",
      "Repot into fresh, fast draining soil and reduce watering.",
      "Increase airflow and light while the tree recovers.",
    ],
    season: "Any",
  },
  {
    id: "design-principles",
    title: "Design Principles",
    tags: ["design", "taper", "nebari", "balance"],
    summary:
      "Strong bonsai read clearly: good trunk taper, visible surface roots, and balanced negative space.",
    tips: [
      "Aim for a clear front and a single flow direction.",
      "Keep first branches strong and lower, then reduce size upward.",
      "Leave windows so light hits inner foliage.",
    ],
    season: "Any",
  },
  {
    id: "display-rotation",
    title: "Display and Rotation",
    tags: ["display", "rotation", "turntable"],
    summary:
      "Rotate display for even growth and choose a stand that matches the tree mood.",
    tips: [
      "Rotate weekly in active growth, monthly in winter.",
      "Use darker stands for light bark, lighter stands for heavy trunks.",
      "Keep the tree slightly off center for balance.",
    ],
    season: "Any",
  },
  {
    id: "tool-kit",
    title: "Tool Kit",
    tags: ["tools", "shears", "concave", "cutters"],
    summary:
      "A sharp tool set makes cleaner cuts and faster healing.",
    tips: [
      "Starter kit: twig shears, concave cutter, wire cutter, chopstick.",
      "Wipe tools after each session to prevent rust.",
      "Sharpen blades before big pruning days.",
    ],
    season: "Any",
  },
];

export const quickPrompts = [
  "My juniper looks dry but the soil feels damp. What now?",
  "Walk me through a spring repot for a maple.",
  "How do I reduce leaf size on a ficus?",
  "What is a safe winter setup for an outdoor pine?",
  "Why are my azalea leaves yellowing?",
  "Teach me the basics of bonsai design principles.",
];

export const rituals = [
  { name: "Morning mist", detail: "Check soil, lift pot, feel weight." },
  { name: "Noon sun", detail: "Rotate 30 degrees for balance." },
  { name: "Evening calm", detail: "Inspect pests, clean tools." },
];

export const seasonNotes: Record<
  "Spring" | "Summer" | "Autumn" | "Winter",
  { focus: string; detail: string }
> = {
  Spring: {
    focus: "Bud push and repotting",
    detail: "Watch swelling buds and reset soil before strong growth.",
  },
  Summer: {
    focus: "Energy control",
    detail: "Balance strong and weak areas with selective pruning.",
  },
  Autumn: {
    focus: "Refinement",
    detail: "Thin crowded growth and prep for dormancy.",
  },
  Winter: {
    focus: "Protection",
    detail: "Shield roots from freeze and keep soil lightly moist.",
  },
};
