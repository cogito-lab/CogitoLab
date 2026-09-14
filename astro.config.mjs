import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const isUserPage =
  repository && owner && repository.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const base =
  process.env.ASTRO_BASE ||
  (process.env.GITHUB_ACTIONS && repository && !isUserPage ? `/${repository}` : '/');
const site =
  process.env.ASTRO_SITE || (owner ? `https://${owner}.github.io` : 'https://cogito-lab.github.io');

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap()],
});
