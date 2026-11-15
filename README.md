# We Just Chattin

Website for **We Just Chattin**: building community through thought-provoking conversations.
Built for sponsors and potential attendees. Plain HTML, CSS and a little JS. No build step.

Live: https://jacobmonroe2.github.io/we-just-chattin/

## Pages

- `index.html` — video-wall hero with the mission, stats, most-watched reel (TikTok embeds of the top 12 videos by views, ids hard-coded in the HTML), channels, next event, team, partner CTA
- `partnerships.html` — metrics, audience, offerings, past work, contact
- `styles.css` · `site.js` (mobile menu, lazy clip playback, tap-for-sound)

## Assets

- `assets/logo.png` — WJC logo (transparent)
- `assets/hero/wall-1..5.mp4` + `.jpg` — hero video wall. Each column is twelve 4-second answer segments (host and whip-pan trimmed off) from the 60 Instagram cuts, 432x768, no audio.
  Re-encode new clips the same way:
  ```bash
  ffmpeg -i IN.mp4 -t 20 -vf "scale=720:1280,fps=30" -c:v libx264 -crf 31 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 64k -ac 1 assets/clips/clip-15.mp4
  ffmpeg -ss 1 -i assets/clips/clip-15.mp4 -frames:v 1 -q:v 4 assets/clips/clip-15.jpg
  ```
- `assets/team/` — team baby photos, 800x800 jpg
- `assets/cursor.svg` / `cursor-32.png` / `cursor-64.png` — the spatula cursor (edit the SVG, re-rasterize the PNGs)

## Numbers on the site

Pulled from public pages on Nov 15, 2026. Update them as they grow.

| Metric | Value | Source |
| --- | --- | --- |
| TikTok views | 11.5M across 132 videos | tiktok.com/@wejchattin |
| TikTok followers / likes | 10.1K / 1.4M | tiktok.com/@wejchattin |
| Instagram followers / posts | 10K / 198 | instagram.com/wejchattin |
| Instagram reel views | ~860K across 24 reels | instagram.com/wejchattin/reels (logged in) |
| YouTube | 92 subscribers, 100 shorts | youtube.com/@WejChattin |
| Events | 9 hosted on Posh | posh.vip/e/walk-n-talk-1 |

## Still placeholder

- Partner names on the partnerships page (strip + case studies)
- Contact email (`hello@wejustchattin.com`)

## Run locally

```bash
python3 -m http.server 8000
```

## Deploy

GitHub Pages serves the root of `main`. Push to `main` and it redeploys in about a minute.
