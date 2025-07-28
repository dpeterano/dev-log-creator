@echo off
title Dev Log Creator - Version Francaise
echo.
echo 🚀 Lancement de Dev Log Creator (Francais)
echo.
cd /d "%~dp0build\dev-log-creator-win32-x64"
start dev-log-creator.exe
echo Application lancee !
timeout /t 2 >nul
