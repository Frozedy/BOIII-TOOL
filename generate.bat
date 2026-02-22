@echo off
if exist build rmdir /s /q build
tools\premake5 %* vs2022
pause