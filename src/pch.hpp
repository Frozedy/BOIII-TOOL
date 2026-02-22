#pragma once

#include <WinSock2.h>
#include <WS2tcpip.h>
#include <Windows.h>
#include <ShlObj.h>
#include <Shlwapi.h>
#include <shellapi.h>
#include <commdlg.h>
#include <WinHttp.h>
#include <wrl.h>

#include <string>
#include <vector>
#include <map>
#include <functional>
#include <memory>
#include <filesystem>
#include <fstream>
#include <sstream>
#include <thread>
#include <mutex>
#include <atomic>
#include <chrono>
#include <algorithm>
#include <iomanip>
#include <regex>

#include <WebView2.h>
#ifdef GetObject
#undef GetObject
#endif

#include <rapidjson/document.h>
#include <rapidjson/writer.h>
#include <rapidjson/stringbuffer.h>
#include <rapidjson/filereadstream.h>

namespace fs = std::filesystem;
using Microsoft::WRL::Callback;
using Microsoft::WRL::ComPtr;
