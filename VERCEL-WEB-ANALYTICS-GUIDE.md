# Getting started with Vercel Web Analytics

This guide will help you get started with using Vercel Web Analytics on your project, showing you how to enable it, add the package to your project, deploy your app to Vercel, and view your data in the dashboard.

**This project uses plain HTML, so follow the HTML-specific instructions below**.

## Prerequisites

- A Vercel account. If you don't have one, you can [sign up for free](https://vercel.com/signup).
- A Vercel project. If you don't have one, you can [create a new project](https://vercel.com/new).
- The Vercel CLI installed. If you don't have it, you can install it using the following command:

```bash
# Using npm
npm i -g vercel

# Using yarn
yarn global add vercel

# Using pnpm
pnpm i -g vercel

# Using bun
bun i -g vercel
```

## Enable Web Analytics in Vercel

On the [Vercel dashboard](https://vercel.com/dashboard), select your Project and then click the **Analytics** tab and click **Enable** from the dialog.

> **💡 Note:** Enabling Web Analytics will add new routes (scoped at `/_vercel/insights/*`) after your next deployment.

## Add the script tag to your HTML site

For plain HTML sites, you can add the following script to your `.html` files:

```html
<!-- Vercel Web Analytics -->
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

Add this code in the `<head>` section of each HTML file, just before the closing `</head>` tag.

### Example Implementation

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <link rel="stylesheet" href="styles.css">
    
    <!-- Vercel Web Analytics -->
    <script>
      window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    </script>
    <script defer src="/_vercel/insights/script.js"></script>
</head>
<body>
    <!-- Your content here -->
</body>
</html>
```

> **💡 Note:** When using the HTML implementation, there is no need to install the `@vercel/analytics` package. However, there is no route support.

## Deploy your app to Vercel

Deploy your app using the following command:

```bash
vercel deploy
```

If you haven't already, we also recommend [connecting your project's Git repository](https://vercel.com/docs/git#deploying-a-git-repository), which will enable Vercel to deploy your latest commits to main without terminal commands.

Once your app is deployed, it will start tracking visitors and page views.

> **💡 Note:** If everything is set up properly, you should be able to see a Fetch/XHR request in your browser's Network tab from `/_vercel/insights/view` when you visit any page.

## View your data in the dashboard

Once your app is deployed, and users have visited your site, you can view your data in the dashboard.

To do so, go to your [dashboard](https://vercel.com/dashboard), select your project, and click the **Analytics** tab.

After a few days of visitors, you'll be able to start exploring your data by viewing and [filtering](https://vercel.com/docs/analytics/filtering) the panels.

Users on Pro and Enterprise plans can also add [custom events](https://vercel.com/docs/analytics/custom-events) to their data to track user interactions such as button clicks, form submissions, or purchases.

## Privacy and Compliance

Learn more about how Vercel supports [privacy and data compliance standards](https://vercel.com/docs/analytics/privacy-policy) with Vercel Web Analytics.

### Key Privacy Features

- **No cookies required**: Vercel Web Analytics doesn't use cookies, so no cookie consent banners are needed
- **GDPR compliant**: Designed with privacy regulations in mind
- **No impact on performance**: The analytics script is lightweight and loads asynchronously
- **Automatic bot filtering**: Filters out bot traffic automatically

## Current Implementation Status

This project already has Vercel Web Analytics implemented across all HTML pages. You can verify the implementation by:

1. Opening any HTML file in the project
2. Looking for the Vercel Web Analytics script in the `<head>` section
3. Deploying to Vercel and checking the Network tab for `/_vercel/insights/view` requests

## Automated Setup Script

This project includes a bash script (`add-vercel-analytics.sh`) that can automatically add Vercel Web Analytics to all HTML files. The script:

- Checks each HTML file for existing analytics code
- Adds the analytics script before the closing `</head>` tag if not present
- Skips files that already have the analytics code

To use the script:

```bash
chmod +x add-vercel-analytics.sh
./add-vercel-analytics.sh
```

## Next steps

Now that you have Vercel Web Analytics set up, you can explore the following topics to learn more:

- [Learn how to use the `@vercel/analytics` package](https://vercel.com/docs/analytics/package)
- [Learn how to set up custom events](https://vercel.com/docs/analytics/custom-events)
- [Learn about filtering data](https://vercel.com/docs/analytics/filtering)
- [Read about privacy and compliance](https://vercel.com/docs/analytics/privacy-policy)
- [Explore pricing](https://vercel.com/docs/analytics/limits-and-pricing)
- [Troubleshooting](https://vercel.com/docs/analytics/troubleshooting)

## Framework-Specific Guides

If you're using a different framework, here are quick reference guides for adding Vercel Web Analytics:

### Next.js (Pages Directory)

```tsx
// pages/_app.tsx
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
```

### Next.js (App Directory)

```tsx
// app/layout.tsx
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### React (Create React App)

```jsx
// App.jsx
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <div>
      {/* ... */}
      <Analytics />
    </div>
  );
}
```

### Vue

```vue
<!-- src/App.vue -->
<script setup>
import { Analytics } from '@vercel/analytics/vue';
</script>

<template>
  <Analytics />
  <!-- your content -->
</template>
```

### Remix

```tsx
// app/root.tsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/remix";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Analytics />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

### Nuxt

```vue
<!-- app.vue -->
<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';
</script>

<template>
  <Analytics />
  <NuxtPage />
</template>
```

### SvelteKit

```ts
// src/routes/+layout.ts
import { dev } from "$app/environment";
import { injectAnalytics } from "@vercel/analytics/sveltekit";

injectAnalytics({ mode: dev ? "development" : "production" });
```

### Astro

```astro
---
// src/layouts/Base.astro
import Analytics from '@vercel/analytics/astro';
{/* ... */}
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- ... -->
    <Analytics />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### Other Frameworks (Plain JavaScript)

```js
// main.js
import { inject } from "@vercel/analytics";

inject();
```

> **💡 Note:** For framework-specific implementations, you'll need to install the `@vercel/analytics` package:

```bash
# Using npm
npm i @vercel/analytics

# Using yarn
yarn add @vercel/analytics

# Using pnpm
pnpm i @vercel/analytics

# Using bun
bun i @vercel/analytics
```
