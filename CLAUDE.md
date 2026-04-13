# CLAUDE.md — Nail Salon Web Platform

> **READ THIS FILE FIRST. Always. No exceptions.**
> Before touching any file, writing any code, or running any command — read this document completely.

---

## CRITICAL RULES (Non-Negotiable)

1. **Always ask for permission before editing any task or making any change.**
   - "May I proceed with [task]?" → Wait for explicit approval.
   - Never assume approval. Never act on implied intent.

2. **Before doing ANYTHING, read the following files in this exact order:**
   ```
   CLAUDE.md              ← This file (project rules & context)
   CLAUDE_TASK.md         ← Current task, sprint goals, and priorities
   .CLAUDECODE.md         ← Code conventions, naming, folder rules
   ```
   If any of these files are missing or empty, **stop and notify the user immediately.**

3. **Before any frontend or UI work, read the skill files located in `/skills/`:**
   ```
   /skills/design-taste-frontend/
   /skills/find-skills/
   /skills/high-end-visual-design/
   /skills/stitch-design-taste/
   ```
   These define the visual language, component patterns, and design standards for this project. Do not write UI code without consulting them.

4. **Install only what is required for the current task.** Never install speculative packages. Ask before adding any new dependency.

---

## Project Overview

**Project Name:** Nail Salon Web Platform
**Type:** Full-Stack Web Application (Next.js + Node/Express + PostgreSQL)
**Audience:** Nail salon owners and their clients
**Goal:** A high-end, polished web presence + booking + admin dashboard for a nail salon business

### Core Features
- Public-facing landing page (services, gallery, about, contact)
- Online appointment booking system
- Client account portal (view/cancel bookings)
- Admin dashboard (manage bookings, services, staff)
- Service & pricing catalog management
- Staff profiles management
- Image gallery management
- Contact form with email notification
- Payment integration (deposits for bookings via Stripe)

---

## Project Structure

```
nail-salon/
├── apps/
│   ├── web/                          # Next.js frontend (public site + client portal)
│   │   ├── app/
│   │   │   ├── (public)/             # Public-facing pages
│   │   │   │   ├── page.tsx          # Homepage / Landing
│   │   │   │   ├── services/
│   │   │   │   ├── gallery/
│   │   │   │   ├── about/
│   │   │   │   ├── contact/
│   │   │   │   └── book/
│   │   │   ├── (client)/             # Authenticated client area
│   │   │   │   ├── dashboard/
│   │   │   │   └── appointments/
│   │   │   ├── (admin)/              # Admin area (protected)
│   │   │   │   ├── dashboard/
│   │   │   │   ├── appointments/
│   │   │   │   ├── services/
│   │   │   │   ├── staff/
│   │   │   │   └── gallery/
│   │   │   ├── api/
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── ui/                   # Shadcn/ui base components
│   │   │   ├── layout/               # Navbar, Footer, MobileMenu
│   │   │   ├── booking/              # Booking wizard components
│   │   │   ├── admin/                # Admin-specific components
│   │   │   └── shared/               # Cards, Badges, Modals, Toasts
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   ├── auth.ts
│   │   │   └── utils.ts
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── styles/
│   │   │   └── globals.css
│   │   └── public/
│   │
│   └── api/                          # Express.js backend
│       ├── src/
│       │   ├── routes/
│       │   ├── controllers/
│       │   ├── middleware/
│       │   ├── services/
│       │   └── lib/
│       └── prisma/
│           ├── schema.prisma
│           └── migrations/
│
├── skills/                           # READ BEFORE ANY UI WORK
├── CLAUDE.md
├── CLAUDE_TASK.md
├── .CLAUDECODE.md
├── .env
├── .env.example
├── docker-compose.yml
└── package.json
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Components | Shadcn/ui + Radix UI |
| Animation | Framer Motion |
| State | Zustand |
| Server State | TanStack Query |
| Validation | Zod + React Hook Form |
| Backend | Node.js + Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Cache | Redis |
| Auth | Clerk or Auth.js |
| Passwords | Argon2 |
| Payments | Stripe SDK |
| Security | Helmet.js + express-rate-limit |
| Testing | Vitest + Playwright |
| Deployment | Vercel (web) + Railway/Render (api) |
| Dev DB | Docker (docker-compose) |

---

## Design Standards

Read all files in `/skills/` before writing any UI code.

- **Aesthetic**: Luxury, refined, feminine-forward but approachable. Editorial beauty meets clean tech.
- **Typography**: Serif display (Playfair Display / Cormorant Garamond) + clean sans-serif body (DM Sans / Nunito).
- **Colors**: Warm neutrals (cream, blush, taupe) + one bold accent (deep rose, champagne gold, or noir). Use CSS variables.
- **Motion**: Subtle fade-ins, silky scroll animations. Nothing jarring.
- **Imagery**: High-contrast nail photography. Optimized via Cloudinary.
- **No generic AI design** — no purple gradients, no Inter font, no cookie-cutter card shadows.

---

## Security Checklist

- [ ] Helmet.js configured on Express
- [ ] CORS restricted to `NEXT_PUBLIC_APP_URL` only
- [ ] Rate limiting on `/api/auth` and `/api/booking`
- [ ] All inputs validated with Zod before DB writes
- [ ] Prisma parameterized queries only
- [ ] Passwords hashed with Argon2
- [ ] JWT in HttpOnly cookies
- [ ] Stripe webhook signature verified
- [ ] Admin routes protected by role middleware
- [ ] `.env` in `.gitignore`

---

## Permission Protocol

Before taking any of the following actions, ask for explicit approval:

| Action | Format |
|---|---|
| Installing a package | "May I run `npm install X`?" |
| Creating a new file | "May I create `path/to/file.tsx`?" |
| Modifying an existing file | "May I edit `path/to/file.tsx`?" |
| Running a migration | "May I run `prisma migrate dev`?" |
| Deleting anything | "May I delete `path/to/file`?" |
| Updating `.env.example` | "May I add `VAR_NAME` to `.env.example`?" |

**Format:**
> "Before I proceed: I'd like to [action]. This will [what it does and why]. May I go ahead?"

---

## Workflow Order

1. Read `CLAUDE.md`
2. Read `CLAUDE_TASK.md`
3. Read `.CLAUDECODE.md`
4. Read relevant skill files in `/skills/`
5. Ask permission before starting
6. Build → test → ask permission to commit

---

*Last updated: 2026-04-11*
