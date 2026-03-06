# Hamburg DriverGuide — Deployment Guide

Live URL: **https://driverguidehamburg.semprog.de/**

---

## Why GitHub Actions may not deploy

The most common causes, in order:

| # | Cause | Fix |
|---|-------|-----|
| 1 | `.github/workflows/deploy.yml` doesn't exist in the repo | Create it (see Step 1 below) |
| 2 | GitHub Pages source is not set to **GitHub Actions** | Change it (see Step 2 below) |
| 3 | A second workflow file conflicts (e.g. `static.yml`) | Delete all `.yml` files except `deploy.yml` |
| 4 | pnpm lockfile mismatch causes build to fail | Workflow uses `--no-frozen-lockfile` — this is already fixed |
| 5 | Custom domain resets after deploy (CNAME missing) | `public/CNAME` file exists in this project — already fixed |

---

## Step 1 — Create `.github/workflows/deploy.yml` on GitHub

Figma Make cannot write hidden directories, so you must do this on GitHub directly.

### Option A — GitHub web UI (easiest)

1. Go to: **https://github.com/semprog25/Driverguidehamburg**
2. Click **Add file** → **Create new file**
3. In the filename box, type exactly: `.github/workflows/deploy.yml`
   - GitHub will automatically create the nested folders
4. Paste the **entire contents** of `workflows/deploy.yml` from this project
5. Click **Commit changes** → commit directly to `main`

### Option B — Git command line

```bash
mkdir -p .github/workflows
cp workflows/deploy.yml .github/workflows/deploy.yml
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deploy workflow"
git push origin main
```

> If `.github/workflows/deploy.yml` already exists, compare it with `workflows/deploy.yml` in this project and make sure they match exactly.

---

## Step 2 — Configure GitHub Pages to use GitHub Actions

1. Go to your repo → **Settings** → **Pages** (left sidebar)
2. Under **Build and deployment → Source**, select **GitHub Actions**
   - ⚠️ Do NOT select "Deploy from a branch" — that uses a different system
3. Under **Custom domain**, type: `driverguidehamburg.semprog.de`
4. Click **Save** — wait for the DNS check to go green
5. Check **Enforce HTTPS**

---

## Step 3 — Check your DNS is correct

Your DNS provider needs this record:

| Type | Name | Value |
|------|------|-------|
| `CNAME` | `driverguidehamburg` | `semprog25.github.io` |

DNS changes can take up to 24h. You can verify with:
```
nslookup driverguidehamburg.semprog.de
```
It should resolve to GitHub's servers.

---

## Step 4 — Push your code and trigger a deploy

```bash
git add .
git commit -m "Deploy: fix workflow and custom domain"
git push origin main
```

The workflow triggers automatically on push to `main`. You can also trigger it manually:
- Go to repo → **Actions** tab → **Deploy to GitHub Pages** → **Run workflow** → **Run workflow**

---

## Step 5 — Watch the Actions log

1. Go to repo → **Actions** tab
2. Click the latest **Deploy to GitHub Pages** run
3. If it shows ✅ green — your site is live
4. If it shows ❌ red — click on the failed step to see the error log

### Common build errors and fixes

| Error message | Fix |
|---------------|-----|
| `ERR_PNPM_LOCKFILE_MISSING` | Already handled by `--no-frozen-lockfile` in the workflow |
| `Module not found` | A package is missing; run `pnpm install` locally and push |
| `configure-pages: Error` | GitHub Pages source is not set to GitHub Actions (Step 2) |
| `Artifact already exists` | Two workflow files are running — delete all except `deploy.yml` |
| `deploy-pages: Error` | `pages: write` permission missing — check the workflow has the correct `permissions` block |

---

## How it works

| What | How |
|------|-----|
| **base path** | `'/'` — custom domains serve from root, not a sub-path |
| **CNAME** | `public/CNAME` is copied to `dist/CNAME` by Vite, telling GitHub Pages to keep the custom domain after every deploy |
| **SPA routing** | `404.html` (copy of `index.html`) is auto-generated so direct URL access works |
| **Jekyll bypass** | `.nojekyll` is auto-generated so `_`-prefixed Vite assets aren't hidden |

---

## Updating the live site

```bash
git add .
git commit -m "Your update message"
git push
```

Deploys automatically in ~2 minutes.
