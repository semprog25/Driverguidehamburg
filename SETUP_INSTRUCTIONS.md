# 🚀 Step-by-Step Setup Guide for Your First Deployment

Welcome! This guide will help you deploy **Hamburg DriverGuide** to GitHub Pages for FREE.

---

## ✅ Prerequisites Check

Before starting, make sure you have:
- ✅ GitHub account (you already have this!)
- ✅ Your repository: `https://github.com/semprog25/Angelasimplifybookingwebsite`
- ✅ Git installed on your computer ([Download here](https://git-scm.com/) if needed)

---

## 📝 Step 1: Update Your Configuration File

This is the MOST IMPORTANT step! You need to tell your app where it will live on the internet.

### What to do:

1. **Open the file:** `vite.config.ts` (in the root of your project)

2. **Find this line:**
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
   ```

3. **Replace it with:**
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/Angelasimplifybookingwebsite/' : '/',
   ```

4. **Save the file** (Ctrl+S or Cmd+S)

⚠️ **Important Notes:**
- The repo name is case-sensitive: `Angelasimplifybookingwebsite` (capital A)
- Don't forget the forward slashes: `/Angelasimplifybookingwebsite/`
- This must match your GitHub repository name exactly

---

## 📤 Step 2: Push Your Code to GitHub

Your code needs to be on GitHub for this to work. Here's how:

### Option A: If you've NEVER pushed to this repository:

Open your terminal/command prompt in your project folder and run these commands one by one:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all your files
git add .

# 3. Create your first commit
git commit -m "Initial commit - Hamburg DriverGuide"

# 4. Set the main branch
git branch -M main

# 5. Connect to your GitHub repository
git remote add origin https://github.com/semprog25/Angelasimplifybookingwebsite.git

# 6. Push your code to GitHub
git push -u origin main
```

### Option B: If you've already pushed code before:

```bash
# 1. Add your changes
git add .

# 2. Commit your changes
git commit -m "Update vite config for GitHub Pages"

# 3. Push to GitHub
git push
```

---

## 🌐 Step 3: Enable GitHub Pages

Now let's turn on GitHub Pages to make your site live!

### Detailed Steps:

1. **Go to your repository:**
   - Open: `https://github.com/semprog25/Angelasimplifybookingwebsite`

2. **Click on "Settings"**
   - Look at the top menu bar of your repository
   - Click the "Settings" tab (it's usually the last item)

3. **Find "Pages" in the sidebar**
   - On the left sidebar, scroll down
   - Click on "Pages" (under "Code and automation" section)

4. **Configure the Source**
   - You'll see a section called "Build and deployment"
   - Under "Source", click the dropdown menu
   - **Select: "GitHub Actions"** (NOT "Deploy from a branch")

5. **Wait for it to save**
   - The page will automatically save your selection
   - You should see a checkmark or confirmation

---

## ⏱️ Step 4: Wait for Deployment

The first deployment takes 1-2 minutes. Here's what happens:

1. **Go to the "Actions" tab** in your repository
   - Click "Actions" in the top menu
   - You'll see a workflow running called "Deploy to GitHub Pages"

2. **Watch the progress**
   - There will be a yellow dot 🟡 (in progress)
   - Wait for it to turn green ✅ (success)
   - If it turns red ❌, something went wrong (see Troubleshooting below)

3. **Your site is live!**
   - Once you see the green checkmark, your site is deployed!

---

## 🎉 Step 5: View Your Live Site

Your site will be available at:

```
https://semprog25.github.io/Angelasimplifybookingwebsite/
```

**Copy and paste this URL into your browser!**

---

## 🔄 How to Update Your Site Later

Whenever you want to make changes:

1. **Make your changes** in the code
2. **Save all files**
3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Description of what you changed"
   git push
   ```
4. **Wait 1-2 minutes** for the site to rebuild automatically

That's it! Every push to the `main` branch will automatically update your live site.

---

## ❌ Troubleshooting

### Problem: The Actions tab shows a red X (failed)

**Solution:**
1. Click on the failed workflow
2. Look at the error message
3. Common issues:
   - **Build error:** There might be a syntax error in your code
   - **Permission error:** Go to Settings → Actions → General → Scroll to "Workflow permissions" → Select "Read and write permissions" → Save

### Problem: I see "404 - Page Not Found"

**Solution:**
- Check that `vite.config.ts` has the correct repository name: `/Angelasimplifybookingwebsite/`
- Make sure you selected "GitHub Actions" (not "Deploy from a branch")
- Wait a few more minutes - sometimes it takes time to propagate

### Problem: The site looks broken (no styles/images)

**Solution:**
- This means the `base` path in `vite.config.ts` is wrong
- Double-check: it should be `/Angelasimplifybookingwebsite/` with slashes on both sides
- Push the fix and wait for redeployment

### Problem: Git asks for username/password

**Solution:**
- GitHub no longer accepts passwords for git operations
- You need to use a Personal Access Token:
  1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token (classic)
  3. Select scopes: `repo` (all checkboxes under repo)
  4. Copy the token
  5. Use this token instead of your password

### Problem: "Permission denied" when pushing

**Solution:**
```bash
# Re-add the remote URL with authentication
git remote set-url origin https://semprog25@github.com/semprog25/Angelasimplifybookingwebsite.git
```

---

## 📱 Share Your Site

Once live, you can share this URL with anyone:
```
https://semprog25.github.io/Angelasimplifybookingwebsite/
```

No login required - it's public and accessible to everyone!

---

## 🎯 Quick Checklist

- [ ] Updated `vite.config.ts` with correct repo name
- [ ] Pushed code to GitHub
- [ ] Enabled GitHub Pages (selected "GitHub Actions")
- [ ] Waited for green checkmark in Actions tab
- [ ] Visited the live site URL

---

## 💡 Pro Tips

1. **Bookmark your live URL** so you can easily check it
2. **Star your own repository** so you can find it easily
3. **Check the Actions tab** if something doesn't look right
4. **Test locally first** with `npm run dev` before pushing

---

## 🆘 Still Need Help?

If you're stuck:
1. Check the Actions tab for error messages
2. Make sure the file `vite.config.ts` was saved with the correct repo name
3. Verify you selected "GitHub Actions" in Pages settings
4. Wait at least 2-3 minutes for the first deployment

---

**Good luck! 🚀 Your Hamburg DriverGuide site will be live soon!**
