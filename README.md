# Vedanta DFW Website - New Design with CMS

## 🎯 Two Ways to Use Admin Panel

### **Option 1: Local Only (Windows) - Works Now!**
✅ Edit on your computer
✅ Auto-sync to frontend
✅ Test before deploying
✅ **No setup needed - works immediately!**

**Quick Start:**
1. Double-click `start_all_servers.bat`
2. Go to http://localhost:8080/admin
3. Login with GitHub
4. Edit and save - auto-syncs!

---

### **Option 2: Production Admin (Cloud) - 15 Min Setup**
✅ Edit from anywhere
✅ Edit on any device
✅ Auto-deploys to live site
✅ Team members can edit
⚙️ **Requires GitHub + OAuth setup**

**Setup Guide:** See `PRODUCTION_QUICKSTART.md` (15 minutes)

---

---

## 📚 Documentation

### For Users:
- **Quick Reference**: `QUICK_REFERENCE.md` - Daily workflow
- **Admin Guide**: `ADMIN_GUIDE.md` - How to edit content

### For Setup:
- **Production Setup**: `PRODUCTION_QUICKSTART.md` ⭐ **Start here for cloud admin**
- **Detailed Setup**: `SETUP_GITHUB_PRODUCTION.md` - Step-by-step guide

### For Developers:
- **Technical Details**: `CMS_README.md`
- **Implementation**: `IMPLEMENTATION_COMPLETE.md`
- **Verification**: `VERIFICATION_RESULTS.md`

---

## 🎯 What You Can Edit

- ✅ **All website pages** (About, Vedanta, Meditation, etc.)
- ✅ **Events & Calendar**
- ✅ **Newsletter uploads**
- ✅ **Contact information**
- ✅ **Navigation menu**
- ✅ **Footer links**
- ✅ **Homepage settings**
- ✅ **Create new pages**

---

## 💡 Two Ways to Work

### **Option 1: Auto-Sync (Recommended)**
- Double-click `start_all_servers.bat`
- Edit in admin
- Changes sync automatically!

### **Option 2: Manual Sync**
- Start servers manually
- Edit in admin
- Run `sync_cms.bat` after each change

---

## 🌐 URLs

- **Admin Panel**: http://localhost:8080/admin
- **Website**: http://localhost:8080
- **Live Site**: https://newdesign-phi.vercel.app

---

## ⚡ Daily Workflow

```
1. Double-click start_all_servers.bat
2. Edit at http://localhost:8080/admin
3. Save changes
4. Changes auto-sync!
5. Test at http://localhost:8080
6. Deploy: vercel --prod
```

---

## 📁 Key Files

- `start_all_servers.bat` - **START HERE!** (one-click setup)
- `start_auto_sync.bat` - Just the auto-sync watcher
- `sync_cms.bat` - Manual sync (if needed)
- `content/` - Your content (pages, events, etc.)
- `api/` - Generated data files
- `admin/` - Admin panel files

---

## 🆘 Troubleshooting

### Servers won't start?
- Make sure ports 8080 and 8081 are available
- Close any existing server windows
- Try restarting

### Changes don't appear?
- Check that auto-sync watcher is running
- Look for sync messages in the watcher window
- Try manual sync: `sync_cms.bat`

### Admin won't load?
- Make sure Decap CMS backend is running
- Check browser console for errors
- Try clearing browser cache

---

## 📞 Need Help?

1. **Quick answers**: See `QUICK_REFERENCE.md`
2. **Detailed guide**: See `ADMIN_GUIDE.md`
3. **Technical info**: See `CMS_README.md`

---

## 🎉 Features

- ✅ **No coding required** - Visual editor
- ✅ **Auto-sync** - No manual steps
- ✅ **Version controlled** - All changes tracked
- ✅ **Zero design changes** - Layout 100% preserved
- ✅ **Easy deployment** - One command to deploy
- ✅ **Free hosting** - Works on Vercel free tier

---

**Made with ❤️ for Ramakrishna Vedanta Society of North Texas**
