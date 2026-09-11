# Founder site — Zuhura Akiru (working name)

Personal brand site: **zero dependencies, no build step.** Pure HTML/CSS/JS + one Google Font (Fraunces). Deploys anywhere static: Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3.

## What's in it
- `index.html` — hero, track record, story, offers, journal preview, contact form
- `systems.html` — **soft password gate** (session-persisted) → the three systems + "the one I want to lead"
- `journal/` — index + three finished articles (SEO fuel)
- `404.html`, `robots.txt`, `sitemap.xml`, `_redirects` (Netlify: 301s for old CV + 404 rule)
- `assets/style.css` — **the whole design system in one file**: change `--gold` (line 7) and the site re-skins
- `assets/config.js` — **the only file you edit for identity/links**
- `assets/main.js` — gate, form (Supabase if configured, graceful WhatsApp/email fallback otherwise), reduced-motion aware
- `VIDEO-SCRIPT.md` — 60-second Calendly intro script

## Go-live checklist (5 min)
1. **`assets/config.js`** — set `name`, `domain`, `calendly`, `email`, `whatsapp`, `systemsPass` (change `change-me`!)
2. **`sitemap.xml` + `robots.txt`** — replace `YOUR-DOMAIN.COM`
3. **`_redirects`** — set your real old-CV path(s)
4. **Optional: Supabase leads** — create a `leads` table (columns: name, email, business, message), put URL + anon key in `config.js`. Without it, the form falls back to a prefilled WhatsApp/email — it never dead-ends.
5. **Deploy** — drag the folder into Netlify (recommended: handles `_redirects`), or push and import. GitHub Pages note: 301s need a Netlify/Vercel layer or a rewrite in `404.html` — on GHP the 404 still works, the old-CV 301s won't.

## Notes
- The gate is **soft by design** (client-side, session-persisted): it's a velvet rope, not a vault. Don't put confidential content behind it.
- Accessibility: `prefers-reduced-motion` disables all motion; semantic landmarks, live-region form status, visible focus.
- SEO: canonical + OG + JSON-LD (Person/Article) on every page; articles are real, finished, indexable.
- "Zuhura Akiru" is a working name from the GitHub handle — global find/replace when you confirm the name you want on the site.
