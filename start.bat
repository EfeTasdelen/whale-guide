@echo off
rem Starts Whale Guide on http://localhost:5500 (double-click this file, or run start.bat in this folder)
cd /d "%~dp0"
echo Whale Guide is running at http://localhost:5500  (close this window to stop)
start "" http://localhost:5500
where python >nul 2>nul && (python -m http.server 5500 & goto :eof)
where npx >nul 2>nul && (npx --yes http-server -p 5500 -c-1 & goto :eof)
echo Python or Node.js is needed to run a local server. You can also just double-click index.html.
pause
