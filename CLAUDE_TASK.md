# CLAUDE_TASK.md — Current Sprint

> This file defines the active tasks, priorities, and sprint goals.
> Claude must read this file before starting any work session.
> Update this file as tasks are completed or reprioritized.

---

## Current Sprint Goal

**Sprint:** Project Initialization & Foundation
**Status:** Complete — all phases built
**Last built:** 2026-04-11

---

## Completed Tasks

### Phase 1 — Monorepo & Environment Setup
- [x] Initialize root `package.json` with workspaces (`apps/*`)
- [x] Create `docker-compose.yml` (PostgreSQL 15 + Redis 7)
- [x] Create `.env.example` with all required variables
- [x] Create `.gitignore`

### Phase 2 — Next.js Frontend Scaffolded
- [x] Created `apps/web` via `create-next-app` (Next.js 16, TypeScript, Tailwind v4, App Router)
- [x] Installed: framer-motion, zustand, @tanstack/react-query, zod, react-hook-form, @hookform/resolvers, clsx, tailwind-merge, date-fns, lucide-react, @stripe/stripe-js, @clerk/nextjs

### Phase 3 — Express API Scaffolded
- [x] Created `apps/api` with TypeScript (`tsconfig.json`)
- [x] Installed: express, cors, helmet, express-rate-limit, cookie-parser, dotenv, argon2, jsonwebtoken, zod, stripe, multer, cloudinary, nodemailer, resend, ioredis, prisma, @prisma/client
- [x] Prisma schema defined (User, ClientProfile, Service, Staff, Appointment, GalleryImage)

### Phase 4 — Backend Files
- [x] `src/server.ts` — Express entry point with Helmet, CORS, rate limiting, cookie parser
- [x] `src/lib/prisma.ts` — Prisma client singleton
- [x] `src/lib/stripe.ts` — Stripe client
- [x] `src/lib/redis.ts` — Redis client
- [x] `src/lib/logger.ts` — Structured logger
- [x] `src/middleware/auth.middleware.ts` — JWT auth + requireRole()
- [x] `src/middleware/validate.middleware.ts` — Zod validation middleware
- [x] `src/middleware/rateLimit.middleware.ts` — auth, booking, general rate limiters
- [x] `src/schemas/` — auth, booking, service, staff, contact schemas (Zod)
- [x] `src/services/` — auth, booking, service, staff, gallery services
- [x] `src/controllers/` — auth, booking, service, staff, gallery, contact controllers
- [x] `src/routes/` — auth, booking, service, staff, gallery, contact route files

### Phase 5 — Frontend Scaffold
- [x] `app/globals.css` — Tailwind v4 @theme with full design token system (cream, blush, taupe, accent, gold, noir)
- [x] `app/layout.tsx` — Root layout with Playfair Display + DM Sans fonts, Clerk provider
- [x] `components/shared/Providers.tsx` — TanStack Query provider
- [x] `lib/utils.ts` — cn(), formatPrice(), formatDuration(), formatDate(), formatTime()
- [x] `lib/api.ts` — Typed fetch wrappers for all API endpoints
- [x] `store/bookingStore.ts` — Zustand store for booking wizard state
- [x] `components/layout/Navbar.tsx` — Floating pill nav with mobile hamburger + animated overlay
- [x] `components/layout/Footer.tsx`

### Phase 6 — Public Pages
- [x] `app/(public)/layout.tsx`
- [x] `app/(public)/page.tsx` — Homepage
- [x] `components/home/HeroSection.tsx` — Asymmetric hero, fade-up motion
- [x] `components/home/ServicesPreview.tsx` — Live data, grid layout
- [x] `components/home/GalleryPreview.tsx` — Image grid with hover
- [x] `components/home/TestimonialsSection.tsx`
- [x] `app/(public)/services/page.tsx` + `components/services/ServicesPageClient.tsx`
- [x] `app/(public)/gallery/page.tsx` + `components/gallery/GalleryPageClient.tsx` (with lightbox)
- [x] `app/(public)/about/page.tsx` + `components/about/StaffSection.tsx`
- [x] `app/(public)/contact/page.tsx` + `components/contact/ContactForm.tsx`

### Phase 7 — Booking Wizard
- [x] `app/(public)/book/page.tsx`
- [x] `components/booking/BookingWizard.tsx` — 4-step wizard with AnimatePresence
- [x] `components/booking/ServiceStep.tsx` — Category filter + service selection
- [x] `components/booking/StaffStep.tsx` — Staff picker with avatar + no-preference option
- [x] `components/booking/DateTimeStep.tsx` — 14-day date picker + time slot grid
- [x] `components/booking/ConfirmStep.tsx` — Review + notes + submit to API

