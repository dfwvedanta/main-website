# 🚀 Complete Setup Guide - GitHub + Vercel Production Admin

This guide will set up your admin panel to work on BOTH:
- ✅ **Local (Windows)** - Edit locally with auto-sync
- ✅ **Production (Vercel)** - Edit from anywhere, auto-deploys

---

## 📋 Prerequisites

- GitHub account
- Vercel account
- This project (newdesign folder)

---

## STEP 1: Create GitHub Repository

### 1.1 Create New Repo on GitHub

1. Go to https://github.com/new
2. **Repository name**: `vedanta-website` (or your choice)
3. **Description**: "Vedanta DFW Website with CMS"
4. **Visibility**: Private (recommended) or Public
5. **DO NOT** initialize with README (we already have files)
6. Click **"Create repository"**

### 1.2 Note Your Repository Info

After creating, you'll see something like:
```
https://github.com/YOUR_USERNAME/vedanta-website
```

**Write down:**
- Your GitHub username: `_______________`
- Your repository name: `_______________`

---

## STEP 2: Connect Local Project to GitHub

### 2.1 Open Terminal in newdesign folder

```bash
cd "C:\My Web Sites\https___www.vedantadfw.org_\newdesign"
```

### 2.2 Set Git Remote (UPDATE WITH YOUR INFO!)

```bash
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values!
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Verify it was added
git remote -v
```

### 2.3 Commit All Current Work

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit with CMS integration"

# Push to GitHub
git push -u origin master
```

**Your code is now on GitHub!** ✅

---

## STEP 3: Update Admin Config with Your Repo

### 3.1 Edit admin/config.yml

Open `admin/config.yml` and find this line:
```yaml
repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME  # ← UPDATE THIS!
```

**Replace with your actual values:**
```yaml
repo: your-actual-username/vedanta-website
```

For example, if your username is `johndoe`:
```yaml
repo: johndoe/vedanta-website
```

### 3.2 Save and Commit

```bash
git add admin/config.yml
git commit -m "Update admin config with GitHub repo"
git push
```

---

## STEP 4: Create GitHub OAuth App

This allows Decap CMS to authenticate with GitHub.

### 4.1 Go to GitHub Settings

1. Click your profile picture → **Settings**
2. Scroll down to **Developer settings** (bottom left)
3. Click **OAuth Apps**
4. Click **"New OAuth App"**

### 4.2 Fill in OAuth App Details

**Application name:**
```
Vedanta CMS - Production
```

**Homepage URL:**
```
https://newdesign-phi.vercel.app
```

**Application description:**
```
CMS for Vedanta DFW website
```

**Authorization callback URL:**
```
https://api.netlify.com/auth/done
```

*Note: Even though we use Vercel, Decap CMS uses Netlify's OAuth service*

### 4.3 Register Application

Click **"Register application"**

### 4.4 Generate Client Secret

1. Click **"Generate a new client secret"**
2. Copy the secret immediately (you won't see it again!)

### 4.5 Save Your OAuth Credentials

**Write these down securely:**
- Client ID: `_______________`
- Client Secret: `_______________`

---

## STEP 5: Deploy to Vercel

### 5.1 Initial Deployment

If not already deployed:
```bash
vercel --prod
```

### 5.2 Set Environment Variables in Vercel

**Option A: Via Vercel Dashboard**
1. Go to https://vercel.com/dashboard
2. Select your project (newdesign)
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

| Name | Value |
|------|-------|
| `GITHUB_CLIENT_ID` | Your OAuth Client ID |
| `GITHUB_CLIENT_SECRET` | Your OAuth Client Secret |

**Option B: Via CLI**
```bash
vercel env add GITHUB_CLIENT_ID
# Paste your Client ID when prompted

