@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo Setting up BOIII-TOOL dependencies...
echo.

if not exist "deps\webview2" (
    echo Downloading WebView2 SDK...
    powershell -Command "Invoke-WebRequest -Uri 'https://www.nuget.org/api/v2/package/Microsoft.Web.WebView2/1.0.2210.55' -OutFile 'deps\webview2.zip'"
    echo Extracting WebView2 SDK...
    powershell -Command "Expand-Archive -Path 'deps\webview2.zip' -DestinationPath 'deps\webview2' -Force"
    del deps\webview2.zip
    echo WebView2 SDK installed.
) else (
    echo WebView2 SDK already installed.
)

if not exist "deps\rapidjson" (
    echo Downloading RapidJSON...
    powershell -Command "Invoke-WebRequest -Uri 'https://github.com/Tencent/rapidjson/archive/refs/heads/master.zip' -OutFile 'deps\rapidjson.zip'"
    echo Extracting RapidJSON...
    powershell -Command "Expand-Archive -Path 'deps\rapidjson.zip' -DestinationPath 'deps\rapidjson-temp' -Force"
    move deps\rapidjson-temp\rapidjson-master deps\rapidjson
    rmdir deps\rapidjson-temp
    del deps\rapidjson.zip
    echo RapidJSON installed.
) else (
    echo RapidJSON already installed.
)

echo.
echo Setup complete! Run generate.bat to create the Visual Studio solution.
pause
