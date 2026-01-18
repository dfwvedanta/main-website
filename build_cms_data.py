#!/usr/bin/env python3
"""
Build CMS data - Convert YAML/Markdown content to JSON for frontend
"""

import os
import json
import yaml
import re
from pathlib import Path
from datetime import datetime, date

def convert_dates_to_strings(obj):
    """Recursively convert date/datetime objects to strings"""
    if isinstance(obj, (date, datetime)):
        return obj.isoformat()
    elif isinstance(obj, dict):
        return {k: convert_dates_to_strings(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_dates_to_strings(item) for item in obj]
    else:
        return obj

def parse_frontmatter(content):
    """Parse YAML frontmatter from markdown file"""
    pattern = r'^---\s*\n(.*?)\n---\s*\n(.*)$'
    match = re.match(pattern, content, re.DOTALL)

    if match:
        frontmatter_text = match.group(1)
        body = match.group(2).strip()
        frontmatter = yaml.safe_load(frontmatter_text)
        return frontmatter, body
    else:
        return {}, content

def load_markdown_files(directory):
    """Load all markdown files from a directory"""
    items = []
    md_files = Path(directory).glob('*.md')

    for filepath in md_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        frontmatter, body = parse_frontmatter(content)
        frontmatter = convert_dates_to_strings(frontmatter)
        item = {**frontmatter, 'body': body, 'id': filepath.stem}
        items.append(item)

    return items

def load_yaml_file(filepath):
    """Load a single YAML file"""
    if not os.path.exists(filepath):
        return {}

    with open(filepath, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f) or {}
        return convert_dates_to_strings(data)

def build_all_data():
    """Build all CMS data into JSON"""

    cms_data = {}

    # Load pages
    print("Loading pages...")
    if os.path.exists('content/pages'):
        cms_data['pages'] = load_markdown_files('content/pages')
        print(f"  [OK] Loaded {len(cms_data['pages'])} pages")
    else:
        cms_data['pages'] = []

    # Load events
    print("Loading events...")
    if os.path.exists('content/events'):
        cms_data['events'] = load_markdown_files('content/events')
        # Sort by start date descending
        cms_data['events'] = sorted(
            cms_data['events'],
            key=lambda x: x.get('startDate', ''),
            reverse=True
        )
        print(f"  [OK] Loaded {len(cms_data['events'])} events")
    else:
        cms_data['events'] = []

    # Load newsletters
    print("Loading newsletters...")
    if os.path.exists('content/newsletters'):
        cms_data['newsletters'] = load_markdown_files('content/newsletters')
        # Sort by year and month descending
        cms_data['newsletters'] = sorted(
            cms_data['newsletters'],
            key=lambda x: (x.get('year', 0), x.get('month', '')),
            reverse=True
        )
        print(f"  [OK] Loaded {len(cms_data['newsletters'])} newsletters")
    else:
        cms_data['newsletters'] = []

    # Load settings
    print("Loading settings...")
    cms_data['settings'] = {}

    settings_files = {
        'contact': 'content/settings/contact.yml',
        'footer': 'content/settings/footer.yml',
        'navigation': 'content/settings/navigation.yml',
        'homepage': 'content/settings/homepage.yml',
        'general': 'content/settings/general.yml'
    }

    for key, filepath in settings_files.items():
        cms_data['settings'][key] = load_yaml_file(filepath)
        if cms_data['settings'][key]:
            print(f"  [OK] Loaded {key} settings")

    return cms_data

def write_json_files(cms_data):
    """Write JSON files for frontend consumption"""

    # Create api directory
    os.makedirs('api', exist_ok=True)

    # Write all data as one file
    with open('api/cms-data.json', 'w', encoding='utf-8') as f:
        json.dump(cms_data, f, indent=2, ensure_ascii=False)
    print(f"\n[OK] Created api/cms-data.json")

    # Write individual files for easier loading
    with open('api/pages.json', 'w', encoding='utf-8') as f:
        json.dump(cms_data['pages'], f, indent=2, ensure_ascii=False)
    print(f"[OK] Created api/pages.json ({len(cms_data['pages'])} pages)")

    with open('api/events.json', 'w', encoding='utf-8') as f:
        json.dump(cms_data['events'], f, indent=2, ensure_ascii=False)
    print(f"[OK] Created api/events.json ({len(cms_data['events'])} events)")

    with open('api/newsletters.json', 'w', encoding='utf-8') as f:
        json.dump(cms_data['newsletters'], f, indent=2, ensure_ascii=False)
    print(f"[OK] Created api/newsletters.json ({len(cms_data['newsletters'])} newsletters)")

    with open('api/settings.json', 'w', encoding='utf-8') as f:
        json.dump(cms_data['settings'], f, indent=2, ensure_ascii=False)
    print(f"[OK] Created api/settings.json")

    # Create index for quick lookups
    page_index = {page['slug']: page for page in cms_data['pages']}
    with open('api/page-index.json', 'w', encoding='utf-8') as f:
        json.dump(page_index, f, indent=2, ensure_ascii=False)
    print(f"[OK] Created api/page-index.json")

# Main execution
if __name__ == '__main__':
    print("=" * 60)
    print("Building CMS Data...")
    print("=" * 60)
    print()

    cms_data = build_all_data()

    print()
    print("=" * 60)
    print("Writing JSON files...")
    print("=" * 60)

    write_json_files(cms_data)

    print()
    print("=" * 60)
    print("[SUCCESS] CMS Data Build Complete!")
    print("=" * 60)
    print()
    print("Summary:")
    print(f"  - Pages: {len(cms_data['pages'])}")
    print(f"  - Events: {len(cms_data['events'])}")
    print(f"  - Newsletters: {len(cms_data['newsletters'])}")
    print(f"  - Settings: {len(cms_data['settings'])} categories")
    print()
    print("Frontend can now load data from /api/*.json")
