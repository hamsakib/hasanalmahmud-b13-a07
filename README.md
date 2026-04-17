# KeenKeeper

A personal friendship management app that helps you track connections, log interactions, and make sure no important friendship slips away.

## 🛠️ Technologies Used

- **React 19** — UI library
- **Vite** — Build tool and dev server
- **React Router DOM v7** — Client-side routing
- **Tailwind CSS v4** — Utility-first styling
- **Recharts** — Pie chart for analytics
- **React-Toastify** — Toast notifications

## ✨ Key Features

1. **Friend Tracking** — View all your friends as cards with their contact status (On Track, Almost Due, Overdue), tags, and days since last contact
2. **Interaction Logging** — Log Calls, Texts, and Video chats from any friend's detail page; entries appear instantly in the Timeline
3. **Friendship Analytics** — A dedicated Stats page with a Recharts donut chart showing your interaction breakdown and friend status progress bars

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Banner, summary stats, and friend card grid |
| Friend Detail | `/friend/:id` | Profile, stats, relationship goal, and quick check-in |
| Timeline | `/timeline` | Chronological log of all interactions with filter |
| Stats | `/stats` | Pie chart and analytics overview |
| 404 | `*` | Friendly not-found page |

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open https://hasanalmahmud-b13-a07.vercel.app/ in your browser.

## 📦 Build for Production

```bash
npm run build
```
