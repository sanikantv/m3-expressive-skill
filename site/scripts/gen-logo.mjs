// Builds the logo and favicon from the real MaterialShapes paths in src/data/shapes.json:
// a primary (#6750A4) Cookie9Sided with a light Clover4Leaf inside. Paths are in a 0..100 box.
import { readFileSync, writeFileSync } from 'node:fs';

const { shapes } = JSON.parse(readFileSync(new URL('../src/data/shapes.json', import.meta.url)));
const path = (name) => shapes.find((s) => s.name === name).path;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 108 108"><path fill="#6750A4" d="${path('Cookie9Sided')}"/><path fill="#EADDFF" transform="translate(29 29) scale(.42)" d="${path('Clover4Leaf')}"/></svg>\n`;
writeFileSync(new URL('../src/assets/logo.svg', import.meta.url), svg);
writeFileSync(new URL('../public/favicon.svg', import.meta.url), svg);
console.log('wrote src/assets/logo.svg and public/favicon.svg');
