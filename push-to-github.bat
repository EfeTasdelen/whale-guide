@echo off
rem First upload of Whale Guide to https://github.com/Volkansari3/whale-guide
rem Double-click this file once. Later changes: git add . ^& git commit -m "..." ^& git push
cd /d "%~dp0"
where git >nul 2>nul || (echo Git is not installed. Get it from https://git-scm.com/download/win and run this again. & pause & exit /b 1)

for /f "delims=" %%a in ('git config --global user.name') do set GN=%%a
if not defined GN (
  set /p GN=Your name for git commits: 
  call git config --global user.name "%%GN%%"
)
for /f "delims=" %%a in ('git config --global user.email') do set GE=%%a
if not defined GE (
  set /p GE=Your GitHub e-mail: 
  call git config --global user.email "%%GE%%"
)

if not exist ".git" git init
git checkout -B main
git add .
git commit -m "Whale Guide: first version"
git remote remove origin >nul 2>nul
git remote add origin https://github.com/Volkansari3/whale-guide.git

rem If the repo on GitHub already has files (a README, a licence), merge them in first and keep our versions on a clash
git fetch origin
git rev-parse --verify origin/main >nul 2>nul && git merge origin/main --allow-unrelated-histories -X ours -m "Merge the files already on GitHub"

git push -u origin main
echo.
echo Done if you see no errors above. Open https://github.com/Volkansari3/whale-guide
pause
