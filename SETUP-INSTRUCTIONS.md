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

## Analytics Setup (Google Analytics 4)

The site includes Google Analytics 4 tracking code with a placeholder ID:

1. Create a Google Analytics 4 property at [analytics.google.com](https://analytics.google.com/)
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Open each HTML file and find:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   ```
4. Replace `G-XXXXXXXXXX` with your actual Measurement ID

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
