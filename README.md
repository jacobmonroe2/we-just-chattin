# We Just Chattin

Website for **We Just Chattin**: building community through thought-provoking conversations.
Built for sponsors and potential attendees. Plain HTML, CSS and a little JS. No build step.

Live: https://jacobmonroe2.github.io/we-just-chattin/

## Pages

- `index.html` — video-wall hero with the mission, stats, most-watched reel (TikTok and Instagram embeds of the top videos by views, ids hard-coded in the HTML), channels, next event, team, partner CTA
- `chapters/index.html` — Chapters index (one card per university; "Your campus" card for new chapters)
- `chapters/howard.html` — Howard University chapter page (intro, team, events). Copy it for a new school.
- `partnerships.html` — metrics, audience, offerings, past work, contact
- `styles.css` · `site.js` (mobile menu, lazy clip playback, tap-for-sound)

## Assets

- `assets/logo.png` — WJC logo (transparent)
- `assets/hero/wall-1..5.mp4` + `.jpg` — hero video wall. Each column is twelve 4-second answer segments (host and whip-pan trimmed off) from the 60 Instagram cuts, 720x1280 (from the 4K masters in ~/Desktop/WJC Clips), no audio.
  Re-encode new clips the same way:
  ```bash
  ffmpeg -i IN.mp4 -t 20 -vf "scale=720:1280,fps=30" -c:v libx264 -crf 31 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 64k -ac 1 assets/clips/clip-15.mp4
  ffmpeg -ss 1 -i assets/clips/clip-15.mp4 -frames:v 1 -q:v 4 assets/clips/clip-15.jpg
  ```
- `assets/about/sizwe-session.jpg` — founder-letter photo (Season 2 session). The letter text lives in `index.html` under `<!-- ABOUT -->`.
- `assets/team/` — team baby photos, 800x800 jpg
- `assets/partners/` — grey sponsor logos and sponsored videos (Buttah Skin, Capital City Mambo Sauce)
- `assets/events/` — Walk N' Talk promo video + poster, plus one proof photo per past event (`walk-n-talk-sep16.jpg`, `session-6-oct7.jpg`, `session-4-sep23.jpg`). Past events are cards in `index.html` under `<!-- PAST EVENTS -->`: photo, name, date and place, link.

## Numbers on the site

Pulled from public pages on Nov 15, 2026. Update them as they grow.

| Metric | Value | Source |
| --- | --- | --- |
| TikTok views | 11.5M across 132 videos | tiktok.com/@wejchattin |
| TikTok followers / likes | 10.1K / 1.4M | tiktok.com/@wejchattin |
| Instagram followers / posts | 10K / 198 | instagram.com/wejchattin |
| Instagram reel views | 15.3M across 187 reels (top reel 4.8M, 17 past 100K) | WJC Instagram Reels Tracker (Google Sheet), Reels tab |
| Instagram post & carousel views | 2.7M (top carousel 1.7M) | same sheet, Posts & Carousels tab |
| YouTube | 92 subscribers, 100 shorts | youtube.com/@WejChattin |
| Events | 9 hosted on Posh | posh.vip/e/walk-n-talk-1 |

## Still placeholder

- Contact email (`hello@wejustchattin.com`)

## Run locally

```bash
python3 -m http.server 8000
```

## Deploy

GitHub Pages serves the root of `main`. Push to `main` and it redeploys in about a minute.
