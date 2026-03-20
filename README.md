# Bonsai Sensei

A purpose-built bonsai care chatbot that feels like a calm studio session. It pairs a curated care library with a focused UI so the conversation stays grounded in observation, seasonality, and craft.

## Why Bonsai

Bonsai care is equal parts ritual and precision. It creates a natural set of constraints, a clear seasonal rhythm, and a visual language that can be reflected in the UI.

## Features

- Curated knowledge base with species, seasonal care, and troubleshooting
- Calm, purpose-built chat experience with empty, loading, and error states
- Seasonal lens panel and daily rituals to guide the user
- Fully responsive layout ready for Vercel deployment

## Run Locally

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

## Customize the Knowledge Base

Edit `lib/knowledge.ts` to add new species, tips, and prompts. The chat logic lives in `lib/brain.ts`.

## Deployment

Deploy with Vercel or any Next.js hosting. No external API keys are required.

## Submission Checklist

- Live deployment link
- Public GitHub repo with this README
- Loom walkthrough video (5 to 10 min)

## Loom Walkthrough Outline

- Explain the topic choice and how the UI reflects bonsai rituals
- Demo empty, loading, and error states in the chat
- Walk through `lib/knowledge.ts` and `lib/brain.ts`
- Share any AI tooling you used to speed up UI iteration

## Design Notes

- Display typography uses a serif to mimic traditional bonsai journals
- The chat pane uses soft paper textures and muted greens for calm focus
- Motion is limited to subtle float and typing cues to avoid distraction
