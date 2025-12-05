@echo off
REM -----------------------------
REM Next.js Standalone Server Runner
REM -----------------------------

REM Chuyển tới folder standalone
cd /d D:\ThucTapFrontEnd\Signal_Project\apolloNFT\apollo\.next\standalone

REM Đặt port 4000
set PORT=4000

REM Chạy server
node server.js

REM Giữ CMD mở để xem log
pause
