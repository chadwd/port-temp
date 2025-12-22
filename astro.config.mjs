import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://chaddunbar.com',
  output: 'static',
  integrations: [sitemap()],
  build: {
    assets: '_astro'
  }
});
