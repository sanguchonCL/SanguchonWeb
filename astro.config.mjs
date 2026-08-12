// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.sanguchonoficial.cl',
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: 'esnext',
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
    },
  },
  integrations: [react()],
});
