@echo off
echo ============================================================
echo Starting All Servers for CMS Development
echo ============================================================
echo.
echo This will start:
echo   1. Decap CMS Backend (port 8081)
echo   2. Web Server (port 8080)
echo   3. Auto-Sync Watcher
echo.
echo Three windows will open - keep them all running!
echo.
echo Admin Panel: http://localhost:8080/admin
echo Website: http://localhost:8080
echo.
echo Press any key to continue...
pause >nul

echo.
echo Starting servers...
echo.

REM Start Decap CMS Backend
start "Decap CMS Backend" cmd /k "echo Starting Decap CMS Backend... && npx decap-server"

REM Wait 2 seconds
timeout /t 2 /nobreak >nul

REM Start Web Server
start "Web Server (Port 8080)" cmd /k "echo Starting Web Server... && python -m http.server 8080"

REM Wait 2 seconds
timeout /t 2 /nobreak >nul

REM Start Auto-Sync Watcher
start "Auto-Sync Watcher" cmd /k "echo Starting Auto-Sync Watcher... && python watch_and_sync.py"

echo.
echo ============================================================
echo All servers started!
echo ============================================================
echo.
echo You can now:
echo   - Edit content at: http://localhost:8080/admin
echo   - View website at: http://localhost:8080
echo   - Changes will auto-sync when you save!
echo.
echo Close the three server windows to stop everything.
echo ============================================================
echo.
pause
