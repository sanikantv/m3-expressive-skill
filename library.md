# Library information

Single source of truth for https://expressive.sanikant.dev. Every fact below was checked against
this repo and the material3 sources on 2026-10-26.

## Library

- Name: M3 Expressive Skill for Jetpack Compose (skill name `m3-expressive-compose`)
- Tagline: Material 3 Expressive Compose code your agent gets right
- Repository: https://github.com/sanikantv/m3-expressive-skill
- Latest version: 0.1.0 (unreleased)
- License: MIT
- Author: Sanikant (sanikant.dev)

## Install

- Claude Code: `/plugin marketplace add sanikantv/m3-expressive-skill`, then
  `/plugin install m3-expressive-compose@m3-expressive-skill`
- Other agents: `npx --yes skills add sanikantv/m3-expressive-skill --skill m3-expressive-compose -y`
- Manual: copy `skills/m3-expressive-compose` into `.claude/skills/` (or the agent's skills dir)
- Checked against: `androidx.compose.material3` 1.5.0-beta02, Compose BOM 2026.09.00, Kotlin 2.2.10,
  AGP 9.4.1, minSdk 26, compileSdk 37 (verify/ module)

## Positioning

- What it does: gives coding agents version-accurate facts and compiled code for M3 Expressive in Compose.
- What other skills don't: per-version API status (stable / opt-in / internal / missing),
  deprecations since 1.4.0 with replacements, and samples that CI compiles.
- Target developers: Android developers using Claude Code, Codex, Cursor or Copilot for Compose UI.
- Primary use cases: build Expressive screens, migrate to material3 1.5.0, review screens.

## Content

| Area | Source of truth |
|---|---|
| Rules, component map, workflow | `skills/m3-expressive-compose/SKILL.md` |
| Design rules (tactics, hero moments, Google's patterns) | `references/expressive-design.md` (from the May 13, 2025 launch post + launch clips) |
| API status | `references/api-status.md` (from material3 1.4.0 / 1.5.0-beta01 / beta02 sources) |
| Theme, motion, shapes, components, audit | `references/*.md` |
| Code | `verify/snippets` (28 regions), compiled in CI |
| Shapes and morph data on the site | `verify/shapes-svg` → `site/src/data/shapes.json` |

## Demo media

No Google media is republished. Everything on the site is generated:
- the shapes and morphs come from material3's polygon definitions
- the demos are HTML/CSS approximations
- the OG cards are rendered with Google Sans Flex (OFL)

## SEO

See `site/seo-report.md`.
