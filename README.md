<<<<<<< HEAD
# College Society Management System

Production-ready frontend for a premium SaaS College Society Management product.

## Stack

- **React 19** + **Vite** + **TypeScript**
- **Tailwind CSS** v3.4+ (custom theme, glassmorphism)
- **Framer Motion** (page transitions, 3D tilt, animations)
- **React Router** v6.4+ (lazy-loaded routes)
- **Recharts** (line + doughnut charts)
- **lucide-react** (icons)
- **Context API** (theme; no Redux)

## Features

- **Theme**: Light/Dark with animated Sun/Moon toggle, gradient background, `dark` class on `<html>`, persisted in `localStorage`
- **Layout**: Collapsible glass sidebar (desktop), bottom nav (mobile), navbar with search, notifications, profile, theme toggle
- **Pages**: Dashboard (stats, Recharts, activity), Societies (3D tilt cards), Events (capacity bars, status badges), AI (recommendations + floating chatbot)
- **Design**: 8px grid, `rounded-3xl`, Inter font, neon accents (`#00f5ff`, `#a855f7`), glassmorphism cards

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Folder structure

```
src/
  components/   # ThemeToggle, GlassCard, StatCard, SocietyCard, EventCard, Sidebar, Navbar
  context/      # ThemeContext
  data/         # mockData
  hooks/        # useSidebar
  layouts/      # MainLayout
  pages/        # Dashboard, Societies, Events, AI
```
=======
# Cursor
>>>>>>> 904dc60c80625d1bc6aa26683361081c46883514
