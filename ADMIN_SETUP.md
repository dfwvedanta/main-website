# Admin Panel Setup Guide

## 🎉 Welcome to Your New Admin Panel!

You now have a powerful, easy-to-use Content Management System (CMS) for your website!

---

## 📋 Table of Contents

1. [Accessing the Admin Panel](#accessing-the-admin-panel)
2. [First-Time Setup](#first-time-setup)
3. [How to Edit Content](#how-to-edit-content)
4. [Managing Events](#managing-events)
5. [Managing Newsletters](#managing-newsletters)
6. [Editing Pages](#editing-pages)
7. [Updating Navigation Menu](#updating-navigation-menu)
8. [Changing Site Settings](#changing-site-settings)
9. [User Roles & Permissions](#user-roles--permissions)
10. [Publishing Workflow](#publishing-workflow)
11. [Troubleshooting](#troubleshooting)

---

## 🚀 Accessing the Admin Panel

### Option 1: Direct Access (After Setup)
1. Go to: **https://newdesign-phi.vercel.app/admin**
2. Log in with your GitHub account
3. Start editing!

### Option 2: Local Development
1. Open terminal in the project folder
2. Run: `npx decap-server`
3. Open browser: `http://localhost:8080/admin`

---

## 🔧 First-Time Setup

### Step 1: Enable Netlify Identity (For Git Gateway)

**If using GitHub directly (recommended for Vercel):**

1. **Update `admin/config.yml`** - Change the backend section:
   ```yaml
   backend:
     name: github
     repo: YOUR-GITHUB-USERNAME/YOUR-REPO-NAME
     branch: master
   ```

2. **Create GitHub OAuth App:**
   - Go to: https://github.com/settings/developers
   - Click "New OAuth App"
   - **Application name:** Vedanta DFW Admin
   - **Homepage URL:** https://newdesign-phi.vercel.app
   - **Authorization callback URL:** https://api.netlify.com/auth/done
   - Click "Register application"
   - Copy **Client ID** and **Client Secret**

3. **Set up Netlify (for OAuth):**
   - Go to: https://app.netlify.com
   - Import your GitHub repo to Netlify
   - Go to Site Settings → Access Control → OAuth
   - Install GitHub as auth provider
   - Paste Client ID and Client Secret

**Alternative: Use Vercel with External Auth Service**

For simplest setup with Vercel, use **Netlify Identity** (free):
1. Create free Netlify account
2. Add your site
3. Enable Netlify Identity
4. Invite team members
5. Update `admin/config.yml` to use `git-gateway`

---

## ✏️ How to Edit Content

### General Workflow

1. **Log in** to `/admin`
2. **Select a collection** (Events, Newsletters, Pages, etc.)
3. **Edit existing** or **Create new**
4. **Save draft** or **Publish** immediately
5. Changes auto-commit to Git
6. Vercel auto-deploys updated site (1-2 minutes)

### Rich Text Editor

The markdown editor supports:
- **Bold**, *italic*, `code`
- Headings (H1, H2, H3)
- Bulleted and numbered lists
- Links and images
- Tables
- Block quotes

---

## 📅 Managing Events

### Creating a New Event

1. Go to **Events & Calendar**
2. Click **New Event**
3. Fill in the form:
   - **Title**: E.g., "Sunday Service - Meditation & Discourse"
   - **Event Type**: Select from dropdown
   - **Start/End Date & Time**: Use date picker
   - **Location Type**: In-Person, Online, or Hybrid
   - **Description**: Full event details (supports markdown)
   - **Speaker**: Optional
   - **Image**: Upload event poster
   - **Featured**: Check to show on homepage
4. Click **Publish** (or **Save Draft**)

### Event Types

- **Sunday Service**: Regular weekly service
- **Retreat**: Multi-day spiritual retreat
- **Lecture**: Special lecture or talk
- **Puja**: Worship ceremony
- **Workshop**: Interactive workshop
- **Special Event**: Festivals, celebrations
- **Children's Program**: Youth activities

### Tips

- Use **Featured** for important events you want highlighted
- Add **Tags** for better organization (e.g., "meditation", "beginner-friendly")
- Set **Registration Required** for events that need RSVP
- Use **Max Attendees** to limit capacity

---

## 📰 Managing Newsletters

### Uploading a Newsletter

1. Go to **Newsletters**
2. Click **New Newsletter**
3. Fill in:
   - **Title**: E.g., "January 2025 Newsletter"
   - **Year**: 2025
   - **Month**: Select from dropdown
   - **PDF File**: Click to upload your PDF
   - **Description**: Brief summary (optional)
   - **Publish Date**: When it was published
4. Click **Publish**

### Organizing Newsletters

- Newsletters auto-organize by year in the archive
- Use **Year** and **Month** fields for proper sorting
- **Cover Image** is optional thumbnail

---

## 📄 Editing Pages

### Editing Existing Pages

1. Go to **Website Pages**
2. Find the page (e.g., "About Us")
3. Click to edit
4. Modify content:
   - **Title**: Page title
   - **Hero Title/Subtitle**: Top section text
   - **Page Content**: Main body (markdown)
   - **Content Sections**: Add multiple sections
5. Click **Publish**

### Creating a New Page

1. Go to **Website Pages**
2. Click **New Page**
3. Fill in:
   - **Title**: Page title
   - **URL Slug**: E.g., "new-retreat" → `/new-retreat.html`
   - **Page Type**: Choose layout style
   - **Page Content**: Write your content
   - **Show in Menu**: Check if you want it in navigation
   - **Menu Parent**: Choose where it appears (About, Programs, etc.)
4. Click **Publish**

### Page Types

- **Standard Page**: Regular content page
- **Hero Page**: Large hero image + content
- **Landing Page**: Special promotional page

### Adding to Navigation

Set these fields to add page to menu:
- **Show in Menu**: ✅ Yes
- **Menu Parent**: Choose dropdown (or "None" for top-level)
- **Menu Order**: Lower numbers appear first (10, 20, 30...)

---

## 🧭 Updating Navigation Menu

### Editing Menu Items

1. Go to **Navigation Menu** → **Main Menu**
2. You'll see all menu items listed
3. Edit any item:
   - **Label**: What users see
   - **Link**: Where it goes (e.g., `index.html`)
   - **Dropdown Items**: Sub-menu items
4. To reorder, change order in the list
5. Click **Publish**

### Adding Dropdown Items

1. Find the parent menu item (e.g., "About")
2. Under **Dropdown Items**, click **Add**
3. Fill in Label and Link
4. Click **Publish**

### Menu Structure Example

```
Home (index.html)
About (#)
  ├─ About Us (aboutus.html)
  ├─ Vedanta Philosophy (vedanta.html)
  └─ Sri Ramakrishna (ramakrishna.html)
Programs (#)
  ├─ Meditation (meditation.html)
  └─ Online Lectures (lectures.html)
```

---

## ⚙️ Changing Site Settings

### Contact Information

1. Go to **Site Settings** → **Contact Information**
2. Update:
   - Organization name
   - Address
   - Phone
   - Email
   - Google Maps link
3. Click **Publish**

### Footer Settings

1. Go to **Site Settings** → **Footer**
2. Edit:
   - **Footer Columns**: Each column of links
   - **Copyright Text**: Footer copyright
   - **Social Media**: Facebook, Twitter, YouTube, Instagram URLs
3. Click **Publish**

### Homepage Settings

1. Go to **Site Settings** → **Homepage**
2. Edit:
   - **Hero Title**: Main heading
   - **Hero Subtitle**: Subheading
   - **Hero Description**: Intro text
   - **Hero Image**: Background image
   - **CTA Buttons**: Call-to-action text and links
   - **Hero Stats**: Three stat boxes
3. Click **Publish**

### General Settings

1. Go to **Site Settings** → **General Settings**
2. Edit:
   - **Site Title**: Browser title
   - **Site Description**: SEO description
   - **Site Logo**: Header logo
   - **Primary Color**: Theme color
   - **Announcements**: Enable site-wide banner
3. Click **Publish**

---

## 👥 User Roles & Permissions

### Role Types

**Super Admin**
- Full access to everything
- Can add/edit/delete all content
- Can manage users
- Can change all settings

**Editor**
- Can create, edit, publish content
- Can manage events and newsletters
- Can edit pages
- Cannot change site settings

**Contributor**
- Can create drafts
- Can edit own content
- Cannot publish (needs approval)
- Cannot delete content

### Adding New Users

1. Go to your auth provider (GitHub OAuth or Netlify Identity)
2. Invite user by email
3. Assign role
4. They'll receive invitation email

---

## 📝 Publishing Workflow

### Editorial Workflow (Draft → Review → Publish)

**Enabled in `config.yml`:**
```yaml
publish_mode: editorial_workflow
```

**Workflow:**

1. **Draft**: Create content, save as draft
   - Shows in "Drafts" tab
   - Not visible on live site

2. **In Review**: Submit for review
   - Move to "In Review" tab
   - Editors/Admins can review

3. **Ready**: Approve for publishing
   - Move to "Ready" tab
   - One click to publish

4. **Published**: Live on website
   - Visible to all visitors
   - Can edit and re-publish

### Quick Publish (Skip Workflow)

Super Admins can click **Publish** immediately to skip workflow.

---

## 🛠️ Troubleshooting

### "Error loading config.yml"

**Solution:**
- Check that `admin/config.yml` exists
- Verify YAML syntax (no tabs, proper indentation)
- Clear browser cache

### "Authentication failed"

**Solution:**
- Verify GitHub OAuth credentials
- Check repo permissions in `config.yml`
- Ensure you're added as collaborator to the repo

### "Upload failed"

**Solution:**
- Check file size (max 10MB for most files)
- Verify file type is allowed
- Check repo write permissions

### Changes not showing on website

**Solution:**
- Check Vercel deployment status
- Wait 1-2 minutes for rebuild
- Hard refresh browser (Ctrl+Shift+R)
- Verify content is **Published** (not draft)

### Cannot save/publish content

**Solution:**
- Check GitHub repo write access
- Verify you're on correct branch
- Check for merge conflicts

---

## 📞 Getting Help

### Resources

- **Decap CMS Docs**: https://decapcms.org/docs/
- **GitHub**: Check your repo's Issues tab
- **Community**: Decap CMS community forum

### Common Tasks Quick Reference

| Task | Where to Go |
|------|-------------|
| Add event | Events & Calendar → New Event |
| Upload newsletter | Newsletters → New Newsletter |
| Edit homepage | Site Settings → Homepage |
| Update menu | Navigation Menu → Main Menu |
| Change contact info | Site Settings → Contact Information |
| Create new page | Website Pages → New Page |
| Manage footer links | Site Settings → Footer |

---

## 🎨 Tips for Non-Technical Users

### Writing Content

- Use headings to organize (H2, H3)
- Keep paragraphs short (3-4 sentences)
- Add images to break up text
- Use bullet points for lists
- **Bold** important points

### SEO Best Practices

- Write descriptive page titles
- Fill in meta descriptions (150-160 characters)
- Use alt text for images
- Create clear, simple URLs (slugs)

### Images

- Optimize before upload (max 1MB)
- Use descriptive filenames
- Add alt text for accessibility
- Prefer landscape for hero images

---

## ✅ Quick Start Checklist

After setup, test these:

- [ ] Log in to `/admin`
- [ ] Create a test event
- [ ] Upload a test newsletter
- [ ] Edit the homepage hero text
- [ ] Update contact information
- [ ] Add a new page
- [ ] Modify navigation menu
- [ ] Invite a team member
- [ ] Publish a draft
- [ ] Verify changes live on website

---

**Congratulations! You're ready to manage your website like a pro! 🎉**

For questions or issues, contact your web developer or consult the Decap CMS documentation.
