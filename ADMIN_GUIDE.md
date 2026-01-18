# Admin Panel User Guide

## 🎯 Quick Start - Editing Website Content

### For Non-Technical Users

**You can now edit your website without coding!**

---

## 📍 Accessing the Admin Panel

### Local (Development):
1. Make sure the server is running
2. Go to: **http://localhost:8080/admin**
3. Start editing!

### Production (Coming Soon):
- Requires GitHub authentication setup
- Will be available at: https://newdesign-phi.vercel.app/admin

---

## ✏️ What You Can Edit

### 1. **Website Pages** (All Pages)
- Edit existing pages (About Us, Vedanta, Meditation, etc.)
- Create new pages
- Delete pages
- Add pages to navigation menu
- Update page titles, hero sections, and content

### 2. **Events & Calendar**
- Add new events
- Edit event details (date, time, location, speaker)
- Upload event images
- Mark events as featured
- Set registration requirements

### 3. **Newsletters**
- Upload newsletter PDFs
- Add descriptions
- Organize by year/month
- Add cover images

### 4. **Site Settings**
- **Contact Information**: Address, phone, email
- **Footer**: Footer links and columns
- **Navigation Menu**: Menu items and dropdowns
- **Homepage**: Hero section text and images
- **General Settings**: Site title, logo, colors

---

## 🔄 Workflow: Making Changes

### Step 1: Edit Content in Admin Panel
1. Go to `/admin`
2. Click on the content type you want to edit (Pages, Events, etc.)
3. Make your changes
4. Click **"Publish"** (or save as draft)

### Step 2: Sync to Frontend

**After saving changes in the admin panel, run the sync script:**

#### On Windows:
- **Double-click** `sync_cms.bat`
- Or run in terminal: `python sync_cms.py`

#### On Mac/Linux:
```bash
python3 sync_cms.py
```

### Step 3: Test Locally
1. Open your browser
2. Go to: http://localhost:8080
3. Verify your changes appear correctly
4. Check that layout and design are preserved

### Step 4: Deploy to Production
```bash
vercel --prod
```

Your changes are now live!

---

## 📝 Editing Pages

### To Edit an Existing Page:

1. **Go to Admin** → **Website Pages**
2. **Click on the page** you want to edit
3. **Edit the fields**:
   - **Title**: Page title (shows in browser tab)
   - **Hero Title**: Large title at top of page
   - **Hero Subtitle**: Subtitle below hero title
   - **Page Content**: Main content (supports Markdown formatting)
4. **Click "Publish"**
5. **Run sync script** (sync_cms.bat)

### To Create a New Page:

1. **Go to Admin** → **Website Pages**
2. **Click "New Page"**
3. **Fill in all fields**:
   - **Title**: Page name
   - **URL Slug**: URL for the page (e.g., "new-page" becomes /new-page.html)
   - **Page Type**: Standard Page, Hero Page, or Landing Page
   - **Content**: Write your page content
4. **Publish**
5. **Run sync script**

### To Add Page to Menu:

1. Edit the page
2. Set **Show in Menu?** to **Yes**
3. Choose **Menu Parent** (Home, About, Programs, Resources)
4. Set **Menu Order** (lower numbers appear first)
5. Publish and sync

---

## 📅 Managing Events

### To Add a New Event:

1. **Go to Admin** → **Events & Calendar**
2. **Click "New Event"**
3. **Fill in details**:
   - **Title**: Event name
   - **Event Type**: Sunday Service, Lecture, Workshop, etc.
   - **Start/End Date & Time**: When the event occurs
   - **Location Type**: In-Person, Online, or Hybrid
   - **Description**: Event details
   - **Speaker**: Who is leading
   - **Image**: Upload event poster (optional)
   - **Featured**: Check to show on homepage
4. **Publish**
5. **Run sync script**

### Event Types:
- Sunday Service
- Retreat
- Lecture
- Puja
- Workshop
- Special Event
- Children's Program

---

## 📰 Managing Newsletters

### To Upload a Newsletter:

1. **Go to Admin** → **Newsletters**
2. **Click "New Newsletter"**
3. **Fill in**:
   - **Title**: e.g., "January Newsletter" or "Spring 2025"
   - **Year & Month**: When published
   - **PDF File**: Upload the newsletter PDF
   - **Cover Image**: Thumbnail (optional)
   - **Description**: Brief summary
4. **Publish**
5. **Run sync script**

---

## ⚙️ Updating Site Settings

### Contact Information:
1. **Go to Admin** → **Site Settings** → **Contact Information**
2. Update address, phone, email, etc.
3. Save
4. Run sync script

### Navigation Menu:
1. **Go to Admin** → **Navigation Menu** → **Main Menu**
2. Add/remove/reorder menu items
3. Add dropdown items
4. Save
5. Run sync script

### Footer:
1. **Go to Admin** → **Site Settings** → **Footer**
2. Edit footer columns and links
3. Update social media links
4. Save
5. Run sync script

### Homepage:
1. **Go to Admin** → **Site Settings** → **Homepage**
2. Edit hero title, subtitle, description
3. Update call-to-action buttons
4. Change hero image
5. Save
6. Run sync script

---

## 📐 Markdown Formatting Guide

You can use Markdown in page content and event descriptions:

### Headers:
```
# Main Title
## Section Title
### Subsection
```

### Text Formatting:
```
**Bold text**
*Italic text*
***Bold and italic***
```

### Lists:
```
- Bullet point 1
- Bullet point 2
  - Sub-point

1. Numbered item
2. Numbered item
```

### Links:
```
[Link text](https://example.com)
```

### Images:
```
![Alt text](/images/photo.jpg)
```

---

## ✅ Best Practices

### DO:
- ✅ Always **preview** changes before publishing
- ✅ Use **descriptive titles** for pages and events
- ✅ Fill in **meta descriptions** for better SEO
- ✅ **Run sync script** after making changes
- ✅ **Test locally** before deploying
- ✅ Keep **backup copies** of important content

### DON'T:
- ❌ Don't use special characters in URL slugs (use hyphens)
- ❌ Don't forget to set **published** to true
- ❌ Don't skip the sync step
- ❌ Don't deploy without testing first
- ❌ Don't delete pages that are linked in navigation

---

## 🚨 Troubleshooting

### "Admin panel won't load"
- Check that servers are running (npx decap-server)
- Try clearing browser cache
- Check browser console for errors

### "Changes don't appear on website"
- Did you run the sync script? (sync_cms.bat or sync_cms.py)
- Did you wait for the script to complete?
- Try refreshing the page (Ctrl+F5)

### "Page looks broken after editing"
- The sync script only updates titles and hero sections
- Main page content is preserved from original HTML
- Contact your developer if layout issues persist

### "Can't upload images"
- Check file size (keep under 2MB)
- Use standard formats (JPG, PNG, GIF)
- Check that images folder has write permissions

---

## 📞 Getting Help

If you encounter issues:

1. **Check this guide** first
2. **Check the CMS_README.md** for technical details
3. **Contact your developer** for complex issues
4. **Check Decap CMS docs**: https://decapcms.org/docs/

---

## 🎉 Tips for Success

1. **Start small**: Edit one page at a time
2. **Use drafts**: Save as draft before publishing
3. **Preview often**: Check how it looks before publishing
4. **Regular backups**: Keep copies of important content
5. **Test locally**: Always test before deploying to production
6. **Ask for help**: Don't hesitate to ask your developer

---

**Remember**: The sync script preserves all existing layout and design. Your changes only update the text content, not the visual appearance!
