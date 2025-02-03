@echo off
cd /d "%~dp0"
echo Starting local server...
@REM npx serve -s "D:/Drive-1/ESSI/NDC-HID/ndc-hid-fe/dist"
"C:\Program Files\nodejs\npx.cmd" serve -s "D:\Drive-1\ESSI\NDC-HID\ndc-hid-fe\dist"
pause