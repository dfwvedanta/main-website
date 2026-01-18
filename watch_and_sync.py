#!/usr/bin/env python3
"""
Auto-Sync Watcher - Automatically sync CMS changes to frontend
Watches the content/ folder and runs sync when files change
"""

import os
import sys
import time
import subprocess
from pathlib import Path
from datetime import datetime

try:
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler
except ImportError:
    print("Installing required package: watchdog...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "watchdog"])
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler

class CMSChangeHandler(FileSystemEventHandler):
    def __init__(self):
        self.last_sync = 0
        self.debounce_seconds = 2  # Wait 2 seconds after last change before syncing

    def on_any_event(self, event):
        # Ignore directory events and temporary files
        if event.is_directory:
            return
        if event.src_path.endswith(('.tmp', '.swp', '~')):
            return

        # Only watch .md and .yml files
        if not (event.src_path.endswith('.md') or event.src_path.endswith('.yml')):
            return

        current_time = time.time()

        # Debounce: only sync if it's been at least 2 seconds since last change
        if current_time - self.last_sync > self.debounce_seconds:
            self.last_sync = current_time
            self.sync_cms()

    def sync_cms(self):
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"\n{'='*60}")
        print(f"[{timestamp}] Change detected! Auto-syncing...")
        print('='*60)

        try:
            # Run sync script
            result = subprocess.run(
                [sys.executable, "sync_cms.py"],
                check=True,
                capture_output=True,
                text=True
            )

            print(result.stdout)
            print(f"\n[{timestamp}] ✓ Auto-sync complete!")
            print("="*60)

        except subprocess.CalledProcessError as e:
            print(f"\n[{timestamp}] ✗ Auto-sync failed!")
            print(e.stderr)
            print("="*60)

def main():
    print("="*60)
    print("CMS Auto-Sync Watcher")
    print("="*60)
    print()
    print("Watching for changes in content/ folder...")
    print("Sync will run automatically when you save files in admin.")
    print()
    print("Press Ctrl+C to stop")
    print("="*60)
    print()

    # Check if content folder exists
    content_path = Path("content")
    if not content_path.exists():
        print("[ERROR] content/ folder not found!")
        print("Make sure you're running this from the newdesign folder.")
        sys.exit(1)

    # Set up file watcher
    event_handler = CMSChangeHandler()
    observer = Observer()
    observer.schedule(event_handler, str(content_path), recursive=True)
    observer.start()

    print(f"[{datetime.now().strftime('%H:%M:%S')}] Watching started...")
    print()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n")
        print("="*60)
        print("Stopping watcher...")
        print("="*60)
        observer.stop()

    observer.join()

if __name__ == '__main__':
    main()
