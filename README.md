# Timopis

Task and project management combined with team chat — a single app where a team plans work and talks about it, instead of switching between two tools.

## What it is

Timopis has two halves that are meant to connect:

- **Projects & Tasks** — projects contain tasks with status, assignee, due date, and priority; a Kanban board view and a list view; task comments, subtasks, and attachments.
- **Chat** — public/private channels, direct messages, threaded replies, reactions, @mentions, and real-time presence/typing indicators.

The integration between the two is the point: link a task to a channel, turn a chat message into a task, have task activity post into a channel, and search across both from one place.

## Current status

Frontend-only proof of concept. There is no backend, database, or authentication yet — the UI in `timopis-web/` runs entirely on mock data (`timopis-web/src/lib/mock-data.ts`) so the app shell, Kanban board, and chat views can be built and reviewed before wiring up real data.

Built piece by piece — see [`ROADMAP.md`](ROADMAP.md) for the full, checkable build order (currently on Phase 0: foundations).

## Project structure

```
experimentals/
├── CONTEXT.md       # architecture, tech stack decisions, data model — read this first
├── ROADMAP.md       # the build plan, broken into small pieces, checked off as we go
├── GIT_SETUP.md     # how this repo was connected to GitHub
└── timopis-web/     # the Next.js frontend (see timopis-web/README.md to run it)
```

## Tech stack

Next.js (App Router) + TypeScript + Tailwind CSS today. Planned once backend work starts: Postgres (Neon) + Prisma, Auth.js, and a separate Socket.io server for real-time chat/presence. Full reasoning in [`CONTEXT.md`](CONTEXT.md).

## Getting started

```bash
cd timopis-web
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).
