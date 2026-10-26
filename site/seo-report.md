# SEO report: expressive.sanikant.dev

## Primary keywords (home)

| Keyword | Intent | Page |
|---|---|---|
| material 3 expressive jetpack compose | learn / build | `/` |
| m3 expressive agent skill | find a tool | `/` |
| claude code jetpack compose skill | find a tool | `/`, `/guides/agent-skill-for-jetpack-compose/` |

## Keyword → page

| Keyword | Page |
|---|---|
| ExperimentalMaterial3ExpressiveApi, "is ButtonGroup experimental" | `/guides/experimentalmaterial3expressiveapi/`, `/reference/api-status/` |
| material3 1.5.0 deprecated, ListItem headlineContent deprecated, TopSearchBar renamed | `/guides/material3-1-5-0-migration/` |
| how to use material 3 expressive in compose | `/guides/material-3-expressive-jetpack-compose/` |
| MotionScheme compose, expressive spring animation | `/guides/spring-animations-motionscheme/`, `/reference/motion/` |
| shape morphing jetpack compose, MaterialShapes | `/guides/shape-morphing-jetpack-compose/`, `/reference/shapes/` |
| make compose screen expressive, m3 expressive checklist | `/guides/make-a-compose-screen-expressive/` |
| material 3 expressive guidelines / tactics / hero moments | `/reference/expressive-design/` |
| MaterialExpressiveTheme, expressiveLightColorScheme | `/reference/theme/` |
| ButtonGroup compose, connected button group | `/components/button-groups/` |
| FloatingActionButtonMenu, fab menu compose | `/components/fab-menu/` |
| HorizontalFloatingToolbar, bottom app bar replacement | `/components/floating-toolbar/` |
| LoadingIndicator compose, wavy progress | `/components/progress-and-loading/` |
| SegmentedListItem, compose settings screen | `/components/segmented-list/` |
| ShortNavigationBar, WideNavigationRail | `/components/navigation/` |
| SearchBar deprecated, rememberSearchBarState | `/components/search/` |
| ToggleButton compose / split button / icon button shapes / flexible app bar / button sizes | matching `/components/*` page |
| material 3 skill comparison | `/comparison/` |

## Technical

- Unique title and description on every page. `scripts/check-dist.mjs` enforces this, plus one H1, canonical, OG/Twitter tags, author, keywords, valid JSON-LD and sitemap coverage.
- JSON-LD:
  - `SoftwareSourceCode` on the home page
  - `BreadcrumbList` on inner pages
  - `TechArticle` on guides
  - `FAQPage` on the home page, the FAQ and guides with `faq` frontmatter

  No ratings, counts or invented numbers.
- `sitemap-index.xml` (Starlight), `robots.txt`, `llms.txt`.
- OG cards (1200×630) per section in `public/og/`, set in Google Sans Flex.
- Fonts are self-hosted: Google Sans Flex (wdth/wght/ROND, about 174 KB latin, preloaded) and a Material Symbols subset (about 11 KB). No third-party requests at runtime.
- Motion respects `prefers-reduced-motion`.

## Future guides

- Expressive settings screen end to end (SegmentedListItem + LargeFlexibleTopAppBar)
- Variable fonts in Compose (FontVariation width/weight/ROND) for emphasized type
- Migrating a 1.5.0 alpha project to beta (opt-in cleanup)
- Floating toolbar + FAB menu on tablets (WideNavigationRail layouts)

## Not verified

- Google research numbers (46 studies, 18,000+ participants, up to 4× faster) are quoted from the launch post, not independently checked.
- "Patterns seen in Google's examples" are observations from the launch clips, not published rules. The pages say so.
