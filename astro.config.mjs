import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO: Update with your actual domain
  site: 'https://yourdomain.com',
  output: 'static',
  integrations: [sitemap()],
  build: {
    assets: '_astro'
  }
});
