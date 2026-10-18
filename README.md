# ALOYCE GAME VAULT

A responsive, dark gaming discovery website built with plain HTML, CSS and JavaScript. It is designed to be edited from an Android phone and hosted on GitHub Pages without Base44 credits.

## Features
- Responsive mobile-first layout
- Game cards, search and category filters
- Sort by name
- Save favourites using browser local storage
- Game details dialog with official website links
- Light/dark contrast toggle
- No build tools, package installation or API keys required

## Files
- `index.html` — page structure
- `styles.css` — layout and styling
- `app.js` — game catalogue and interactions
- `assets/favicon.svg` — site icon

## Run locally
Open `index.html` in a browser. Some mobile browsers may restrict local file behaviour; use GitHub Pages to test the full site.

## Publish with GitHub Pages (Android)
1. Sign in at https://github.com/
2. Create a new **public** repository named `aloyce-game-vault`.
3. In the repository, tap **Add file → Upload files** (desktop site mode may help on Android Chrome).
4. Upload `index.html`, `styles.css`, `app.js`, `README.md`, and the `assets` folder contents.
5. Commit the files.
6. Open **Settings → Pages**.
7. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
8. Wait for GitHub Pages to publish. The site URL will usually look like `https://YOUR-USERNAME.github.io/aloyce-game-vault/`.

## Add or edit games
Open `app.js` and edit the `games` array. Each game has:
- `id`: unique short identifier
- `title`: display name
- `category`: `Open World`, `Action`, `Android`, or `Indie`
- `platform`: platform text
- `tag`, `year`, `desc`
- `image`: image URL
- `official`: official game website

Only link users to official or authorized download sources. Game trademarks and artwork belong to their respective owners.

## Important limitations
This is a new static website inspired by the requested ALOYCE GAME VAULT style; it is **not an export of the original Base44 project**. It does not yet include the original Base44 database, authentication, admin dashboard, payment processing, user accounts, or server-side features. Those require separate implementation and, where needed, secure backend services.
