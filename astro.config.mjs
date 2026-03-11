import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://open-navigation.github.io',
  base: '/opennav.org',
  integrations: [tailwind()],
  output: 'static',
});
