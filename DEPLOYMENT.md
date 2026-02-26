# Hamburg DriverGuide - GitHub Pages Deployment

Your app is now configured for deployment to the custom domain:
**https://driverguidehamburg.semprog.de/**

---

## Custom Domain Setup (Already Done)

Your GitHub Pages is configured with a custom domain. The following changes make it work correctly:

| File | Change |
|------|--------|
| `vite.config.ts` | `base` set to `'/'` (custom domains serve from root, not a sub-path) |
| `public/CNAME` | Contains `driverguidehamburg.semprog.de` — keeps custom domain after every deployment |
| `vite.config.ts` plugin | Also writes `CNAME` to `dist/` during build as a safety net |

---

## Deploy Steps

### 1. Ensure the workflow file exists in your repo

The file `.github/workflows/deploy.yml` must exist in your GitHub repository.
A reference copy is at `workflows/deploy.yml` in this project.

You can create/update it via the GitHub web UI:
- Navigate to your repo
- Click **Add file** > **Create new file**
- Name it `.github/workflows/deploy.yml`
- Paste the contents of `workflows/deploy.yml`
- Commit

### 2. Confirm GitHub Pages settings

1. Go to **Settings** > **Pages** (left sidebar)
2. Under **Source**, select **GitHub Actions**
3. Under **Custom domain**, enter `driverguidehamburg.semprog.de`
4. Ensure **Enforce HTTPS** is checked
5. DNS check should show ✓ green

### 3. Push your code

```bash
git add .
git commit -m "Fix: base path and CNAME for custom domain driverguidehamburg.semprog.de"
git push origin main
```

The workflow will automatically build and deploy. Check progress in the **Actions** tab.

### 4. Verify

Your site will be live at: **https://driverguidehamburg.semprog.de/**

---

## How It Works

| What | How |
|------|-----|
| **Base path** | `'/'` — with a custom domain, all assets are served from the domain root |
| **Custom domain** | `public/CNAME` is copied to `dist/CNAME` by Vite, telling GitHub Pages to keep using the custom domain |
| **SPA routing** | A `404.html` (copy of `index.html`) is auto-generated so the app handles any URL path |
| **Jekyll bypass** | A `.nojekyll` file is auto-generated so `_`-prefixed Vite assets aren't ignored |
| **Caching** | pnpm dependency caching speeds up subsequent builds |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Blank page / assets 404 | Confirm `base: '/'` is set in `vite.config.ts` (NOT `/Driverguidehamburg/`) |
| Custom domain resets after deploy | Confirm `public/CNAME` exists with exactly `driverguidehamburg.semprog.de` (no trailing newline issues) |
| DNS not resolving | Your DNS provider needs a CNAME record: `driverguidehamburg` → `semprog25.github.io` |
| 404 on page refresh | Check that `404.html` was generated in `dist/` (the Vite plugin does this automatically) |
| Build fails | Check the **Actions** tab for error logs; try `pnpm install && pnpm run build` locally |
| "Artifact already exists" | Delete ALL files in `.github/workflows/` except `deploy.yml` |

---

## Updating the Live Site

Simply push to `main`:

```bash
git add .
git commit -m "Your update message"
git push
```

The workflow auto-triggers and your site updates in ~2 minutes.
