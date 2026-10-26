// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://expressive.sanikant.dev',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'M3 Expressive Skill',
      description:
        'An agent skill that writes Material 3 Expressive Jetpack Compose code that compiles. Checked against material3 1.5.0-beta02.',
      logo: { src: './src/assets/logo.svg', alt: 'M3 Expressive Skill' },
      favicon: '/favicon.svg',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/sanikantv/m3-expressive-skill' }],
      editLink: { baseUrl: 'https://github.com/sanikantv/m3-expressive-skill/edit/main/site/' },
      lastUpdated: true,
      disable404Route: true,
      customCss: ['./src/styles/tokens.css', './src/styles/springs.css', './src/styles/custom.css', './src/styles/demos.css'],
      routeMiddleware: './src/route-data.ts',
      components: {
        Footer: './src/components/Footer.astro',
        PageTitle: './src/components/PageTitle.astro',
      },
      head: [
        // Self-hosted Google Sans Flex (wdth, wght, ROND axes) and Material Symbols Rounded.
        {
          tag: 'link',
          attrs: { rel: 'preload', href: '/fonts/google-sans-flex-latin.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
        },
        {
          tag: 'link',
          attrs: { rel: 'preload', href: '/fonts/material-symbols-rounded.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
        },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#FEF7FF', media: '(prefers-color-scheme: light)' } },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#141218', media: '(prefers-color-scheme: dark)' } },
        // Copy buttons on install commands and the shape gallery.
        {
          tag: 'script',
          content: `document.addEventListener('click',e=>{const b=e.target.closest('[data-copy]');if(!b)return;navigator.clipboard?.writeText(b.dataset.copy).then(()=>{b.dataset.copied='';setTimeout(()=>delete b.dataset.copied,1600)})})`,
        },
      ],
      expressiveCode: {
        themes: ['github-dark-default', 'github-light-default'],
        styleOverrides: {
          borderRadius: '1rem',
          codeFontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
        },
      },
      sidebar: [
        { label: 'Start here', items: ['getting-started', 'comparison', 'faq', 'changelog'] },
        {
          label: 'Reference',
          items: [
            'reference',
            'reference/expressive-design',
            'reference/api-status',
            'reference/theme',
            'reference/motion',
            'reference/shapes',
            'reference/audit',
          ],
        },
        {
          label: 'Components',
          items: [
            'components',
            'components/buttons',
            'components/toggle-buttons',
            'components/button-groups',
            'components/split-button',
            'components/icon-buttons',
            'components/fab-menu',
            'components/floating-toolbar',
            'components/flexible-top-app-bar',
            'components/navigation',
            'components/segmented-list',
            'components/progress-and-loading',
            'components/search',
          ],
        },
        { label: 'Guides', items: [{ autogenerate: { directory: 'guides' } }] },
      ],
    }),
  ],
});
