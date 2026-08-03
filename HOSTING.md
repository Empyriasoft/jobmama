# Hosting JobMama yourself (Vercel + jobmama.bg)

**Goal:** own the whole loop — *edit with Claude locally → push to GitHub → the live site updates by itself in ~1 minute* — on your own domain, off Lovable.

**Why this is easy here:** the site is a **static Single-Page App** (Vite + React). There's no server, database, or backend to run. Vercel just builds the code into plain HTML/CSS/JS files and serves them on a global CDN. That's why the free/cheap tiers are plenty.

> **Domains at a glance:** the **website** goes on **jobmama.bg**. Note that **`jobmama.bg` also handles email** (it has MX records), so its DNS must be changed carefully — see Step 5. (Your `hello@jobmama.com` inbox is a separate `.com` domain and is never affected.)

```
  You + Claude (local)  ──git push──▶  GitHub (Empyriasoft/jobmama)  ──auto build──▶  Vercel  ──serves──▶  jobmama.bg
```

---

## Prerequisites (one-time)

- [x] The repo, cloned locally at `D:\Dev Projects\JobMAMA` (done).
- [x] A GitHub account with push access to `Empyriasoft/jobmama` (done — you've been pushing).
- [ ] A **Vercel account** — you'll create it in Step 1 (sign in *with GitHub*, free).
- [ ] Access to your **domain's DNS** for `jobmama.bg` (your `.bg` registrar panel — currently delegated to `max1.cloud` nameservers).

---

## Step 0 — Push the current code first ⚠️ (do this before anything else)

Vercel builds **whatever is on GitHub**. Right now the good version — all the lead-gen fixes (trackable booking CTAs, FAQ, sticky header, UTM capture, etc.) **plus** this guide and `vercel.json` — is only on your machine, not yet pushed. If you deploy before pushing, you'll publish the *old* version.

Ask Claude: **"commit and push everything to GitHub."** (Claude will branch/commit/push with your OK.) Once GitHub shows the latest commit, continue.

> One-time cleanup worth doing here: the design assets and PDFs sitting loose in the repo root (logos, decks, `.fig` files) don't need to ship with the website. They're harmless but bloat the repo — ask Claude to move them into an `assets-source/` folder or add them to `.gitignore` if you'd rather keep them out of git. Optional.

---

## Step 1 — Create the Vercel project

1. Go to **vercel.com** → **Sign Up** → **Continue with GitHub** (authorize it).
2. Click **Add New… → Project**.
3. Find **`Empyriasoft/jobmama`** in the list → **Import**.
   - If you don't see it, click **"Adjust GitHub App Permissions"** and grant Vercel access to that repo/org.

## Step 2 — Confirm build settings & first deploy

Vercel auto-detects Vite. Confirm these (they should already be filled in):

| Setting | Value |
|---|---|
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

Click **Deploy**. In ~1 minute you'll get a live URL like **`jobmama.vercel.app`**. Open it — the site should look exactly like your local `npm run dev`. 🎉

*(You can leave environment variables empty for now — the site builds fine without them. You'll add them in Step 4.)*

## Step 3 — SPA routing (already handled ✅)

The repo now includes **`vercel.json`**:

```json
{ "rewrites": [ { "source": "/(.*)", "destination": "/index.html" } ] }
```

Without this, visiting `jobmama.com/contact` directly would 404, because there's no `contact.html` file — React Router draws that page in the browser. The rewrite tells Vercel "for any path that isn't a real file, serve `index.html` and let the app route." Real files (`/robots.txt`, `/sitemap.xml`, `/favicon.png`, `/og-image.png`) are still served directly. Nothing for you to do — just don't delete this file.

## Step 4 — Environment variables

These control analytics/marketing tags. **They're baked in at *build* time**, so after you add or change one you must **redeploy** for it to take effect.

In Vercel: **Project → Settings → Environment Variables**. Add each (scope: **Production**, and **Preview** if you want them on preview URLs too):

| Variable | What it's for | Set it when… |
|---|---|---|
| `VITE_GTM_ID` | Google Tag Manager container (`GTM-XXXXXXX`) | you create a GTM container |
| `VITE_GSC_VERIFICATION` | Google Search Console verification token | you verify the site in Search Console |
| `VITE_NEWSLETTER_FORM_ACTION` | Lead-magnet email form endpoint (e.g. MailerLite) | you set up an email tool — the email-capture section stays hidden until then |

All three are optional — leave them blank and the site runs fine (analytics simply off). After adding real values: **Deployments → ⋯ → Redeploy**.

## Step 5 — Connect jobmama.bg (⚠️ this domain has EMAIL — do it the mail-safe way)

**Critical:** `jobmama.bg` receives email. Its **MX record points to the bare domain** `jobmama.bg`, and mail servers find your mailbox host by resolving that domain's **A record** (→ `93.94.140.32`, Belcloud). So the naive moves both **break mail**:

- ❌ **Don't change nameservers to Vercel** — Vercel's DNS wouldn't have your `MX`/mail records, so mail dies.
- ❌ **Don't just repoint the `jobmama.bg` A record to Vercel** — that A record is *also* your mail server's address (via the MX). Pointing it at Vercel sends mail to a non-mail server.

**The mail-safe cutover** — keep DNS at `max1.cloud`, give mail its own hostname, *then* move the website. (Because it's your business mail, it's safest to have **max1.cloud do steps 1–2**, or do them yourself carefully and test before step 3.)

1. In the **max1.cloud DNS zone**, add an A record: `mail.jobmama.bg` → `93.94.140.32` (your current mail server).
2. Change the **MX** record target from `jobmama.bg` → `mail.jobmama.bg` (keep **Pref 0**). Wait for propagation (TTL ~4h) and **send a test email to confirm mail still arrives.**
3. Only after mail is confirmed working on the new hostname, point the website:
   - `jobmama.bg` (`@`) **A** → `216.198.79.1` (Vercel)
   - `www` → `cname.vercel-dns.com` (CNAME) — or an A record to `216.198.79.1`
4. **Leave every `MX` and `TXT` (SPF/DKIM/DMARC) record as-is** apart from the MX target change in step 2.
5. In Vercel: **Project → Settings → Domains → Add** `jobmama.bg` and `www.jobmama.bg`. It shows **"Invalid Configuration"** until step 3's A record propagates, then flips to green with auto HTTPS.

> Until you're ready to do this carefully (and while any email outage is being fixed), just use the free **`jobmama.vercel.app`** URL — it needs zero DNS and carries zero email risk.

## Step 6 — Point the site's SEO to the new domain (small code change)

The code still declares `https://jobmama.lovable.app` as the canonical address in a few places (`src/components/SEO.tsx`, `index.html`, `public/sitemap.xml`, `public/robots.txt`). Once `jobmama.bg` is live, these should say `https://jobmama.bg` so Google indexes the right URL and social share images resolve.

When you're ready to cut over, ask Claude: **"swap jobmama.lovable.app for jobmama.bg everywhere in the repo."** It's a two-minute find-and-replace across those files, then push (Vercel redeploys automatically).

---

## Step 7 — Your day-to-day workflow (the whole point)

Once set up, changing the live site is this simple:

1. Open the project with Claude Code (this folder).
2. Tell Claude what you want changed (copy, a new section, colors, a fix…).
3. Claude edits the files and — with your OK — **commits and pushes to GitHub**.
4. Vercel automatically builds and deploys. **~1 minute later it's live** on jobmama.com.

**Two ways to work:**
- **Straight to live (simplest):** push to the `main` branch → production updates. Great for solo, low-risk edits.
- **Preview first (safer for big changes):** Claude pushes to a *branch* → Vercel gives that branch its own **preview URL** (e.g. `jobmama-git-feature-xyz.vercel.app`) to check before it's public → merge to `main` when happy. Just tell Claude "put this on a branch and give me a preview."

You can always watch builds and see every deploy at **vercel.com → your project → Deployments**.

## Step 8 — Retire Lovable cleanly

You chose to move fully to Claude + local, so:

- **The "Made with Lovable" badge and Lovable's analytics disappear automatically.** They were injected by *Lovable's hosting*, not by your code — they simply won't exist on Vercel.
- **Stop editing in Lovable**, and to be safe, **disconnect its GitHub integration** (in Lovable's project settings) so it can't push surprise commits that conflict with your local work. GitHub is now your single source of truth.
- `jobmama.lovable.app` will keep existing harmlessly. You can ignore it, or keep it as a throwaway staging mirror. Your real audience goes to `jobmama.com`.

---

## Rollbacks & safety net

Every deploy is saved. If a change breaks something: **Vercel → Deployments →** find the last good one **→ ⋯ → Promote to Production** (a.k.a. instant rollback). No rebuild, no data loss. This is a big reason self-hosting on Vercel is low-risk.

## Cost

For a low-traffic site this is **free** on Vercel's Hobby plan. One honest caveat: Vercel's free Hobby tier is officially intended for **non-commercial** use. JobMama is a business, so to be fully within their terms you'd move to **Vercel Pro (~$20/month)** — worthwhile once you're running ad campaigns and real traffic. If you'd rather stay free-forever with commercial use allowed, **Cloudflare Pages** is the alternative (same git-push workflow; ask Claude to switch the guide to it). Starting on Hobby to get live and upgrading later is a perfectly normal path.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Build fails on Vercel | Open the build log (Deployments → the red one). It builds cleanly locally, so the usual cause is a missing env var referenced at build, or a Node version quirk. Vercel defaults to a recent Node that works with Vite 5. |
| `jobmama.bg/contact` shows 404 | `vercel.json` is missing or was deleted — restore it (Step 3). |
| Changed an env var but nothing changed | `VITE_` vars bake in at build — **redeploy** (Deployments → ⋯ → Redeploy). |
| Domain won't go live | DNS still propagating (wait, up to 48h), or the nameservers/records don't match what Vercel shows. Recheck in the registrar panel and hit **Refresh** in Vercel. |
| A `@jobmama.bg` mailbox stopped working | You handed jobmama.bg's DNS to Vercel while mail lived on `max1.cloud`. Revert to the `max1.cloud` nameservers and use the A-record method instead (Step 5 note). *(Your `hello@jobmama.com` is a different domain and is never affected.)* |

## Quick reference

```
Local dev:         npm run dev        → http://localhost:8080
Production build:  npm run build      → dist/  (what Vercel serves)
Deploy:            git push           → Vercel auto-builds main → jobmama.bg
Preview a change:  push to a branch   → Vercel gives a per-branch preview URL
Rollback:          Vercel → Deployments → promote a previous deploy
```

**DNS for jobmama.bg — MAIL-SAFE order (jobmama.bg has email!). Keep max1.cloud nameservers:**
```
1) A     mail   93.94.140.32        (give mail its own hostname)
2) MX    @      mail.jobmama.bg     (was: jobmama.bg — change target, keep Pref 0, TEST mail)
3) A     @      216.198.79.1        (only after mail confirmed — points website to Vercel)
   CNAME www    cname.vercel-dns.com
```
Do NOT change nameservers to Vercel and do NOT point `@` at Vercel before steps 1–2, or inbound mail breaks. Leave SPF/DKIM/DMARC TXT records alone.
