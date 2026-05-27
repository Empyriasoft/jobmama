# Step 4 (revised) — Calendly-only lead conversion

No webinar. No contact form. Calendly is the single lead conversion surface.

## Routes

- **Remove** `/webinar` and `/blagodarim-uebinar` from the plan entirely. Not built.
- **Remove** `/blagodarim-kontakt`. No form, no thank-you page needed.
- **Add** `/contact` route in `App.tsx` → new `src/pages/Contact.tsx`.

## `/contact` page

Bulgarian-first, minimal, on-brand with existing sections (same `Header` + `Footer`, same container padding scale `px-5 sm:px-6 md:px-12 lg:px-[100px]`).

Contents:
- `<SEO />` with BG title/description, canonical `/contact`.
- H1: **„Имаш въпрос? Резервирай безплатна 15-минутна среща."**
- Short supporting paragraph (1–2 sentences, BG): what to expect from the call.
- Embedded Calendly inline widget pointing at `https://calendly.com/hellojobmama/30min` (the link already in project memory).
- Fallback line below the widget: **„Или ми пиши директно: "** followed by `hello@jobmama.com` as a `mailto:` link.
- EN mirror strings added to `src/translations/en.ts` and `src/translations/bg.ts` under a new `contact` namespace, consumed via the existing `LanguageContext`.

Calendly embed: use the official inline embed snippet loaded as a `<script src="https://assets.calendly.com/assets/external/widget.js">` injected on mount, with a `<div class="calendly-inline-widget" data-url="...">`. Script is loaded only after the page mounts so it does not affect home-page performance.

## DataLayer events (revised)

Only one event ships in Step 4:

- **Calendly booking completed** — `src/hooks/useCalendlyTracking.ts` mounted once at app root (in `App.tsx`). Listens for `window` `message` events, filters strictly on `event.data?.event === 'calendly.event_scheduled'`, then pushes:
  ```
  window.dataLayer.push({ event: 'calendly_booking_completed' })
  ```
- `src/types/dataLayer.d.ts` — minimal `Window` typing for `dataLayer`.

No `generate_lead` events. No form submission events. No purchase event here (that stays in Step 5).

## Verification checklist (simplified)

1. Visit `/contact` → Calendly widget renders, mailto fallback visible.
2. Book a test slot in Calendly → DevTools console shows `dataLayer` entry with `event: 'calendly_booking_completed'` exactly once.
3. Reject cookies first → booking still pushes the event to `dataLayer` (GTM-side consent gating decides whether the GA4 tag fires; that's correct behavior).
4. No `gtag()` / `fbq()` calls anywhere in component code — only `dataLayer.push` inside `useCalendlyTracking`.
5. `/contact` rendered in BG by default, EN when language toggled.

## Files touched in Step 4

- `src/App.tsx` (add `/contact` route, mount `useCalendlyTracking`)
- `src/pages/Contact.tsx` (new)
- `src/hooks/useCalendlyTracking.ts` (new)
- `src/types/dataLayer.d.ts` (new)
- `src/translations/bg.ts` + `src/translations/en.ts` (add `contact` namespace)
- `public/sitemap.xml` (add `/contact`)
- `.lovable/plan.md` (update to reflect revised Step 4)

## Out of scope for Step 4

- Webinar route, webinar thank-you, webinar event.
- Contact form, contact thank-you, contact form event.
- Any backend / email-sending. Calendly handles the booking and confirmation email natively.
