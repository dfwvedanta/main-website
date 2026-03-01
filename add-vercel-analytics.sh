#!/bin/bash

# Script to add Vercel Web Analytics to all HTML files
# Adds the analytics script before the closing </head> tag

ANALYTICS_CODE='    <!-- Vercel Web Analytics -->
    <script>
      window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    </script>
    <script defer src="/_vercel/insights/script.js"></script>'

# Find all HTML files and add analytics code before </head> if not already present
for file in *.html; do
    # Check if file already has Vercel analytics
    if ! grep -q "_vercel/insights/script.js" "$file"; then
        # Add analytics before </head>
        sed -i "s|</head>|$ANALYTICS_CODE\n</head>|" "$file"
        echo "Added Vercel analytics to $file"
    else
        echo "Vercel analytics already present in $file"
    fi
done

echo "Done! Vercel Web Analytics has been added to all HTML files."
