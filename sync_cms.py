#!/usr/bin/env python3
"""
CMS Sync Script - Update Frontend from Admin Changes
Runs the complete workflow to sync CMS content to the frontend
"""

import subprocess
import sys

def run_script(script_name, description):
    """Run a Python script and handle errors"""
    print(f"\n{'='*60}")
    print(f"{description}")
    print('='*60)

    try:
        result = subprocess.run(
            [sys.executable, script_name],
            check=True,
            capture_output=False
        )
        print(f"[OK] {script_name} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] {script_name} failed with exit code {e.returncode}")
        return False

def main():
    print("\n" + "="*60)
    print("CMS SYNC - Updating Frontend from Admin Changes")
    print("="*60)
    print()
    print("This script will:")
    print("  1. Build CMS data (YAML/MD -> JSON)")
    print("  2. Update HTML files (preserving all layout/design)")
    print()

    # Step 1: Build CMS data
    if not run_script('build_cms_data.py', 'Step 1: Building CMS Data'):
        print("\n[ABORT] Failed to build CMS data")
        sys.exit(1)

    # Step 2: Update frontend HTML
    if not run_script('update_frontend.py', 'Step 2: Updating Frontend HTML'):
        print("\n[ABORT] Failed to update frontend")
        sys.exit(1)

    # Success!
    print("\n" + "="*60)
    print("SUCCESS! Frontend Updated from CMS")
    print("="*60)
    print()
    print("Your admin changes are now reflected on the website!")
    print("All layout, design, and structure preserved.")
    print()
    print("Next steps:")
    print("  - Test the changes locally")
    print("  - Deploy to Vercel: vercel --prod")
    print()

if __name__ == '__main__':
    main()
