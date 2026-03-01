# Website Setup Instructions

## Contact Form Setup (FormSpree)

The contact form is configured to use FormSpree, which requires a one-time setup:

1. Go to [formspree.io](https://formspree.io/) and create a free account
2. Create a new form and get your Form ID
3. Open `contactus.html` and find this line:
   ```html
   <form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Replace `YOUR_FORM_ID` with your actual Form ID from FormSpree
5. The form submissions will be sent to the email address you configured in FormSpree

**Alternative**: If you don't want to use FormSpree, you can set up your own backend endpoint or use another service like Netlify Forms.

## Newsletter Setup

The newsletter subscription form needs to be connected to a mailing service:

### Option 1: Mailchimp
1. Create a Mailchimp account at [mailchimp.com](https://mailchimp.com/)
2. Create an audience/list
3. Get your embedded form code or API key
4. Update the newsletter form action URL in the relevant pages

### Option 2: SendGrid
1. Create a SendGrid account
2. Set up a mailing list
3. Configure the API integration

## Analytics Setup

### Google Analytics 4

The site includes Google Analytics 4 tracking code with a placeholder ID:

1. Create a Google Analytics 4 property at [analytics.google.com](https://analytics.google.com/)
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Open each HTML file and find:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   ```
4. Replace `G-XXXXXXXXXX` with your actual Measurement ID

### Vercel Web Analytics

The site is now configured with Vercel Web Analytics, which provides privacy-friendly analytics without requiring cookie consent banners.

**Setup Steps:**

1. **Enable Web Analytics in Vercel**:
   - Go to your project on the [Vercel dashboard](https://vercel.com/dashboard)
   - Select your project
   - Click the **Analytics** tab
   - Click **Enable** to activate Web Analytics
   - This will add new routes at `/_vercel/insights/*` after your next deployment

2. **Verify Installation**:
   - The analytics script has already been added to all HTML files in this project
   - Look for this code in the `<head>` section of each HTML file:
     ```html
     <!-- Vercel Web Analytics -->
     <script>
       window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
     </script>
     <script defer src="/_vercel/insights/script.js"></script>
     ```

3. **Deploy to Vercel**:
   - Deploy your site to Vercel (if not already deployed)
   - After deployment, the analytics will automatically start tracking visitors

4. **View Your Data**:
   - Go to your [Vercel dashboard](https://vercel.com/dashboard)
   - Select your project
   - Click the **Analytics** tab
   - After visitors arrive, you'll see page views, visitor counts, and other metrics

**Benefits of Vercel Web Analytics:**
- Privacy-focused (no cookies required, GDPR-compliant)
- No impact on lighthouse scores
- Real-time data
- Automatic bot filtering
- No cookie consent banners needed

**Note**: When properly configured, you should see a fetch request to `/_vercel/insights/view` in your browser's Network tab when visiting any page.

## ZIP Code Note

The correct ZIP code for the address (119 W. Scotland Drive, Irving, TX) is **75063**.

The Appeal Letter PDF currently uses 75062, which needs to be corrected and regenerated.

## Lectures Page

The lectures page has been created with placeholder YouTube video embeds. You need to:

1. Replace the placeholder video IDs with actual YouTube video IDs
2. Update video titles and descriptions
3. Add more videos as needed

To get a YouTube video ID:
- From URL like `https://www.youtube.com/watch?v=ABC123XYZ`
- The video ID is `ABC123XYZ`
