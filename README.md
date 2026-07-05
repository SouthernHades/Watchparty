# WatchParty — Live Event Chat Rooms

Watch together, react together. WatchParty is a real-time chat platform where fans join live rooms for sports, reality TV, and entertainment events to share reactions, vote in polls, and experience every moment with their community.

## Features

- **Real-time chat rooms** — Instant messaging for each live event, with emoji picker and message reactions.
- **Live polls & predictions** — Vote on outcomes and see how your picks stack up against the room.
- **Auto-synced events** — A Vercel cron job pulls live scores/status from the ESPN API every 5 minutes across NFL, NBA, MLB, NHL, UFC, soccer (MLS/EPL/UCL), golf, and college sports, plus manually scheduled reality shows (Survivor, The Bachelor).
- **Automatic room lifecycle** — Rooms open 10 minutes before start time and transition through `scheduled → open → live → ended` automatically.
- **Authentication** — Email/password auth and user profiles powered by Supabase.
- **Light/dark theme** — Theme toggle with `next-themes`.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui (Radix primitives)
- **Backend / Auth / DB:** Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
- **Data source:** ESPN public scoreboard API
- **Scheduling:** Vercel Cron
- **Analytics:** Vercel Analytics

## Project Structure

```
app/
  api/
    cron/sync-sports/   # Cron route: syncs events & updates statuses (every 5 min)
    seed-events/        # Seed route for populating events
  auth/                 # login, sign-up, callback, error pages
  events/               # events list + [id] event/chat page
  profile/              # user profile
  page.tsx              # landing page
components/
  chat/                 # chat-room, chat-message, emoji-picker, polls-sidebar, reactions, event-info
  ui/                   # shadcn/ui components
  header, event-card, event-filters, theme-toggle, user-nav
lib/
  supabase/             # client, server, and middleware Supabase helpers
  format-time.ts
vercel.json             # cron schedule
```

## Environment Variables

Set these in your Vercel project (or `.env.local` for local dev):

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-side cron upserts; bypasses RLS) |
| `CRON_SECRET` | Bearer token required to call the cron endpoint in production |

## Getting Started

```bash
# install dependencies
pnpm install

# run the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cron / Event Sync

The `/api/cron/sync-sports` route runs every 5 minutes (see `vercel.json`) to fetch upcoming and live events, update their statuses, and prune events older than 48 hours. In production the endpoint requires an `Authorization: Bearer $CRON_SECRET` header.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