vercel env add GITHUB_CLIENT_SECRET
# Paste your Client Secret when prompted
```

### 5.3 Configure Vercel Git Integration

1. In Vercel Dashboard → Your Project
2. Go to **Settings** → **Git**
3. Connect your GitHub repository
4. Enable **Auto-deploy** for master branch

**Now Vercel will auto-deploy on every Git push!** ✅

---

## STEP 6: Set Up Netlify Identity (For OAuth)

Decap CMS uses Netlify's OAuth service even when hosting elsewhere.

### 6.1 Create Netlify Site (Free)

1. Go to https://www.netlify.com/
2. Sign up (use GitHub account for easy setup)
3. Click **"Add new site"** → **"Import an existing project"**
4. Connect to GitHub
5. Select your `vedanta-website` repository
6. **Build settings:**
   - Build command: `python sync_cms.py`
   - Publish directory: `.` (root)
7. Click **"Deploy site"**

### 6.2 Enable Netlify Identity

1. In your Netlify site dashboard
2. Go to **Identity** tab
3. Click **"Enable Identity"**

### 6.3 Configure Identity Settings

1. In Identity settings, click **"Settings and usage"**
2. Scroll to **External providers**
3. Click **"Add provider"** → **GitHub**
4. Enter your OAuth credentials:
   - Client ID: (from Step 4)
   - Client Secret: (from Step 4)
5. Save

### 6.4 Enable Git Gateway

1. Still in Identity settings
2. Go to **Services** → **Git Gateway**
3. Click **"Enable Git Gateway"**
4. Select **"GitHub"** as provider

---

## STEP 7: Update Vercel Deployment Settings

### 7.1 Update vercel.json

Your `vercel.json` should already have:
```json
{
  "buildCommand": "python3 sync_cms.py || python sync_cms.py || true",
  "installCommand": "pip install pyyaml beautifulsoup4 || pip3 install pyyaml beautifulsoup4 || true"
}
```

This is already correct! ✅

### 7.2 Redeploy

```bash
git add .
git commit -m "Configure for production admin"
git push
```

Vercel will auto-deploy!

---

## STEP 8: Test Production Admin

### 8.1 Access Production Admin

Go to: **https://newdesign-phi.vercel.app/admin**

### 8.2 Login with GitHub

1. Click **"Login with GitHub"**
2. Authorize the app
3. You should see the admin panel!

### 8.3 Test Editing

1. Edit a page
2. Click **"Publish"**
3. Changes commit to GitHub
4. Vercel auto-detects and deploys
5. Wait ~1-2 minutes
6. Check live site for changes!

---

## 🎉 SUCCESS! You Now Have:

### ✅ Local Development (Windows)
```
1. Run: start_all_servers.bat
2. Edit at: http://localhost:8080/admin
3. Auto-sync to frontend (instant)
4. Push to GitHub when ready
```

### ✅ Production Admin (From Anywhere)
```
1. Go to: https://newdesign-phi.vercel.app/admin
2. Login with GitHub
3. Edit content
4. Publish
5. Auto-commits to GitHub
6. Vercel auto-deploys (1-2 min)
7. Live!
```

---

## 🔄 Complete Workflow

### Local Editing:
```
Edit locally → Auto-sync → Test → Git push → Auto-deploy
```

### Production Editing:
```
Edit online → Publish → GitHub commit → Vercel auto-deploy → Live!
```

---

## 🆘 Troubleshooting

### "Can't login to production admin"
- Check OAuth credentials in Netlify Identity
- Verify callback URL is correct
- Try incognito/private browsing

### "Changes don't appear after publishing"
- Check GitHub repo - did commit appear?
- Check Vercel deployments - did it trigger?
- Wait 2-3 minutes for build to complete

### "Build failed on Vercel"
- Check Vercel build logs
- Verify sync_cms.py runs without errors
- Check that all dependencies are installed

### "Local admin stopped working"
- You're now using GitHub backend (not test-repo)
- You need to be online and logged into GitHub
- Use the auto-sync watcher instead

---

## 📝 Quick Reference

### Admin URLs:
- **Local**: http://localhost:8080/admin
- **Production**: https://newdesign-phi.vercel.app/admin

### Authentication:
- **Local**: GitHub login (same as production)
- **Production**: GitHub OAuth

### Deploy:
```bash
git add .
git commit -m "Update content"
git push
# Vercel auto-deploys!
```

---

## 🎯 Next Steps

1. **Complete Steps 1-8 above**
2. **Test local editing**
3. **Test production editing**
4. **Share production admin URL with team**
5. **Add team members in Netlify Identity (if needed)**

---

## 👥 Adding Team Members (Optional)

To let others edit:

1. Go to Netlify site → Identity
2. Click **"Invite users"**
3. Enter their email
4. They'll get invite to access admin
5. They login with GitHub or email

---

**🎊 Your CMS now works everywhere - local and cloud!**
