# We Just Chattin

Website for **We Just Chattin**: build community through thought-provoking conversations.
Built for sponsors and potential attendees. Plain HTML, CSS, and a few lines of JS. No build step.

Live: https://jacobmonroe2.github.io/we-just-chattin/

## Pages

- `index.html` — mission, featured video, stats, channels, photo gallery, next event, team (with baby photos), partner CTA
- `partnerships.html` — metrics, audience, offerings, past work, contact
- `styles.css` — shared styles · `site.js` — mobile menu + footer year

## Before sharing with sponsors

Everything marked `PLACEHOLDER` in the HTML needs real data:

1. **Numbers** — stats on both pages (views, engagement, attendees, audience breakdown).
2. **Video** — replace `VIDEO_ID` in `index.html` with a real YouTube video id.
3. **Social links** — currently point at `@wejustchattin` on YouTube, Instagram, TikTok. Fix if the handles differ.
4. **Emails** — `hello@` and `partnerships@wejustchattin.com`.
5. **Team** — names, roles, and baby photos in `assets/team/` (square images work best).
6. **Photos** — replace the SVGs in `assets/moments/` with real event photos. Keep the filenames or update the `<img>` tags.
7. **Next event** — date, topic, location card in the Attend section.
8. **Case studies** — partner names, results, and links on the partnerships page.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

GitHub Pages serves the root of `main`. Push to `main` and it redeploys in about a minute.
