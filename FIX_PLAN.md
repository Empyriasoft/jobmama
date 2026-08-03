# JobMama — Lead-Gen Fix Plan (for implementation)

**Context.** This Vite + React + TS site (Lovable-built, shadcn/ui, react-router, react-helmet-async) exists to convert social-media campaign traffic into leads — primarily bookings at `https://calendly.com/hellojobmama/30min`. A conversion audit (2026-07-22, full report: https://claude.ai/code/artifact/4cb710f0-228d-4f01-9efd-ca2b544e25d2) found the funnel leaks tracking and offers only one high-commitment conversion. This plan contains every **code-side** fix. Account-level work (GTM/GA4/Pixel creation, Lovable redeploy, custom domain) is listed at the end as user actions — do not attempt those.

**Stack facts you need:**
- Dev server: `npm run dev` → port **8080** (`.claude/launch.json` has config `jobmama-dev`).
- i18n: `src/contexts/LanguageContext.tsx` + `src/translations/en.ts` (defines `Translations` type) and `src/translations/bg.ts`. **Every copy change must land in BOTH files.** BG is the primary language.
- Tracking scaffold that already works: `src/lib/consent.ts` (Consent Mode v2), `src/hooks/useCalendlyTracking.ts` (pushes `calendly_booking_completed` to dataLayer on Calendly's `postMessage` — **only fires for embedded widgets, not new-tab bookings**). GTM snippet in `index.html` reads `%VITE_GTM_ID%` (currently blank in `.env` — that's expected; code must work when it's blank and when real).
- Calendly URL is currently duplicated in 4 places: `src/components/HeroSection.tsx:76`, `src/components/ServicesSection.tsx:27` (→ `ServiceCard.tsx:107` `window.open`), `src/components/ContactSection.tsx:4`, `src/pages/Contact.tsx:7`.

**Working agreement:**
- One commit per task (T1, T2, …), clear messages. Do **not** push without asking.
- After each task: verify in the browser preview (both BG and EN, and at 375 px width — most social traffic is mobile), check console is clean.
- Final gate: `npm run build` and `npm run lint` pass; `grep` finds zero remaining `window.open('https://calendly` calls.
- Match existing code style (Tailwind + occasional inline `style={{fontFamily}}` pattern, component-per-file).

---

## T1 — UTM capture + passthrough (S)

**Why:** Calendly natively stores `utm_*` params per booking; ads will carry them, the site currently drops them.

1. Create `src/lib/utm.ts`:
   - `captureUtmParams()`: on load, read `utm_source, utm_medium, utm_campaign, utm_content, utm_term, fbclid, gclid` from `window.location.search`; if any present, save as JSON to `sessionStorage["jm_utm"]` (don't overwrite an existing entry with an empty one).
   - `appendUtmParams(url: string): string`: parse with `new URL(url)`, append stored params **without clobbering existing query params** (the embed URL already has `?hide_gdpr_banner=1&hide_event_type_details=1`), return string. Must be a no-op when nothing is stored.
2. Call `captureUtmParams()` once in `AppShell` (`src/App.tsx`) in a `useEffect`.

**Accept:** Visit `http://localhost:8080/?utm_source=ig&utm_campaign=t1`, navigate around; `sessionStorage.jm_utm` persists; `appendUtmParams("https://calendly.com/x/y?a=1")` contains both `a=1` and `utm_source=ig`.

## T2 — Single Calendly source + reroute all CTAs to the embed (M) — **highest impact**

**Why:** New-tab bookings are invisible to `useCalendlyTracking` and lose UTMs; the inline embeds are fully trackable.

1. Create `src/lib/calendly.ts`: export `CALENDLY_URL` (base) and `getCalendlyEmbedUrl()` = base + `?hide_gdpr_banner=1&hide_event_type_details=1` run through `appendUtmParams()`. Replace all 4 hardcoded URLs.
2. `HeroSection.tsx` CTA: replace `window.open(...)` with smooth-scroll to `#contact` (reuse/extract the easing scroll from `Header.tsx:12-43` into `src/lib/scroll.ts` rather than duplicating).
3. `ServiceCard.tsx` `handleBookClick`: same — scroll to `#contact`. Remove the now-unused `bookingUrl` prop chain from `ServicesSection.tsx`.
4. `ContactSection.tsx` + `pages/Contact.tsx`: build `data-url` via `getCalendlyEmbedUrl()` (compute in component so sessionStorage is read at render).

**Accept:** No `window.open` to Calendly remains; hero + service CTAs scroll to the embed; embed iframe URL (inspect DOM) contains UTMs when the session has them.

## T3 — Sticky header with always-visible booking CTA (M)

1. `Header.tsx`: make the header `sticky top-0 z-50 bg-background` (add subtle bottom border or `backdrop-blur` on scroll if it looks flat against white sections).
2. Add a „Запази среща" button between the language toggle and hamburger — compact on mobile (it must fit at 375 px next to logo + BG|EN + burger; if too tight, shrink the language toggle text). On `/`: smooth-scroll to `#contact`; on other routes: navigate to `/contact`.
3. Add `header.cta` to both translation files (`bg: "Запази среща"`, `en: "Book a call"`).

**Accept:** CTA reachable at every scroll depth on both routes; no overlap/layout break at 375 px and 1280 px; hero spacing still looks right (hero relies on `md:pt-[119px]` — verify visually).

## T4 — Fix dead header nav on /contact (S)

`Header.tsx` `handleNavClick` does `document.querySelector(href)` — on `/contact` those sections don't exist, so nav silently does nothing.

1. If `window.location.pathname !== "/"`, navigate (react-router `useNavigate`) to `/` carrying the hash, e.g. `navigate("/" + href)`.
2. In `pages/Index.tsx`, add a small effect: on mount, if `location.hash`, scroll to that element (after paint; `setTimeout(0)` or `requestAnimationFrame`).

**Accept:** From `/contact`, "Нашите услуги" lands on the homepage services section.

## T5 — Footer: contact link + translated cookie label (S)

1. Add `{ label: "Контакти", href: "/contact" }` / `{ label: "Contact", href: "/contact" }` to `footer.navLinks` in both translation files. (Footer anchors are plain `<a>`; a plain href to `/contact` is fine.)
2. `Footer.tsx` hardcodes „Бисквитки" (lines ~72 and ~141) — move to `footer.cookies` in translations (`en: "Cookies"`).

**Accept:** Both languages show the new link and translated cookie button in mobile + desktop footers.

## T6 — 15 vs 30 minute consistency (S, **needs user decision**)

Copy says „безплатна 15-минутна среща" (hero bullet `bg.ts:18`, ContactSection + Contact page titles); the Calendly event is a generic "30 Minute Meeting".

- **Default (if no answer):** keep the 15-min positioning in copy; leave `CALENDLY_URL` as the single constant from T2 so swapping to a properly branded 15-min event later is a one-line change. Add a `// TODO(user):` comment at the constant.
- If the user chooses 30 min instead: update the three copy locations in both languages.
- **User action either way:** brand the Calendly event itself (Bulgarian name, description, photo).

## T7 — FAQ section (M)

1. New `src/components/FAQSection.tsx` using the existing shadcn `Accordion`. Place in `Index.tsx` between `TestimonialsSection` and `ContactSection`.
2. Content in both translation files (`faq.title`, `faq.items[]`). Draft (user may edit copy later; **do not state prices** — packages are discussed on the call):
   - Колко струват услугите? → Зависи от пакета; първата 15-минутна среща е безплатна и необвързваща.
   - Онлайн или на живо се провеждат сесиите? → Онлайн; работилници на живо в София.
   - Прекъсването ми е повече от 2 години — проблем ли е? → Не; точно за това сме.
   - Какво се случва на безплатната среща? → Опознаваме се, дефинираме нуждите, препоръчваме подходяща услуга.
   - Работите ли с компании? → Да — корпоративни решения за реинтеграция (линк към секцията).
3. Add `FAQPage` JSON-LD via `react-helmet-async` inside the section (build from the same translation data; render only for the active language).

**Accept:** Accordion keyboard-accessible; both languages; JSON-LD present in DOM and valid (test with Google's Rich Results test format rules — one `Question`/`acceptedAnswer` pair per item).

## T8 — Workshop signup block (M)

Workshops are the business's stated lead engine; the site never mentions them.

1. New `src/config/workshops.ts`: `{ nextWorkshop: { dateISO, title, signupUrl } | null }` — founder-editable.
2. New `src/components/WorkshopSection.tsx`: renders only when `nextWorkshop` is set — date, title, short pitch, CTA to `signupUrl` (will be a Calendly group-event link once the user creates it). When `null`, render nothing.
3. Place after `CommunitySection` in `Index.tsx`. Translations for static copy in both files.
4. Push `workshop_signup_click` dataLayer event on CTA click (see T10).

**Accept:** With a test config value the section renders in both languages; with `null` the homepage is unchanged.

## T9 — Lead magnet / email capture scaffold (M, gated on user's email provider)

1. New `src/components/LeadMagnetSection.tsx`: headline („Безплатен чеклист: CV след майчинство"), email input, GDPR consent checkbox, submit.
2. Provider-agnostic: form posts to `import.meta.env.VITE_NEWSLETTER_FORM_ACTION` (add to `.env` + `.env.example` with comment). **If the env is blank, do not render the section.**
3. On submit success: toast (existing sonner/toaster) + push `lead_magnet_submit` dataLayer event.
4. Place between `ProcessSection` and `CommunitySection`.

**User actions:** create MailerLite (or similar) form → paste action URL into env; produce the actual PDF; set up the provider automation that delivers it.

## T10 — Analytics event layer (S)

So GTM has granular triggers the moment a container ID exists.

1. New `src/lib/analytics.ts`: `pushEvent(event: string, params?: Record<string, unknown>)` — guards `window.dataLayer = window.dataLayer || []`, pushes `{ event, ...params }`. Extend `src/types/dataLayer.d.ts` accordingly.
2. Instrument: `book_call_click` with `{ placement: "hero" | "services" | "sticky_header" }` (T2/T3 handlers), `outbound_social_click` (footer socials), `faq_open` (T7), `workshop_signup_click` (T8), `lead_magnet_submit` (T9).

**Accept:** Clicking each control appends the expected object to `window.dataLayer` in dev.

## T11 — Contact paths for chat-native audience (S)

1. New `src/config/contact.ts`: `{ instagramDm: "https://ig.me/m/jobmama_bg", messenger: null, viber: null }` — Messenger handle and Viber number are **user inputs**; render only non-null entries.
2. Small "Пиши ни директно" row in `ContactSection.tsx` (and Contact page) with the configured links; `outbound_social_click` events on click.

**Accept:** IG DM link live now; others appear when config is filled.

## T12 — Self-hosted brand/meta assets (S)

1. Copy the existing repo-root `Logo_Mark.png` → `public/favicon.png` and reference it from `index.html` instead of the `storage.googleapis.com/gpt-engineer-file-uploads/...` URL (keep `.svg` if a local SVG exists in `src/assets` — prefer SVG).
2. og:image: point `index.html` + any Helmet usage at `https://jobmama.lovable.app/og-image.png`; add a temporary `public/og-image.png` (can be the current logo card). **User/design action:** replace with a designed 1200×630 card (face + value line) later. Do not delete the old URLs from git history — just replace references.

**Accept:** `index.html` contains no `storage.googleapis.com` references; favicon renders; `/og-image.png` returns 200 from the dev server.

## T13 — (Optional, skip if time-boxed) Click-to-load Calendly

Replace auto-loading embeds with a lightweight placeholder ("Зареди календара") that injects the Calendly script/iframe on click or after consent — improves GDPR posture and initial page weight. Only do this after T2 is verified; do not break the postMessage tracking.

---

## Final verification checklist

- [ ] `npm run lint` clean; `npm run build` succeeds
- [ ] `grep -r "window.open('https://calendly" src/` → no matches
- [ ] `grep -rn "calendly.com" src/` → only `src/lib/calendly.ts` (+ config comments)
- [ ] BG and EN parity: every new key exists in both translation files (TS type will enforce)
- [ ] Mobile 375 px: header fits, sticky CTA visible, embed usable
- [ ] `/?utm_source=smoke&utm_campaign=check` → embed iframe src contains both params
- [ ] `window.dataLayer` receives: `book_call_click` (each placement), `faq_open`, `outbound_social_click`
- [ ] `/contact` nav links work; footer Контакти link works
- [ ] Console free of errors on `/` and `/contact`

## Out of scope — user/account actions (do NOT attempt)

1. **Redeploy production from `main` via Lovable** — the live site is a stale Feb build; nothing here matters until this happens.
2. Create **GTM container + GA4 + Meta Pixel**, wire tags consent-gated, put real values in `.env` **and Lovable's env settings** (`VITE_GTM_ID`, `VITE_GSC_VERIFICATION`).
3. **Custom domain** + remove Lovable badge + Meta Business domain verification.
4. Calendly: brand the event (BG name/description/photo), decide 15 vs 30 min (T6), create workshop group event (T8).
5. Email provider account + form action URL + lead-magnet PDF (T9); Messenger/Viber handles (T11); canonical Facebook page URL for the footer (currently an opaque `/share/` link); designed og-image (T12).
6. GSC verification + sitemap submission; Meta retargeting audiences.
