@echo off
echo ============================================================
echo Restarting All Servers
echo ============================================================
echo.
echo This will:
echo   1. Kill all existing servers
echo   2. Start fresh servers
echo   3. Ensure clean state
echo.
echo ============================================================
echo.

echo Step 1: Killing existing servers...
echo.

REM Kill processes on port 8080 (web server)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080"') do (
    echo Killing process on port 8080 (PID: %%a)
    taskkill /PID %%a /F >nul 2>&1
)

REM Kill processes on port 8081 (decap server)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8081"') do (
    echo Killing process on port 8081 (PID: %%a)
    taskkill /PID %%a /F >nul 2>&1
)

REM Kill any node processes (decap-server)
taskkill /IM node.exe /F >nul 2>&1

REM Kill any python http.server processes
for /f "tokens=2" %%a in ('tasklist ^| findstr "python.exe"') do (
    taskkill /PID %%a /F >nul 2>&1
)

echo [OK] Servers stopped
timeout /t 2 /nobreak >nul

echo.
echo Step 2: Starting fresh servers...
echo.

REM Start Decap CMS Backend
start "Decap CMS Backend" cmd /k "cd /d "%CD%" && echo Starting Decap CMS Backend... && npx decap-server"

timeout /t 3 /nobreak >nul

REM Start Web Server
start "Web Server (Port 8080)" cmd /k "cd /d "%CD%" && echo Starting Web Server... && python -m http.server 8080"

timeout /t 3 /nobreak >nul

REM Start Auto-Sync Watcher
start "Auto-Sync Watcher" cmd /k "cd /d "%CD%" && echo Starting Auto-Sync Watcher... && python watch_and_sync.py"

echo.
echo ============================================================
echo All Servers Restarted!
echo ============================================================
echo.
echo Three windows should be open:
echo   1. Decap CMS Backend (port 8081)
echo   2. Web Server (port 8080)
echo   3. Auto-Sync Watcher
echo.
echo You can now:
echo   - Edit at: http://localhost:8080/admin
echo   - View at: http://localhost:8080
echo   - Changes auto-sync when you save!
echo.
echo ============================================================
echo.
pause
