# Seomaniak — User Dashboard

A modern, production-grade user dashboard built with React as part of the Seomaniak technical internship test.

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| React | 18 | UI framework |
| Vite | 8 | Build tool & dev server |
| React Router DOM | 6 | Client-side routing |
| React Hook Form | 7 | Form state & validation |
| Tailwind CSS | 3 | Utility-first styling |
| Lucide React | latest | Icon library |

---

## Project Structure
```
seomaniak-dashboard/
├── public/
├── src/
│   ├── components/
│   │   ├── Layout.jsx        # App shell: sidebar + page outlet
│   │   ├── Sidebar.jsx       # Fixed navigation sidebar
│   │   └── StatCard.jsx      # Reusable metric card component
│   ├── context/
│   │   └── UsersContext.jsx  # Global state via React Context API
│   ├── data/
│   │   └── users.js          # Mock user data & role/status constants
│   ├── pages/
│   │   ├── Dashboard.jsx     # Overview: stats, recent users, activity feed
│   │   ├── UsersPage.jsx     # Users table with search, filter, sort
│   │   ├── UserFormPage.jsx  # Add & Edit user form with validation
│   │   └── SettingsPage.jsx  # Preferences UI
│   ├── App.jsx               # Route definitions
│   ├── main.jsx              # App entry point
│   └── index.css             # Global styles + Tailwind directives
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

---

## Features

- **Dashboard Overview** — live stat cards (total, active, inactive, pending users), recent users table, activity feed, and a quick-add CTA
- **Users Table** — search by name, email or role; filter by status; sort by any column ascending/descending
- **Add User Form** — validated fields: full name (letters only, min 3 chars), email format, role, status, join date
- **Edit User** — form pre-fills from global state, tracks unsaved changes
- **Delete User** — removes user from global state instantly
- **Settings Page** — preferences UI with toggle controls
- **Animations** — staggered fade-in on page load, hover lift effects, sidebar glow

---

## Architecture Decisions

**React Context API over Redux**
The app manages one shared resource (users). Context API is the right-sized tool here — no boilerplate, no extra dependency, easy to follow for any reviewer.

**React Hook Form**
Gives us uncontrolled inputs (better performance) with declarative validation rules. Errors render instantly on blur without re-rendering the whole form.

**Vite over Create React App**
Faster dev server startup, native ESM, and significantly faster hot module replacement. CRA is deprecated — Vite is the current industry standard.

**Component-first structure**
Pages are kept thin. Shared UI primitives (`StatCard`, `Sidebar`, `Layout`) live in `/components` so they can be reused or tested independently.

---

## Getting Started
```bash
# 1. Clone the repo
git clone https://github.com/igrouchfi0lahcen/seomaniak-dashboard.git
cd seomaniak-dashboard

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser.
```bash
# Build for production
npm run build
```

---

## What I Would Improve

1. **Backend integration** — replace mock data with real API calls to a Node.js/Express or Laravel backend
2. **Authentication** — add a login page with protected routes using JWT
3. **Persistent state** — use localStorage or a real database instead of in-memory context
4. **Pagination** — paginate the users table for large datasets
5. **Unit tests** — add Vitest + React Testing Library for component coverage
6. **TypeScript** — migrate to TypeScript for type safety and better DX

---

## Author

Built by Lahcen Igrouchfi for the Seomaniak technical internship test — 2026
Stack: React · Vite · Tailwind CSS · React Hook Form · React Router DOM
