#!/usr/bin/env python3
"""
Update frontend HTML files from CMS data
Preserves all layout, design, and structure - only updates text content
"""

import os
import json
from bs4 import BeautifulSoup

def load_cms_data():
    """Load CMS data from JSON"""
    with open('api/page-index.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def markdown_to_text(markdown):
    """Very basic markdown to text (for titles/subtitles)"""
    if not markdown:
        return ""
    # Remove markdown formatting for simple text fields
    text = markdown.replace('**', '').replace('*', '').replace('#', '').strip()
    return text

def update_page_html(page_slug, page_data):
    """Update a single HTML page with CMS data"""

    html_file = f"{page_slug}.html"

    if not os.path.exists(html_file):
        print(f"[SKIP] {html_file} not found")
        return False

    print(f"[UPDATE] {html_file}")

    # Read HTML file
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    # Update title
    if page_data.get('title'):
        title_tag = soup.find('title')
        if title_tag:
            title_tag.string = f"{page_data['title']} - Ramakrishna Vedanta Society of North Texas"

    # Update meta description
    if page_data.get('metaDescription'):
        meta_desc = soup.find('meta', {'name': 'description'})
        if meta_desc:
            meta_desc['content'] = page_data['metaDescription']

    # Update hero title (if exists)
    if page_data.get('heroTitle'):
        hero_title = soup.find(class_='page-hero-title')
        if hero_title:
            hero_title.string = markdown_to_text(page_data['heroTitle'])

    # Update hero subtitle (if exists)
    if page_data.get('heroSubtitle'):
        hero_subtitle = soup.find(class_='page-hero-subtitle')
        if hero_subtitle:
            hero_subtitle.string = markdown_to_text(page_data['heroSubtitle'])

    # NOTE: We're NOT updating body content to preserve existing HTML structure
    # Body content updates would require more sophisticated HTML parsing
    # For now, only update meta tags and hero sections

    # Write back
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(str(soup.prettify()))

    return True

def main():
    print("=" * 60)
    print("Updating Frontend HTML from CMS Data")
    print("=" * 60)
    print()
    print("NOTE: Only updating page titles and hero sections")
    print("Body content remains as static HTML (preserves layout)")
    print()

    # Load CMS data
    try:
        cms_pages = load_cms_data()
    except FileNotFoundError:
        print("[ERROR] CMS data not found. Run build_cms_data.py first!")
        return

    updated_count = 0

    # Update each page
    for slug, page_data in cms_pages.items():
        if update_page_html(slug, page_data):
            updated_count += 1

    print()
    print("=" * 60)
    print(f"[DONE] Updated {updated_count} pages")
    print("=" * 60)
    print()
    print("Frontend HTML files updated with CMS data!")
    print("All layout, design, and structure preserved.")

if __name__ == '__main__':
    main()
