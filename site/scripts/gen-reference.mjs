// Turns the skill's reference files (skills/m3-expressive-compose/references/*.md) into the
// site's /reference/ pages, so the site and the skill can't drift apart:
// - drops the markdown H1 (Starlight renders the title),
// - replaces each `<!-- snippet: name -->` code block with <Snippet region="name" />,
// - links mentions of other reference files,
// - inserts the interactive demos listed in PAGES.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const SRC = new URL('../../skills/m3-expressive-compose/references/', import.meta.url);
const OUT = new URL('../src/content/docs/reference/', import.meta.url);

const PAGES = {
  'expressive-design': {
    label: 'Design rules',
    title: 'M3 Expressive design rules for Compose',
    description:
      "Google's seven M3 Expressive tactics, hero moments and the patterns from Google's own examples, turned into rules for Jetpack Compose screens.",
    keywords: ['material 3 expressive guidelines', 'm3 expressive tactics', 'hero moments material design', 'emphasized typography compose'],
    inserts: {
      '## Patterns': '<Demo kind="connected" caption="Pattern 1: selection changes shape as well as color" />',
      '## Docked bar': '<Demo kind="toolbar" caption="Pattern 3: a pill toolbar next to a square-ish vibrant FAB" />',
    },
  },
  'api-status': {
    label: 'API status by version',
    title: 'Material 3 Expressive API status by version',
    description:
      'Which Material 3 Expressive APIs are stable, need @OptIn(ExperimentalMaterial3ExpressiveApi::class), are internal or deprecated in material3 1.4.0 and 1.5.0-beta02.',
    keywords: ['ExperimentalMaterial3ExpressiveApi', 'material3 1.5.0-beta02 expressive', 'material3 1.5.0 deprecated', 'MaterialExpressiveTheme internal'],
    inserts: { '## Quick answer': '<ApiGlance />' },
  },
  theme: {
    label: 'Theme',
    title: 'MaterialExpressiveTheme setup in Compose',
    description:
      'Set up MaterialExpressiveTheme with dynamic color, dark mode, emphasized typography and the new shape scale in Jetpack Compose material3 1.5.0.',
    keywords: ['MaterialExpressiveTheme', 'expressiveLightColorScheme', 'emphasized typography compose', 'material 3 shape scale'],
    inserts: {},
  },
  motion: {
    label: 'Motion',
    title: 'MotionScheme springs in Compose',
    description:
      'MotionScheme.expressive() and standard() spring values, when to use spatial vs effects specs, and how to animate custom Compose UI with them.',
    keywords: ['MotionScheme compose', 'material 3 expressive motion springs', 'defaultSpatialSpec', 'expressive spring animation compose'],
    inserts: { '## The six specs': '<SpringDemo />' },
  },
  shapes: {
    label: 'Shapes',
    title: 'MaterialShapes and shape morphing in Compose',
    description:
      'All 35 MaterialShapes, how to clip with RoundedPolygon.toShape(), and how to morph between shapes with androidx.graphics.shapes.Morph in Jetpack Compose.',
    keywords: ['MaterialShapes compose', 'shape morphing jetpack compose', 'RoundedPolygon toShape', 'material 3 expressive shapes'],
    inserts: { '## Using a shape': '<ShapeGallery />' },
  },
  audit: {
    label: 'Audit',
    title: 'Audit a Compose screen for M3 Expressive',
    description:
      'A checklist with grep commands to review a Jetpack Compose screen against Material 3 Expressive: version, theme, hardcoded values, deprecations and accessibility.',
    keywords: ['material 3 audit compose', 'm3 expressive review checklist', 'compose material3 migration checklist'],
    inserts: {},
  },
};

const FILES = Object.keys(PAGES);
mkdirSync(OUT, { recursive: true });

for (const [name, page] of Object.entries(PAGES)) {
  let md = readFileSync(new URL(`${name}.md`, SRC), 'utf8');
  md = md.replace(/^# .*\n+/, '');
  md = md.replace(/<!-- snippet: (\S+) -->\n```kotlin\n[\s\S]*?```/g, '<Snippet region="$1" />');
  if (md.includes('<!--')) throw new Error(`${name}.md has an HTML comment, which MDX can't parse`);
  // `theme.md` / `references/theme.md` → link to its page.
  md = md.replace(/`(?:references\/)?([a-z-]+)\.md`(?: § ([^\n.,)]+))?/g, (m, file, section) =>
    FILES.includes(file) ? `[${file.replace(/-/g, ' ')}${section ? ` § ${section}` : ''}](/reference/${file}/)` : m,
  );
  md = md.replace(/`SKILL\.md`/g, '[SKILL.md](https://github.com/sanikantv/m3-expressive-skill/blob/main/skills/m3-expressive-compose/SKILL.md)');
  for (const [heading, component] of Object.entries(page.inserts)) {
    const at = md.indexOf(heading);
    if (at < 0) throw new Error(`${name}: heading "${heading}" not found`);
    const lineEnd = md.indexOf('\n', at);
    md = `${md.slice(0, lineEnd + 1)}\n${component}\n${md.slice(lineEnd + 1)}`;
  }
  const front = [
    '---',
    `title: ${JSON.stringify(page.title)}`,
    `description: ${JSON.stringify(page.description)}`,
    `keywords: ${JSON.stringify(page.keywords)}`,
    `sidebar:\n  label: ${JSON.stringify(page.label)}`,
    '---',
    '',
    `{/* Generated by scripts/gen-reference.mjs from skills/m3-expressive-compose/references/${name}.md. Edit that file. */}`,
    '',
    "import Snippet from '../../../components/Snippet.astro';",
    "import Demo from '../../../components/Demo.astro';",
    "import ApiGlance from '../../../components/ApiGlance.astro';",
    "import SpringDemo from '../../../components/SpringDemo.astro';",
    "import ShapeGallery from '../../../components/ShapeGallery.astro';",
    "import GuideEnd from '../../../components/GuideEnd.astro';",
    '',
  ].join('\n');
  writeFileSync(new URL(`${name}.mdx`, OUT), `${front}\n${md.trim()}\n\n<GuideEnd />\n`);
}
console.log(`wrote ${FILES.length} reference pages`);
