# Grow Up — Website

Vite + React site for Grow Up marketing agency (Hebron, Palestine).

## Pages
- `/` — home (agency overview + services)
- `/social-media` — link-in-bio page

## Develop
```bash
npm install
npm run dev
```

## Build
```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build
```

## Deploy (Cloudflare Pages / Netlify)
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing is handled by `public/_redirects` (`/* /index.html 200`).
