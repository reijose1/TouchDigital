// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // <--- CAMBIADO: Antes era 'https://learningtouch.com' 
  site: 'https://reijose1.github.io',
  
  // <--- NUEVO: La ruta base que coincide con el nombre de tu repositorio
  base: '/TouchDigital',
  
  // <--- NUEVO: Forzamos el modo estático (es el que usa Astro por defecto, 
  // pero explicitarlo evita que GitHub Pages intente servir funciones server-side)
  output: 'static',

  // ---------- DE AQUÍ PARA ABAJO NO TOCAMOS NADA, QUEDA IGUAL ----------
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: false,  // <--- Se respeta tu petición, sigue desactivado
    },
    optimizeDeps: {
      noDiscovery: true,
      include: [],    // <--- Se respeta tu array vacío
    },
  },
});
