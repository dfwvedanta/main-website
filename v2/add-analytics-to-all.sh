#!/bin/bash

# Script to add Google Analytics to all HTML files
# Usage: Run this from the v2 directory

ANALYTICS_CODE='
    <!-- Google Analytics 4 - Replace G-XXXXXXXXXX with your Measurement ID -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('\''js'\'', new Date());
        gtag('\''config'\'', '\''G-XXXXXXXXXX'\'');
    </script>'

# Find all HTML files and add analytics code before </head> if not already present
for file in *.html; do
    # Check if file already has analytics
    if ! grep -q "googletagmanager.com/gtag" "$file"; then
        # Add analytics before </head>
        sed -i "s|</head>|$ANALYTICS_CODE\n</head>|" "$file"
        echo "Added analytics to $file"
    else
        echo "Analytics already present in $file"
    fi
done

echo "Done! Make sure to replace G-XXXXXXXXXX with your actual Measurement ID in all files."
