# JobMama Build Plan

GA4 is the source of truth for sales. No database, no Lovable Cloud. The admin page is a 30-second form whose only job is to push a `purchase` event to the dataLayer.

---

## Step 1 — SEO foundations

- `index.html`: add `<meta name="google-site-verification" content="%VITE_GSC_VERIFICATION%" />`, canonical, viewport (already present), and BG `<html lang="bg">`.
- `public/robots.txt`: allow all, reference sitemap, disallow `/admin/`.
- `scripts/generate-sitemap.ts`: emit `public/sitemap.xml` with homepage (priority 1.0) + thank-you routes excluded.
- Install `react-helmet-async`; wrap app in `HelmetProvider`.
- `src/components/SEO.tsx`: per-page title, description, OG, Twitter, canonical. Applied to `Index` and `NotFound`. Bulgarian copy.

## Step 2 — Consent (GDPR, Consent Mode v2)

- `index.html` `<head>` (before GTM): inline `gtag('consent', 'default', ...)` with everything **denied**, `wait_for_update: 500`.
- `src/lib/consent.ts`: `ConsentState` type, `getConsent`, `setConsent` (12-month expiry in `localStorage`), `pushConsentUpdate()` calling `gtag('consent','update',...)`.
- `src/components/CookieConsent.tsx`: bottom banner (BG copy), "Приемам всички" / "Отказвам" / "Настройки" → modal with per-category toggles (necessary locked on, analytics, marketing, preferences).
- `Footer.tsx`: "Бисквитки" link reopens the banner.

## Step 3 — GTM

- `index.html` `<head>` (after consent default): GTM `<script>` with `%VITE_GTM_ID%`.
- `index.html` `<body>` top: `<noscript>` iframe fallback.
- **No `fbq()` / `gtag()` calls in components.** All tracking goes through GTM via `window.dataLayer.push(...)`.

## Step 4 — DataLayer events + minimal forms

Since neither form exists, scaffold them locally:

- `src/types/dataLayer.d.ts`: window typing.
- `/webinar` → minimal BG form → on submit navigate to `/blagodarim-uebinar`, which on mount pushes:
  `{ event: 'generate_lead', form_name: 'webinar_registration' }`
- `/contact` → minimal BG form → on submit navigate to `/blagodarim-kontakt`, which pushes:
  `{ event: 'generate_lead', form_name: 'contact_form' }`
- `src/hooks/useCalendlyTracking.ts`: listens for `message` events, filters strictly on `event.data.event === 'calendly.event_scheduled'`, pushes `{ event: 'calendly_booking_completed' }`. Mounted once at app root.
- Routes added to `App.tsx`.

## Step 5 — `/admin/log-sale` (no database)

The page exists **only** to fire the GA4 purchase event.

- Password gate against `VITE_ADMIN_PASSWORD`; `sessionStorage.admin_authed` flag (cleared on tab close). No persistence, no roles.
- Form fields (BG labels): transaction ID (auto-generated UUID, editable), value (BGN), currency (default `BGN`), package name (dropdown matching the 4 service tiers), customer email (optional, hashed before push).
- On submit, push exactly one event:
  ```
  {
    event: 'purchase',
    transaction_id,
    value,
    currency: 'BGN',
    items: [{ item_name: package_name, price: value, quantity: 1 }]
  }
  ```
- Toast: "Продажбата е изпратена към GA4". Form resets. No DB write, no localStorage queue, no Supabase code at all.
- Route excluded from sitemap; `robots.txt` disallows `/admin/`.

---

## Technical notes

- Env vars to add in `.env` (placeholders, user fills in): `VITE_GSC_VERIFICATION`, `VITE_GTM_ID`, `VITE_ADMIN_PASSWORD`.
- All founder/visitor copy in Bulgarian; English mirror only where the existing i18n context already covers a string.
- Consent banner blocks GTM tags from firing (Consent Mode default-denied) until the user accepts — GTM tags must be configured with consent checks on the GTM side.
- After each step I'll list files touched + run the verification checklist, then stop for approval before moving on.

## Open question

Step 5 will sit behind a simple password check only. This is **not secure** — anyone with the password and URL can fire `purchase` events into your GA4. That's acceptable for a private founder tool but worth naming explicitly.
