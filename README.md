# Arise Strong Together — Website

Marketing/informational site for Arise Strong Together, an organisation supporting
survivors of gender-based violence.

**Stack:** React 19 · TypeScript · Vite 6 · Tailwind CSS v4 · React Router 7 · lucide-react
(shadcn-compatible: `@/` alias, `cn()` util, design tokens as CSS variables).

## Getting started
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the production build
npm run typecheck  # tsc --noEmit
```

## Deploy

This is a static SPA. A rewrite/redirect to `index.html` is required so client-side
routes (e.g. /get-help) work on refresh — configs are already included.

**Vercel (recommended)** — includes `vercel.json`:
```bash
npm i -g vercel
vercel            # first run links/creates the project
vercel --prod     # production deploy
```
Or connect the Git repo in the Vercel dashboard (Framework: Vite; Build: `npm run build`; Output: `dist`).

**Netlify / Cloudflare Pages** — `public/_redirects` handles SPA routing.
Build command `npm run build`, publish directory `dist`.

**HTTPS:** all of the above provision and auto-renew TLS certificates for you — keep
that on so the site is never blocked as untrustworthy.

## Adding shadcn/ui components
The project already follows shadcn conventions, so you can drop components straight in:
```bash
npx shadcn@latest init      # if you want the full generator (already partly set up)
npx shadcn@latest add dialog
```

## Structure
```
src/
  components/
    layout/    SafetyBar, Header, Footer, Layout (shell + Esc quick-exit + scroll-to-top)
    blocks/    Section, Banner, Cards, Callout, Faq, CtaBand (reusable building blocks)
    ui/        button.tsx (shadcn-style)
    Reveal.tsx Logo.tsx ProgramIcon.tsx
  data/        programs.ts, posts.ts (content data)
  pages/       Home, About, GetHelp, Programs, ProgramDetail, GetInvolved,
               Volunteer, Donate, Contact, Blog
  index.css    Tailwind v4 + @theme design tokens
```

## Before launch
- Replace every `[BRACKETED]` placeholder (helpline & emergency numbers, stats with
  sources, addresses, payment channels, real photos, consented survivor stories).
- Connect the Volunteer and Contact forms to a backend or form service
  (they currently show a placeholder alert on submit).
- Point the "Exit this site" target and helpline numbers at the real values.
