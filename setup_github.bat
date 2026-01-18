@echo off
echo ============================================================
echo GitHub Setup - Automated Configuration
echo ============================================================
echo.
echo This script will help you:
echo   1. Set up GitHub remote
echo   2. Update admin config
echo   3. Commit and push your code
echo.
echo You'll need:
echo   - Your GitHub username
echo   - Your GitHub repository name
echo.
echo ============================================================
echo.

REM Get GitHub username
set /p GH_USERNAME="Enter your GitHub username: "
if "%GH_USERNAME%"=="" (
    echo ERROR: Username cannot be empty!
    pause
    exit /b 1
)

REM Get repository name
set /p GH_REPO="Enter your repository name: "
if "%GH_REPO%"=="" (
    echo ERROR: Repository name cannot be empty!
    pause
    exit /b 1
)

echo.
echo ============================================================
echo Configuration Summary:
echo ============================================================
echo.
echo GitHub Username: %GH_USERNAME%
echo Repository Name: %GH_REPO%
echo Full Repo Path: %GH_USERNAME%/%GH_REPO%
echo.
set /p CONFIRM="Is this correct? (y/n): "
if /i not "%CONFIRM%"=="y" (
    echo Setup cancelled.
    pause
    exit /b 0
)

echo.
echo ============================================================
echo Step 1: Updating admin/config.yml
echo ============================================================

REM Update admin/config.yml using Python
python -c "import re; content = open('admin/config.yml', 'r', encoding='utf-8').read(); updated = re.sub(r'repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME', 'repo: %GH_USERNAME%/%GH_REPO%', content); open('admin/config.yml', 'w', encoding='utf-8').write(updated); print('[OK] Updated admin/config.yml')"

echo.
echo ============================================================
echo Step 2: Setting up Git remote
echo ============================================================

REM Add Git remote
git remote add origin https://github.com/%GH_USERNAME%/%GH_REPO%.git 2>nul
if errorlevel 1 (
    echo Remote 'origin' already exists, updating...
    git remote set-url origin https://github.com/%GH_USERNAME%/%GH_REPO%.git
)

echo [OK] Git remote configured

REM Verify remote
echo.
echo Git remote:
git remote -v

echo.
echo ============================================================
echo Step 3: Committing files
echo ============================================================

REM Add all files
git add .
echo [OK] Files staged

REM Commit
git commit -m "Configure CMS with GitHub backend for %GH_USERNAME%/%GH_REPO%"
if errorlevel 1 (
    echo [INFO] No changes to commit (already committed)
) else (
    echo [OK] Changes committed
)

echo.
echo ============================================================
echo Step 4: Pushing to GitHub
echo ============================================================
echo.
echo Pushing to GitHub...
echo You may need to login to GitHub.
echo.

git push -u origin master

echo.
echo ============================================================
echo SUCCESS! GitHub Setup Complete
echo ============================================================
echo.
echo Your code is now on GitHub!
echo Repository: https://github.com/%GH_USERNAME%/%GH_REPO%
echo.
echo NEXT STEPS:
echo   1. Read: SETUP_GITHUB_PRODUCTION.md
echo   2. Follow Steps 4-8 for OAuth and Vercel setup
echo   3. Test your production admin!
echo.
echo ============================================================
pause
