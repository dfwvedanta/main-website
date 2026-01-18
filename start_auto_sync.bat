@echo off
echo ============================================================
echo CMS Auto-Sync Watcher
echo ============================================================
echo.
echo This will automatically sync your admin changes to frontend.
echo Leave this window open while editing in the admin panel.
echo.
echo Press Ctrl+C to stop the watcher.
echo ============================================================
echo.

python watch_and_sync.py
pause
