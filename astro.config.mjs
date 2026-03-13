import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { visit } from 'unist-util-visit';

// Remark plugin to rewrite image paths with base URL
function remarkBaseUrl() {
  const base = '/';
  return (tree) => {
    visit(tree, 'image', (node) => {
      if (node.url && node.url.startsWith('/') && !node.url.startsWith(base)) {
        // Remove leading slash before concatenating with base (which has trailing slash)
        node.url = base + node.url.slice(1);
      }
    });
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://opennav.org',
  base: '/',
  integrations: [tailwind()],
  output: 'static',
  markdown: {
    remarkPlugins: [remarkBaseUrl],
  },
});
