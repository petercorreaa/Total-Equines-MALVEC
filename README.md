# Total Equines

Premium Argentine polo horse breeding and sales website. Showcasing elite genetics, maternal bloodlines, stallions, and auction events — built for an international audience with multilingual support.

## Tech Stack

- **React 18 + Vite** — fast dev server and optimized builds
- **React Router DOM v6** — client-side routing with animated transitions
- **Tailwind CSS** — utility-first styling with custom gold/dark palette
- **Framer Motion** — scroll, page, and component animations
- **React Icons** — Feather and Font Awesome icon sets
- **Google Fonts** — Bebas Neue, Montserrat, Jost (sans-serif only)

## Setup

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Inicio | Landing page with hero, highlights, breeding preview, certifications |
| `/nosotros` | Nosotros | Brand story, timeline, team, mission |
| `/la-cria` | La Cría | Breeding program overview with navigation to subpages |
| `/la-cria/maternales` | Maternales | Maternal bloodlines — 6 featured mare lines |
| `/la-cria/padrillos` | Padrillos | Stallion roster — 4 featured stallions with stats |
| `/ventas` | Ventas | Horse sales listings — 40 horses with filters |
| `/ventas/:id` | HorseDetail | Individual horse page — gallery, pedigree, contact CTA |
| `/contacto` | Contacto | Contact form (Formspree), info, map placeholder |
| `/subastas` | Subastas | Upcoming & past auctions, countdown, FAQ, newsletter |

## Folder Structure

```
src/
  components/
    layout/       — Navbar, Footer, ScrollToTop, PageTransition, LoadingScreen, SEOMeta
    ui/           — Reusable UI (HorseCard, PedigreeChart, FilterBar, CountdownTimer, etc.)
  pages/          — Route page components
  data/           — Static data (horses.js — 40 horses, auctions.js — 3 auctions)
  context/        — React context providers (LanguageContext)
  i18n/           — Translation JSON files (es, en, zh)
  hooks/          — Custom hooks (useTranslation, useScrollAnimation)
```

## Configuration

### Formspree (Contact Form)

1. Sign up at [formspree.io](https://formspree.io) (free tier available)
2. Create a new form and copy the form ID
3. In `src/pages/Contacto.jsx`, replace `XXXXXXXX` in the Formspree URL:
   ```js
   const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';
   ```

### Contact Details

Update these placeholder values across the site:

| What | Where | Current Value |
|------|-------|---------------|
| WhatsApp number | `Contacto.jsx`, `HorseDetail.jsx` | `549XXXXXXXXXX` |
| Email | `Contacto.jsx`, `Footer.jsx` | `contacto@totalequines.com.ar` |
| Social media links | `Contacto.jsx`, `Footer.jsx` | `#` placeholders |

## Video Assets

Hero video is not included in the repository due to file size.
Place the following files in `public/assets/videos/`:
- hero-optimized.mp4 (compressed MP4, recommended)
- hero.webm (WebM version for Chrome/Firefox)
- hero.mp4 (original fallback)

To compress the video run:
```bash
ffmpeg -i "hero.mp4" -vcodec libx264 -crf 28 -preset slow -vf "scale=1920:-2" -movflags +faststart -an "hero-optimized.mp4"
```

### Replacing Images

All images are served locally from `public/assets/horses/`. To replace with new photos:

1. Add images to `public/assets/horses/`
2. In `src/data/horses.js`: update the `images` array for each horse
3. In page hero sections: update the `src` attribute on `<img>` tags
4. Recommended image sizes: hero 1920×1080, cards 800×600, thumbnails 400×400

### Adding / Editing Horses

Edit `src/data/horses.js`. Each horse object contains:
- `id` — URL-safe slug (kebab-case)
- `name`, `age`, `sex`, `color`, `heightHH`, `price` (USD or null)
- `description` — 3-4 sentences in Spanish
- `pedigree` — 3-generation tree (sire, dam, grandparents)
- `achievements` — array of accomplishment strings
- `images` — array of 3 image URLs

Export: `horses` (array) and `getHorseById(id)` (lookup function).

### Adding Translations

Translation files: `src/i18n/es.json`, `en.json`, `zh.json`.
Use dot-notation keys with the `useTranslation` hook: `t('ventas.hero_title')`.
Spanish is the primary language; EN/ZH keys are prefixed with `[EN]`/`[ZH]`.

## Deployment

### Vercel

```bash
npm i -g vercel
vercel
```

Set build command: `npm run build`, output directory: `dist`.
Add a `vercel.json` for SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Netlify

```bash
npm run build
```

Upload the `dist/` folder, or connect your Git repo.
Add a `public/_redirects` file:

```
/*    /index.html   200
```

## Environment Variables

No environment variables are required. All configuration is in source files.
If you need to externalize Formspree or API endpoints in the future, create a `.env` file:

```
VITE_FORMSPREE_ID=your_form_id
```

Then reference via `import.meta.env.VITE_FORMSPREE_ID`.

## Credits

- **Design & Development**: Built with React, Tailwind CSS, and Framer Motion
- **Fonts**: [Google Fonts](https://fonts.google.com) — Bebas Neue, Montserrat, Jost
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) — Feather Icons, Font Awesome
