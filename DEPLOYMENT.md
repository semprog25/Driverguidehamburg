# Hamburg DriverGuide - GitHub Pages Deployment

Your app is pre-configured for deployment to:
**https://semprog25.github.io/Driverguidehamburg/**

---

## Fix the Workflow Conflict (One-Time)

You have conflicting workflow files that both create a `github-pages` artifact. Fix this first:

1. Go to: https://github.com/semprog25/Driverguidehamburg/tree/main/.github/workflows
2. **Delete `static.yml`** (click the file, click the trash icon, commit the deletion)
3. **Delete any other `.yml` files** except `deploy.yml`
4. If `deploy.yml` doesn't exist yet, create it (see below)

## Deploy Steps

### 1. Copy the workflow file into your repo

Copy `workflows/deploy.yml` from this project to `.github/workflows/deploy.yml` in your GitHub repository.

You can do this via the GitHub web UI:
- Navigate to your repo
- Click **Add file** > **Create new file**
- Name it `.github/workflows/deploy.yml`
- Paste the contents of `workflows/deploy.yml`
- Commit

### 2. Enable GitHub Pages with Actions

1. Go to **Settings** > **Pages** (left sidebar)
2. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
3. Save

### 3. Push your code

```bash
git add .
git commit -m "Deploy: Reports tab + GitHub Pages config"
git push origin main
```

The workflow will automatically build and deploy. Check progress in the **Actions** tab.

### 4. Verify

Your site will be live at: https://semprog25.github.io/Driverguidehamburg/

---

## How It Works

| What | How |
|------|-----|
| **Base path** | Vite automatically prefixes all assets with `/Driverguidehamburg/` in production |
| **SPA routing** | A `404.html` (copy of `index.html`) is auto-generated so GitHub Pages serves the app for any path |
| **Jekyll bypass** | A `.nojekyll` file is auto-generated so `_`-prefixed Vite assets aren't ignored |
| **Caching** | pnpm dependency caching speeds up subsequent builds |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Blank page | Make sure **Settings > Pages > Source** is set to **GitHub Actions** |
| 404 error | Check that `deploy.yml` is the ONLY workflow in `.github/workflows/` |
| Assets not loading | Verify `base` in `vite.config.ts` matches your repo name |
| Build fails | Check the **Actions** tab for error logs; try `pnpm install && pnpm run build` locally |
| "Artifact already exists" | You still have a second workflow file. Delete ALL files in `.github/workflows/` except `deploy.yml` |

---

## Updating the Live Site

Simply push to `main`:

```bash
git add .
git commit -m "Your update message"
git push
```

The workflow auto-triggers and your site updates in ~2 minutes.
