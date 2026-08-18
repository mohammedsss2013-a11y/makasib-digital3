@echo off
chcp 65001 > nul
echo ==========================================
echo Starting sync and deploy to GitHub...
echo ==========================================

cd /d C:\Users\AMIR\.gemini\antigravity\scratch\makasib-digital3

git add .
git commit -m "update: sync all project files and components"
git push origin main

echo ==========================================
echo [Success] All files uploaded successfully!
echo ==========================================
pause