# Deployment Guide for Hamburg DriverGuide

This guide covers three easy ways to deploy your application online.

---

## Option 1: GitHub Pages (Free) ⭐ Recommended

GitHub Pages is completely free and automatically rebuilds when you push changes.

### Step 1: Update the Base URL

1. Open `vite.config.ts`
2. Replace `your-repo-name` with your actual GitHub repository name:
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/hamburg-driver-guide/' : '/',
   ```
   
   Example: If your repository is `https://github.com/yourusername/hamburg-driver-guide`, use `/hamburg-driver-guide/`

### Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically run and deploy your site

### Step 4: Access Your Site

Your site will be available at: `https://yourusername.github.io/your-repo-name/`

The deployment takes about 1-2 minutes. Check the **Actions** tab to see the build progress.

---

## Option 2: Vercel (Free)

Vercel offers unlimited deployments and automatic previews for every push.

### Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### Step 2: Deploy

**Method A: Using Vercel CLI**
```bash
vercel
```
Follow the prompts and your site will be deployed in seconds!

**Method B: Using Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Sign in with GitHub
3. Click **Add New** → **Project**
4. Import your GitHub repository
5. Vercel auto-detects Vite settings
6. Click **Deploy**

Your site will be live at `https://your-project.vercel.app`

### Important for Vercel:
Update `vite.config.ts` to use root path:
```typescript
base: '/',  // Change this for Vercel
```

---

## Option 3: Netlify (Free)

Netlify is great for static sites with drag-and-drop deployment.

### Step 1: Build Your Project Locally

```bash
npm install
npm run build
```

This creates a `dist` folder with your production files.

### Step 2: Deploy

**Method A: Drag & Drop**
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Sign in
3. Drag the `dist` folder onto the Netlify dashboard
4. Your site is live!

**Method B: Connect to GitHub**
1. Go to [netlify.com](https://netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Connect your GitHub repository
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy**

Your site will be at `https://random-name.netlify.app` (you can customize this)

### Important for Netlify:
Update `vite.config.ts` to use root path:
```typescript
base: '/',  // Change this for Netlify
```

---

## Quick Comparison

| Feature | GitHub Pages | Vercel | Netlify |
|---------|-------------|--------|---------|
| **Cost** | Free | Free | Free |
| **Custom Domain** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Auto Deploy** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Build Time** | ~2 min | ~1 min | ~1 min |
| **SSL/HTTPS** | ✅ Auto | ✅ Auto | ✅ Auto |
| **Best For** | Simple static sites | All projects | All projects |

---

## Updating Your Site

Once deployed, updating is easy:

### For GitHub Pages:
```bash
git add .
git commit -m "Update content"
git push
```
The site auto-updates in 1-2 minutes.

### For Vercel/Netlify:
Just push to GitHub, and they'll automatically rebuild and deploy!

---

## Troubleshooting

### Images not loading after deployment?
- Make sure all image URLs are absolute (https://) or use the correct base path
- Check that image URLs in your code are accessible

### Page shows 404 on refresh?
- For Vercel/Netlify: This shouldn't happen with Vite
- For GitHub Pages: Make sure your base URL in `vite.config.ts` is correct

### Build fails?
- Check the build logs in the **Actions** tab (GitHub) or deployment logs (Vercel/Netlify)
- Make sure all dependencies are in `package.json`
- Try building locally first: `npm run build`

---

## Need Help?

- GitHub Pages: [docs.github.com/pages](https://docs.github.com/pages)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Netlify: [docs.netlify.com](https://docs.netlify.com)
