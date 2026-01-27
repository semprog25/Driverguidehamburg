# Hamburg DriverGuide - Angela

This is a responsive web application for Angela's DriverGuide service in Hamburg.
Built with React, Tailwind CSS, and Vite.

## 🚀 Quick Start

1.  **Install Dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```

3.  **Build for Production:**
    ```bash
    npm run build
    ```

## 📦 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for detailed instructions on deploying to:
- **GitHub Pages** (recommended, free)
- **Vercel** (free, fastest)
- **Netlify** (free, easy)

### Quick Deploy to GitHub Pages:

1. Update `vite.config.ts` with your repository name
2. Push to GitHub
3. Enable GitHub Pages in repository settings (select "GitHub Actions")
4. Your site will be live at `https://yourusername.github.io/repo-name/`

## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Vite** - Build tool
- **Motion** (Framer Motion) - Animations
- **Lucide React** - Icons
- **Material UI** - Additional components

## 📁 Project Structure

```
hamburg-driver-guide/
├── src/
│   ├── app/
│   │   ├── components/     # React components
│   │   ├── context/        # Context providers (Language)
│   │   ├── lib/           # Utility functions
│   │   ├── translations.ts # i18n translations
│   │   └── App.tsx        # Main app component
│   ├── styles/
│   │   ├── fonts.css      # Font imports
│   │   ├── theme.css      # Theme variables
│   │   └── tailwind.css   # Tailwind directives
│   └── main.tsx           # App entry point
├── index.html             # HTML entry
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies
```

## 🌐 Features

- **Multi-language support** (English/German)
- **Responsive design** (mobile-first)
- **Protected admin panel**
- **Interactive animations**
- **Image optimization with fallbacks**
- **Accessibility compliant**

## 📝 License

Private project for Angela's DriverGuide service.