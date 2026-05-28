import { build } from 'vite';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const STATIC_ROUTES = [
  '/',
  '/nosotros',
  '/la-cria',
  '/la-cria/maternales',
  '/la-cria/padrillos',
  '/ventas',
  '/contacto',
  '/subastas',
];

async function prerender() {
  // ── 1. Client build ───────────────────────────────────────────────────────
  console.log('\n📦  Building client bundle...\n');
  await build({ logLevel: 'info' });

  // ── 2. SSR build ──────────────────────────────────────────────────────────
  console.log('\n⚙️   Building SSR bundle...');
  await build({
    build: {
      ssr: path.resolve(__dirname, 'src/entry-server.jsx'),
      outDir: path.resolve(__dirname, 'dist/server'),
      rollupOptions: {
        output: { entryFileNames: '[name].js' },
      },
    },
    logLevel: 'warn',
  });

  // ── 3. Load server bundle ─────────────────────────────────────────────────
  const { render, horses } = await import(
    pathToFileURL(path.resolve(__dirname, 'dist/server/entry-server.js')).href
  );

  // ── 4. Build complete route list ──────────────────────────────────────────
  const dynamicRoutes = horses.map((h) => `/ventas/${h.id}`);
  const allRoutes = [...STATIC_ROUTES, ...dynamicRoutes];
  console.log(`\n🏗️   Pre-rendering ${allRoutes.length} routes...\n`);

  // ── 5. Load HTML template ─────────────────────────────────────────────────
  const template = await fs.readFile(
    path.resolve(__dirname, 'dist/index.html'),
    'utf-8'
  );

  // ── 6. Render each route ──────────────────────────────────────────────────
  let ok = 0;
  let fail = 0;

  for (const route of allRoutes) {
    try {
      const appHtml = render(route);
      const html = template.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

      const segment = route === '/' ? '' : route.slice(1);
      const dir = segment
        ? path.resolve(__dirname, 'dist', segment)
        : path.resolve(__dirname, 'dist');

      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(path.join(dir, 'index.html'), html);
      console.log(`  ✅  ${route}`);
      ok++;
    } catch (err) {
      console.error(`  ❌  ${route}: ${err.message}`);
      fail++;
    }
  }

  // ── 7. Clean up server bundle ─────────────────────────────────────────────
  await fs.rm(path.resolve(__dirname, 'dist/server'), { recursive: true });

  console.log(`\n✨  Done: ${ok} HTML files generated, ${fail} errors\n`);
  if (fail > 0) process.exit(1);
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});