### Phase 8 — Client Portal
- [x] `app/(client)/layout.tsx` — Auth-gated via Clerk
- [x] `app/(client)/dashboard/page.tsx` + `components/client/ClientDashboardClient.tsx`
- [x] `app/(client)/appointments/page.tsx` + `components/client/AppointmentsClient.tsx` (cancel support)

### Phase 9 — Admin Dashboard
- [x] `app/(admin)/layout.tsx` — Role-gated (ADMIN only)
- [x] `components/admin/AdminSidebar.tsx` — Dark sidebar with icon nav
- [x] `app/(admin)/dashboard/page.tsx` + `components/admin/AdminDashboardClient.tsx` — Stats + recent bookings
- [x] `app/(admin)/appointments/page.tsx` + `components/admin/AdminAppointmentsClient.tsx` — Status management table
- [x] `app/(admin)/services/page.tsx` + `components/admin/AdminServicesClient.tsx` — CRUD services
- [x] `app/(admin)/staff/page.tsx` + `components/admin/AdminStaffClient.tsx` — CRUD staff
- [x] `app/(admin)/gallery/page.tsx` + `components/admin/AdminGalleryClient.tsx` — Upload/delete images

### Phase 10 — Local Dev Simplification (apps/web + apps/api)
- [x] Switched Prisma datasource to SQLite (`apps/api/prisma/dev.db`) — no Docker required
- [x] Stubbed Redis, Stripe, Cloudinary, Resend as no-ops
- [x] Replaced Clerk with custom JWT auth (cookie-based) across frontend
- [x] Added `GET /api/auth/me` endpoint + `getMeController`
- [x] Created `authStore.ts` (Zustand) + `AuthInitializer` in Providers
- [x] Sign-in (`/sign-in`) and Sign-up (`/sign-up`) pages with forms
- [x] Removed ClerkProvider from root layout, all protected layouts rewritten as client components
- [x] Fixed route group collisions: moved `(admin)/*` → `admin/*` (real URL segment)
- [x] Deleted default `app/page.tsx` (conflicted with `(public)/page.tsx`)
- [x] All TypeScript errors resolved (0 errors `tsc --noEmit`)
- [x] SQLite DB created via `prisma db push` (Prisma 6.19.3)
- [x] API smoke-tested: sign-up, sign-in, GET /me all return correct JSON

### Phase 11 — Visual Overhaul (Dark Vibrant Theme)
- [x] Hero section: full-viewport background image, spring parallax on mouse
- [x] Replaced liquid distortion with spring parallax on hero image
- [x] 3D Coverflow ServicesCarousel (homepage) — `components/home/ServicesCarousel.tsx`
- [x] 3D Marquee GalleryMarquee (homepage) — `components/home/GalleryMarquee.tsx`
- [x] Full dark vibrant theme applied: services, gallery, about, contact, sign-in, footer
- [x] Fixed "Event handlers cannot be passed to Client Component" — added `'use client'` to Footer, CSS hover classes
- [x] Gallery page — 18 static images (6 original + 12 new nail art photos)
- [x] 3D Animated Pin on gallery cards — tilt + glowing beam + pulsing coordinate origin
- [x] Antigravity Canvas ring-particle background on hero section — `components/home/AntigravityCanvas.tsx`
- [x] Color vibrancy boost — backgrounds `#14161f`, surfaces `#1e2132`, more visible accent usage
- [x] New nail art images saved to `public/`: nails-bambi, nails-iridescent, nails-alice, nails-brownfloral, nails-polkadot, nails-pinkstripe, nails-bwstripe, nails-eden, nails-starformation, nails-lacebow, nails-monster, nails-colorful

---

## Next Steps (not yet started)

### Before first run
- [ ] Copy `.env.example` → `.env` and fill in all values
- [ ] Start Docker: `docker-compose up -d`
- [ ] Run Prisma migration: `cd apps/api && npx prisma migrate dev --name init && npx prisma generate`
- [ ] Configure Clerk application + add publishable key to `.env`

### Remaining features
- [ ] Stripe deposit payment step (after ConfirmStep in booking wizard)
- [ ] Booking confirmation emails via Resend
- [ ] Sign-in / Sign-up pages (Clerk hosted or custom)
- [ ] Privacy + Terms placeholder pages
- [ ] Vitest unit tests (booking conflict detection, auth flows)
- [ ] Playwright E2E tests
- [ ] GitHub Actions CI/CD pipeline
- [ ] Vercel deployment config (`apps/web`)
- [ ] Railway/Render deployment config (`apps/api`)

---

## Blockers / Notes

- Auth provider: **Clerk** (already installed). Configure at clerk.com, add keys to `.env`.
- Admin role: must be set via Clerk `publicMetadata.role = "ADMIN"` on the user object.
- Stripe deposit integration is stubbed — `ConfirmStep` currently skips to booking creation.
- Image uploads require Cloudinary credentials in `.env`.

---

*Last updated: 2026-04-12*
