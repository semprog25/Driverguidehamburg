# Hamburg DriverGuide - Angela

A responsive web application for Angela's private tour guide and chauffeur service in Hamburg.
Built with React 18, TypeScript, Tailwind CSS v4, and Vite.

**Live site:** https://semprog25.github.io/Angelasimplifybookingwebsite/

## Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

## Deployment (GitHub Pages)

The site auto-deploys on every push to `main` via the GitHub Actions workflow at `.github/workflows/deploy.yml`.

**First-time setup:**

1. Go to your repo **Settings > Pages**
2. Set **Source** to **GitHub Actions**
3. Delete any old workflow files in `.github/workflows/` (e.g. `static.yml`) that conflict
4. Push to `main` — the workflow runs automatically

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full troubleshooting details.

## Project Structure

```
/
├── .github/workflows/deploy.yml   # GitHub Pages CI/CD
├── src/
│   ├── app/
│   │   ├── components/            # React components
│   │   │   ├── ui/                # shadcn/ui base components
│   │   │   ├── mobile/            # Mobile-specific components
│   │   │   ├── Home.tsx           # Homepage with Angela mascot
│   │   │   ├── Services.tsx       # Tour listings
│   │   │   ├── Memories.tsx       # Guest memories gallery
│   │   │   ├── MoreSection.tsx    # Legal pages + Admin access
│   │   │   ├── AdminPanel.tsx     # Protected admin dashboard (6 tabs)
│   │   │   └── ...
│   │   ├── context/               # Language context (DE/EN/ES)
│   │   ├── lib/translations.ts    # i18n translation strings
│   │   └── App.tsx                # Main app component
│   ├── styles/                    # CSS (fonts, theme, Tailwind)
│   └── main.tsx                   # Entry point
├── index.html                     # HTML shell
├── vite.config.ts                 # Vite + GitHub Pages config
├── tsconfig.json                  # TypeScript configuration
└── package.json
```

## Features

- Multi-language support (German, English, Spanish)
- Responsive mobile-first design with bottom navigation
- Protected admin panel with 6 tabs (Bookings, Calendar, Blog, Gallery, Settings, Reports)
- Reports tab with yearly highlights and CSV export
- Animated page transitions (Motion)
- Guest memories with photo galleries
- Tour booking form

## Tech Stack

- **React 18** + **TypeScript**
- **Tailwind CSS v4** with custom theme
- **Vite** build tool
- **Motion** (animations)
- **Recharts** (admin reports charts)
- **Radix UI** + **shadcn/ui** (component primitives)
- **Lucide React** (icons)
- **Material UI** (select components)
