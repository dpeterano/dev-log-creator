@echo off
title Dev Log Creator - English Version
echo.
echo 🚀 Launching Dev Log Creator (English)
echo.
cd /d "%~dp0build\dev-log-creator-en-win32-x64"
start dev-log-creator.exe
echo Application launched!
timeout /t 2 >nul
