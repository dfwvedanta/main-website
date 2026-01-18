# Quick Reference Card - CMS Workflow

## 🚀 Daily Workflow

### **OPTION 1: Auto-Sync (Recommended - No Manual Syncing!)**

#### 1. Start Servers (First Time Each Day)
```bash
# Terminal 1: Start CMS backend
npx decap-server

# Terminal 2: Start web server
python -m http.server 8080

# Terminal 3: Start auto-sync watcher
python watch_and_sync.py
```

**Or use batch files:**
- Double-click `start_auto_sync.bat` (starts watcher)
- The watcher will automatically sync when you save in admin!

#### 2. Edit Content
- Go to: **http://localhost:8080/admin**
- Make your changes
- Click **"Publish"**
- **Changes auto-sync automatically!** ✨

#### 3. Test Changes
- Open: **http://localhost:8080**
- Changes already synced!
- Verify they look correct

#### 4. Deploy (When Ready)
```bash
vercel --prod
```

---

### **OPTION 2: Manual Sync (If you prefer)**

#### 1. Start Servers
```bash
npx decap-server
python -m http.server 8080
```

#### 2. Edit Content
- Go to: **http://localhost:8080/admin**
- Make your changes
- Click **"Publish"**

#### 3. Sync to Frontend (MANUAL STEP)
- **Windows**: Double-click `sync_cms.bat`
- **Mac/Linux**: Run `python3 sync_cms.py`

#### 4. Test & Deploy
- Test changes
- Deploy when ready

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `start_auto_sync.bat` | **Auto-sync watcher** (Recommended!) |
| `watch_and_sync.py` | Auto-sync watcher script |
| `sync_cms.bat` | Manual sync (if not using auto-sync) |
| `sync_cms.py` | Combined sync script |
| `build_cms_data.py` | Converts CMS to JSON |
| `update_frontend.py` | Updates HTML files |
| `admin/config.yml` | CMS configuration |
| `content/` | CMS content storage |
| `api/` | Generated JSON files |

---

## 🎯 Common Tasks

### Edit a Page
1. Admin → Website Pages → Click page
2. Edit content
3. Publish
4. Run `sync_cms.bat`

### Add Event
1. Admin → Events & Calendar → New Event
2. Fill details
3. Publish
4. Run `sync_cms.bat`

### Upload Newsletter
1. Admin → Newsletters → New Newsletter
2. Upload PDF
3. Publish
4. Run `sync_cms.bat`

### Update Contact Info
1. Admin → Site Settings → Contact Information
2. Edit details
3. Save
4. Run `sync_cms.bat`

---

## ⚠️ Important Rules

1. **ALWAYS** run `sync_cms.bat` after editing
2. **ALWAYS** test locally before deploying
3. **NEVER** edit HTML files directly (use admin panel)
4. **NEVER** skip the sync step

---

## 🔧 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Admin won't load | Restart `npx decap-server` |
| Changes don't show | Run `sync_cms.bat` |
| Page looks wrong | Clear cache (Ctrl+F5) |
| Can't upload file | Check file size (<2MB) |

---

## 📞 Need Help?

- **Admin Guide**: See `ADMIN_GUIDE.md`
- **Technical Details**: See `CMS_README.md`
- **CMS Docs**: https://decapcms.org/docs/
