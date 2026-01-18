# Vedanta DFW CMS Integration

## 🎉 Complete Admin Panel + Frontend Integration

Your website now has a **full CMS system** where non-technical users can edit content, and the frontend automatically displays it!

---

## 📁 System Architecture

```
Vedanta DFW Website
├──  Admin Panel (Decap CMS)
│   └── /admin - Content management interface
│
├── 📦 Content Storage (Git-based)
│   ├── content/events/*.md - Events
│   ├── content/newsletters/*.md - Newsletters
│   ├── content/pages/*.md - Website pages
│   └── content/settings/*.yml - Site settings
│
├── 🔧 Build System
│   ├── build_cms_data.py - Converts YAML/MD to JSON
│   └── extract_content.py - Extracts HTML content to CMS
│
├── 🌐 Frontend Integration
│   ├── api/*.json - JSON data for frontend
│   ├── cms-loader.js - Loads and renders CMS data
│   └── script.js - Includes CMS loader
│
└── 📄 Static HTML Pages
    └── *.html - Pages that load content from CMS
```

---

## 🚀 How It Works

### **Admin Workflow** (Non-Technical Users):

1. **Edit Content** → Go to `/admin`
2. **Make Changes** → Use visual editor
3. **Publish** → Click "Publish"
4. **Auto-Save** → Changes saved to Git
5. **Auto-Deploy** → Vercel rebuilds site
6. **Live!** → Changes appear on website

### **Technical Workflow**:

```
Admin Edit
   ↓
Save to content/*.md or content/settings/*.yml
   ↓
Run: python build_cms_data.py
   ↓
Generate api/*.json files
   ↓
Frontend loads JSON via cms-loader.js
   ↓
Renders to HTML pages
```

---

## 📝 Content Management

### **What Can Be Edited**:

✅ **Events & Calendar**
- Add/edit/delete events
- Set date, time, location
- Upload images
- Mark as featured

✅ **Newsletters**
- Upload PDF files
- Organize by year/month
- Add descriptions

✅ **Website Pages**
- Edit ALL pages (About, Vedanta, etc.)
- Create NEW pages
- Delete pages
- Add to navigation menu

✅ **Navigation Menu**
- Add/remove menu items
- Create dropdowns
- Reorder items

✅ **Site Settings**
- Contact info
- Footer links
- Homepage hero
- Social media

---

## 🛠️ For Developers

### **Setup**:

```bash
# 1. Install dependencies
pip install beautifulsoup4 pyyaml

# 2. Extract existing content to CMS (one-time)
python extract_content.py

# 3. Build JSON data from CMS content
python build_cms_data.py

# 4. Test locally
npx decap-server  # Start CMS backend
python -m http.server 8080  # Start web server

# 5. Access admin
http://localhost:8080/admin
```

### **Workflow After Content Changes**:

```bash
# When admin edits content in /admin:
# 1. Changes auto-save to content/ folder
# 2. Run build script
python build_cms_data.py

# 3. Commit and deploy
git add .
git commit -m "Update content"
vercel --prod
```

### **Automated Build** (Future Enhancement):

Add to `vercel.json`:
```json
{
  "buildCommand": "python build_cms_data.py"
}
```

---

## 📦 File Structure

### **Content Files** (Edited by Admin):

```
content/
├── events/
│   └── 2025-01-26-sunday-service.md
├── newsletters/
│   └── 2025-01-january-newsletter.md
├── pages/
│   ├── aboutus.md
│   ├── vedanta.md
│   ├── meditation.md
│   └── ... (12 total)
└── settings/
    ├── contact.yml
    ├── footer.yml
    ├── navigation.yml
    ├── homepage.yml
    └── general.yml
```

### **Generated Files** (Auto-generated):

```
api/
├── cms-data.json - All CMS data
├── pages.json - All pages
├── events.json - All events
├── newsletters.json - All newsletters
├── settings.json - All settings
└── page-index.json - Quick page lookup
```

---

