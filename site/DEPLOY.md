# Deploying expressive.sanikant.dev

The site is static (Astro + Starlight) and runs on **Cloudflare Workers static assets**.
`wrangler.jsonc` maps the custom domain `expressive.sanikant.dev`. Cloudflare creates the DNS
record and the HTTPS certificate on the first deploy (`.dev` is HTTPS-only, which is handled
automatically).

## Build locally

You need Node 22.23+, JDK 17+ and the Android SDK (for the snippet compile).

```bash
cd site
npm ci
npm run build:all   # compile verify/snippets, regenerate shapes/springs/logo/reference pages, build
npm run check       # one H1, unique titles/descriptions, JSON-LD, sitemap, links
npm run preview     # http://localhost:4321
```

`npm run build` on its own rebuilds the site without Gradle, using the committed generated files.

## What's generated (and committed)

| File | Made by | From |
|---|---|---|
| `src/data/shapes.json` | `npm run shapes` (verify/shapes-svg, Kotlin) | material3 `MaterialShapes` + graphics-shapes `Morph` |
| `src/styles/springs.css` | `node scripts/gen-springs.mjs` | spring values in `shapes.json` |
| `src/assets/logo.svg`, `public/favicon.svg` | `node scripts/gen-logo.mjs` | Cookie9Sided + Clover4Leaf paths |
| `src/content/docs/reference/*.mdx` | `node scripts/gen-reference.mjs` | `skills/m3-expressive-compose/references/*.md` |
| `public/fonts/material-symbols-rounded.woff2` | `node scripts/fetch-icons.mjs` (runs in `npm run build`) | icons used in `dist/` |
| `public/og/*.png`, `../art/social-preview.png` | `npm run og` (headless Chrome) | `scripts/render-og.mjs` |

Edit the skill's reference `.md` files, not the generated `.mdx` pages. CI fails if a generated
file is out of date.

## Deploy by hand

```bash
cd site
npx wrangler login     # once
npm run deploy         # wrangler deploy
```

## Deploy automatically from GitHub Actions

`.github/workflows/docs.yml` builds and checks the site on every push and pull request. It
deploys on pushes to `main` once these two repository secrets exist:

1. Cloudflare dashboard → **My Profile → API Tokens → Create Token** → template
   **Edit Cloudflare Workers**. Limit it to your account and the `sanikant.dev` zone.
2. GitHub → repo **Settings → Secrets and variables → Actions**:
   - `CLOUDFLARE_API_TOKEN`: the token from step 1
   - `CLOUDFLARE_ACCOUNT_ID`: shown on the Workers & Pages overview page

## After the first deploy

- Google Search Console: the `sanikant.dev` Domain property covers this subdomain. Submit
  `https://expressive.sanikant.dev/sitemap-index.xml`.
- GitHub repo → **About → Website**: `https://expressive.sanikant.dev`.
- GitHub repo → **Settings → Social preview**: upload `art/social-preview.png` (1280×640).
