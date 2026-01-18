# 🧪 Test Local Admin → Frontend Sync

## Problem: Changes in admin don't show on frontend

Let's test step-by-step to find the issue.

---

## STEP 1: Check Servers Running

**Run this:**
```bash
diagnose.bat
```

**You should see:**
- ✅ Web Server (Port 8080): RUNNING
- ✅ Decap CMS Server (Port 8081): RUNNING

**If NOT running:**
- Close all server windows
- Run: `start_all_servers.bat`

---

## STEP 2: Test Admin Panel

1. Go to: **http://localhost:8080/admin**
2. You should see the Decap CMS interface
3. Click **"Website Pages"**
4. Click on **"About Us"** (or any page)

**Can you see the editor?**
- ✅ YES → Continue to Step 3
- ❌ NO → Check browser console for errors

---

## STEP 3: Make a Test Change

1. In the editor, find **"Hero Title"** field
2. Change it to: `About Us - TEST CHANGE`
3. Click **"Save"** (top right)
4. Click **"Publish"** → **"Publish now"**

**Important:** You MUST click both "Save" AND "Publish"!

---

## STEP 4: Check File Was Updated

**Open File Explorer:**
```
C:\My Web Sites\https___www.vedantadfw.org_\newdesign\content\pages\
```

**Find:** `aboutus.md`

**Right-click → Open with Notepad**

**Check the top of the file:**
```yaml
---
title: About Us
heroTitle: About Us - TEST CHANGE  ← Should see your change here!
---
```

**Did the file update?**
- ✅ YES → File updated! Continue to Step 5
- ❌ NO → See "Troubleshooting" below

---

## STEP 5: Sync to Frontend

### Option A: Auto-Sync (Recommended)

**Is auto-sync watcher running?**
- Check for a window titled "Auto-Sync Watcher"
- If YES → Changes should sync automatically in 2 seconds!
- If NO → Run `start_auto_sync.bat`

### Option B: Manual Sync

**Run:**
```bash
sync_cms.bat
```

**You should see:**
```
Building CMS Data...
[OK] Loaded 12 pages
...
Updating Frontend HTML...
[UPDATE] aboutus.html
...
[DONE] Updated 12 pages
```

---

## STEP 6: Check Frontend

1. Go to: **http://localhost:8080/aboutus.html**
2. Look at the page title
3. **Do you see: "About Us - TEST CHANGE"?**

- ✅ YES → **SUCCESS! Everything works!**
- ❌ NO → Continue to Step 7

---

## STEP 7: Force Refresh Browser

**Try this:**
1. Press **Ctrl + Shift + R** (hard refresh)
2. Or press **Ctrl + F5**
3. Or open in incognito/private mode

**Now do you see the change?**
- ✅ YES → It was a browser cache issue!
- ❌ NO → See "Advanced Troubleshooting"

---

## 🔧 Troubleshooting

### Issue: File didn't update in Step 4

**Cause:** Admin isn't saving to content folder

**Fix:**
1. Check `admin/config.yml` - should have `local_backend: true`
2. Make sure `npx decap-server` is running
3. Try refreshing admin panel (Ctrl+R)
4. Try making another change

### Issue: Sync script shows errors

**Run diagnostics:**
```bash
python sync_cms.py
```

**Look for error messages:**
- File not found errors?
- Python errors?
- Unicode errors?

**Common fixes:**
- Make sure you're in newdesign folder
- Check Python is installed: `python --version`
- Reinstall packages: `pip install pyyaml beautifulsoup4`

### Issue: Frontend doesn't update even after sync

**Check HTML file directly:**
1. Open `aboutus.html` in Notepad
2. Find the line: `<h1 class="page-hero-title">`
3. Does it show your change?
   - YES → Browser cache issue (clear cache)
   - NO → Sync didn't work (check sync logs)

---

## 🎯 Working Workflow

Once everything works, this is the flow:

### With Auto-Sync Watcher:
```
1. Edit in admin → Save → Publish
2. Wait 2 seconds
3. Refresh browser
4. Changes appear!
```

### Without Auto-Sync (Manual):
```
1. Edit in admin → Save → Publish
2. Run sync_cms.bat
3. Refresh browser
4. Changes appear!
```

---

## 📞 Still Not Working?

### Check These:

1. **Servers running?** → Run `diagnose.bat`
2. **File updates?** → Check `content/pages/aboutus.md` timestamp
3. **Sync runs?** → Run `sync_cms.bat` and watch for errors
4. **Browser cache?** → Try incognito mode
5. **Correct page?** → Make sure you're viewing the right page

### Get Detailed Logs:

```bash
# Run sync with full output
python sync_cms.py

# Check what changed
git status

# See file contents
type content\pages\aboutus.md
type aboutus.html | findstr "TEST CHANGE"
```

---

## ✅ Success Checklist

- [ ] Servers running (both 8080 and 8081)
- [ ] Admin panel loads
- [ ] Can edit content
- [ ] Click Save AND Publish
- [ ] File updates in content/pages/
- [ ] Run sync (auto or manual)
- [ ] HTML file updates
- [ ] Browser shows changes (after refresh)

If ALL checked → **You're all set!** 🎉

---

## 💡 Pro Tips

1. **Always click BOTH "Save" and "Publish"**
   - Save = Saves draft
   - Publish = Makes it official

2. **Use auto-sync watcher**
   - No need to run sync manually
   - Changes appear in ~2 seconds

3. **Hard refresh browser**
   - Ctrl+Shift+R or Ctrl+F5
   - Clears cache

4. **Check file timestamps**
   - See when files last changed
   - Confirms save/sync worked

5. **Use incognito mode for testing**
   - No cache issues
   - Fresh view every time