## 🎨 Frontend Integration

### **CMS Loader** (`cms-loader.js`):

Automatically loads and renders CMS content:

```javascript
// Global CMS loader instance
window.cmsLoader

// Methods:
await cmsLoader.getPage('aboutus')
await cmsLoader.getEvents()
await cmsLoader.getNewsletters()
await cmsLoader.getSettings()
await cmsLoader.renderCurrentPage()
```

### **Auto-Load on Every Page**:

The CMS loader automatically:
- ✅ Loads page content from CMS
- ✅ Updates hero sections
- ✅ Renders markdown to HTML
- ✅ Updates navigation
- ✅ Updates footer

---

## 📚 Content Format Examples

### **Event** (`content/events/*.md`):

```yaml
---
title: Sunday Service - Meditation & Discourse
eventType: Sunday Service
startDate: 2025-01-26 11:00
endDate: 2025-01-26 12:30
locationType: In-Person
description: |
  Join us for weekly service...
featured: true
published: true
---

Event description in markdown format...
```

### **Page** (`content/pages/*.md`):

```yaml
---
title: About Us
slug: aboutus
heroTitle: About Us
heroSubtitle: Our History, Mission, and Community
published: true
---

Page content in markdown format...

## Section Title

Content here...
```

### **Settings** (`content/settings/*.yml`):

```yaml
# contact.yml
orgName: Ramakrishna Vedanta Society of North Texas
addressLine1: 119 W. Scotland Drive
city: Irving
state: TX
email: contact@vedantadfw.org
```

---

## 🔄 Migration Status

### **✅ Completed**:

- ✅ Admin panel setup (Decap CMS)
- ✅ Content structure defined
- ✅ 12 pages extracted to CMS format
- ✅ Settings migrated (contact, footer, nav, homepage)
- ✅ Build system created (YAML/MD → JSON)
- ✅ Frontend CMS loader created
- ✅ Auto-load on all pages

### **📋 To Complete**:

- 🔲 Extract all newsletters from newsletter.html
- 🔲 Extract events from calendar.html
- 🔲 Full navigation rebuild from CMS
- 🔲 Event listing page integration
- 🔲 Newsletter archive integration
- 🔲 GitHub OAuth setup for production admin
- 🔲 Automated build on deploy

---

## 🚀 Deployment

### **Current Setup**:

1. **Admin**: `/admin` (test-repo backend for local testing)
2. **Content**: `/content` folder (Git storage)
3. **API**: `/api` folder (JSON data)
4. **Frontend**: All `.html` pages

### **Deploy Commands**:

```bash
# Build CMS data
python build_cms_data.py

# Deploy to Vercel
vercel --prod
```

---

## 👥 User Roles (Future)

- **Super Admin**: Full access
- **Editor**: Edit content, manage events/newsletters
- **Contributor**: Create drafts only

---

## 📖 Documentation

- **Admin Guide**: `ADMIN_SETUP.md`
- **CMS Integration**: This file (`CMS_README.md`)
- **Full Plan**: `.claude/plans/quizzical-bubbling-pine.md`

---

## 🎯 Next Steps

1. **Test Admin Panel**: http://localhost:8080/admin
2. **Edit Content**: Create/edit pages, events, newsletters
3. **Build JSON**: Run `python build_cms_data.py`
4. **Deploy**: `vercel --prod`
5. **Verify**: Check live site

---

## 💡 Tips

### **For Non-Technical Users**:
- Use the admin panel at `/admin`
- No coding required!
- Changes save automatically
- Preview before publishing

### **For Developers**:
- Content is in `content/` folder
- Build with `build_cms_data.py`
- Frontend auto-loads from `api/` JSON files
- Extend `cms-loader.js` for custom features

---

## 🤝 Support

- **Decap CMS Docs**: https://decapcms.org/docs/
- **Issues**: Check project GitHub
- **Questions**: Ask your developer!

---

**🎉 Congratulations! You now have a professional, Git-based CMS system!**
