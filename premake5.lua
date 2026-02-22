workspace "BOIII-TOOL"
    location "./build"
    objdir "%{wks.location}/obj/%{cfg.buildcfg}"
    targetdir "%{wks.location}/bin/%{cfg.platform}/%{cfg.buildcfg}"
    
    configurations { "Debug", "Release" }
    platforms { "x64" }
    
    architecture "x86_64"
    
    buildoptions { "/std:c++20", "/utf-8" }
    systemversion "latest"
    symbols "On"
    staticruntime "On"
    
    defines {
        "_WINDOWS",
        "WIN32_LEAN_AND_MEAN",
        "NOMINMAX",
        "_CRT_SECURE_NO_WARNINGS",
        "_SILENCE_ALL_CXX17_DEPRECATION_WARNINGS"
    }
    
    filter "configurations:Debug"
        defines { "DEBUG", "_DEBUG" }
        optimize "Debug"
        runtime "Debug"
        
    filter "configurations:Release"
        defines { "NDEBUG" }
        optimize "Full"
        runtime "Release"
        flags { "NoIncrementalLink", "LinkTimeOptimization" }
        
    filter {}

project "boiii-tool"
    kind "WindowedApp"
    language "C++"
    cppdialect "C++20"
    
    pchheader "pch.hpp"
    pchsource "src/pch.cpp"
    
    files {
        "src/**.hpp",
        "src/**.cpp",
        "src/**.h",
        "src/**.rc"
    }
    
    includedirs {
        "src",
        "deps/webview2/build/native/include",
        "deps/rapidjson/include"
    }
    
    libdirs {
        "deps/webview2/build/native/x64"
    }
    
    links {
        "WebView2LoaderStatic",
        "advapi32",
        "comdlg32",
        "gdi32",
        "kernel32",
        "ole32",
        "oleaut32",
        "shell32",
        "shlwapi",
        "user32",
        "uuid",
        "winhttp",
        "ws2_32"
    }
    
    postbuildcommands {
        "{MKDIR} %{cfg.targetdir}/ui",
        "{COPYDIR} ../ui %{cfg.targetdir}/ui"
    }
    
    filter "configurations:Release"
        flags { "NoManifest" }
        linkoptions { "/SUBSYSTEM:WINDOWS" }
