@echo off
echo ============================================================
echo CMS Diagnostic Tool
echo ============================================================
echo.

echo Checking servers...
echo.

echo [1] Web Server (Port 8080):
netstat -ano | findstr ":8080" >nul
if errorlevel 1 (
    echo    [X] NOT RUNNING
    set WEB_SERVER=0
) else (
    echo    [OK] RUNNING
    set WEB_SERVER=1
)

echo [2] Decap CMS Server (Port 8081):
netstat -ano | findstr ":8081" >nul
if errorlevel 1 (
    echo    [X] NOT RUNNING
    set DECAP_SERVER=0
) else (
    echo    [OK] RUNNING
    set DECAP_SERVER=1
)

echo.
echo Checking files...
echo.

echo [3] Content folder:
if exist "content\" (
    echo    [OK] EXISTS
    dir content\pages\*.md 2>nul | find "File(s)" >nul
    if errorlevel 1 (
        echo    [!] No page files found
    ) else (
        for /f %%a in ('dir /b content\pages\*.md ^| find /c /v ""') do echo    [OK] %%a page files found
    )
) else (
    echo    [X] NOT FOUND
)

echo [4] API folder:
if exist "api\" (
    echo    [OK] EXISTS
    if exist "api\page-index.json" (
        echo    [OK] page-index.json exists
    ) else (
        echo    [!] page-index.json missing
    )
) else (
    echo    [X] NOT FOUND
)

echo.
echo Checking last modification times...
echo.

echo [5] Last modified content file:
for /f "delims=" %%a in ('dir /b /o-d /t:w content\pages\*.md 2^>nul ^| findstr /r ".*" ^| findstr /n "^" ^| findstr "^1:"') do (
    set LAST_CONTENT=%%a
    set LAST_CONTENT=!LAST_CONTENT:~2!
)
if defined LAST_CONTENT (
    for %%a in ("content\pages\%LAST_CONTENT%") do echo    %LAST_CONTENT% - %%~ta
) else (
    echo    [!] No content files found
)

echo [6] Last modified HTML file:
for /f "delims=" %%a in ('dir /b /o-d /t:w *.html 2^>nul ^| findstr /v "index" ^| findstr /r ".*" ^| findstr /n "^" ^| findstr "^1:"') do (
    set LAST_HTML=%%a
    set LAST_HTML=!LAST_HTML:~2!
)
if defined LAST_HTML (
    for %%a in ("%LAST_HTML%") do echo    %LAST_HTML% - %%~ta
) else (
    echo    [!] No HTML files found
)

echo.
echo ============================================================
echo DIAGNOSIS:
echo ============================================================
echo.

if %WEB_SERVER%==0 (
    echo [ISSUE] Web server not running
    echo [FIX] Run: python -m http.server 8080
    echo.
)

if %DECAP_SERVER%==0 (
    echo [ISSUE] Decap CMS server not running
    echo [FIX] Run: npx decap-server
    echo.
)

if %WEB_SERVER%==1 if %DECAP_SERVER%==1 (
    echo [OK] All servers running
    echo.
    echo NEXT STEPS:
    echo 1. Go to: http://localhost:8080/admin
    echo 2. Make a change to any page
    echo 3. Click "Publish"
    echo 4. Check content\pages\ folder - file should update
    echo 5. Run: python sync_cms.py
    echo 6. Check the HTML file - should be updated
    echo.
    echo If auto-sync watcher is running, step 5 happens automatically!
    echo.
)

echo ============================================================
echo.
echo Want to test the sync manually?
set /p TEST="Run sync now? (y/n): "
if /i "%TEST%"=="y" (
    echo.
    echo Running sync...
    python sync_cms.py
)

echo.
pause
