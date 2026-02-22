#include "pch.hpp"
#include "backend.hpp"

namespace backend {

std::string wstring_to_string(const std::wstring& wstr) {
    if (wstr.empty()) return "";
    int size = WideCharToMultiByte(CP_UTF8, 0, wstr.c_str(), -1, nullptr, 0, nullptr, nullptr);
    std::string str(size - 1, 0);
    WideCharToMultiByte(CP_UTF8, 0, wstr.c_str(), -1, &str[0], size, nullptr, nullptr);
    return str;
}

std::wstring string_to_wstring(const std::string& str) {
    if (str.empty()) return L"";
    int size = MultiByteToWideChar(CP_UTF8, 0, str.c_str(), -1, nullptr, 0);
    std::wstring wstr(size - 1, 0);
    MultiByteToWideChar(CP_UTF8, 0, str.c_str(), -1, &wstr[0], size);
    return wstr;
}

std::string get_exe_directory() {
    wchar_t path[MAX_PATH];
    GetModuleFileNameW(nullptr, path, MAX_PATH);
    std::wstring ws(path);
    size_t pos = ws.find_last_of(L"\\/");
    if (pos != std::wstring::npos) {
        ws = ws.substr(0, pos);
    }
    return wstring_to_string(ws);
}

std::string get_data_path() {
    return get_exe_directory() + "\\..\\..\\..\\data";
}

std::string browse_folder(const std::string& title) {
    CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);
    
    IFileDialog* pfd = nullptr;
    HRESULT hr = CoCreateInstance(CLSID_FileOpenDialog, nullptr, CLSCTX_INPROC_SERVER, IID_PPV_ARGS(&pfd));
    
    std::string result;
    
    if (SUCCEEDED(hr)) {
        DWORD options;
        pfd->GetOptions(&options);
        pfd->SetOptions(options | FOS_PICKFOLDERS | FOS_FORCEFILESYSTEM);
        
        std::wstring wtitle = string_to_wstring(title);
        pfd->SetTitle(wtitle.c_str());
        
        if (SUCCEEDED(pfd->Show(nullptr))) {
            IShellItem* psi;
            if (SUCCEEDED(pfd->GetResult(&psi))) {
                PWSTR path = nullptr;
                if (SUCCEEDED(psi->GetDisplayName(SIGDN_FILESYSPATH, &path))) {
                    result = wstring_to_string(path);
                    CoTaskMemFree(path);
                }
                psi->Release();
            }
        }
        pfd->Release();
    }
    
    CoUninitialize();
    return result;
}

std::string browse_file(const std::string& title, const std::string& filter) {
    wchar_t filename[MAX_PATH] = {0};
    
    OPENFILENAMEW ofn = {};
    ofn.lStructSize = sizeof(ofn);
    ofn.hwndOwner = nullptr;
    
    std::wstring wfilter = string_to_wstring(filter);
    std::replace(wfilter.begin(), wfilter.end(), L'|', L'\0');
    wfilter.push_back(L'\0');
    
    ofn.lpstrFilter = wfilter.c_str();
    ofn.lpstrFile = filename;
    ofn.nMaxFile = MAX_PATH;
    
    std::wstring wtitle = string_to_wstring(title);
    ofn.lpstrTitle = wtitle.c_str();
    ofn.Flags = OFN_FILEMUSTEXIST | OFN_PATHMUSTEXIST | OFN_NOCHANGEDIR;
    
    if (GetOpenFileNameW(&ofn)) {
        return wstring_to_string(filename);
    }
    
    return "";
}

bool create_directory(const std::string& path) {
    return fs::create_directories(path);
}

bool delete_directory(const std::string& path) {
    std::error_code ec;
    fs::remove_all(path, ec);
    return !ec;
}

bool file_exists(const std::string& path) {
    return fs::exists(path) && fs::is_regular_file(path);
}

bool directory_exists(const std::string& path) {
    return fs::exists(path) && fs::is_directory(path);
}

std::vector<std::string> list_directory(const std::string& path) {
    std::vector<std::string> entries;
    if (fs::exists(path) && fs::is_directory(path)) {
        for (const auto& entry : fs::directory_iterator(path)) {
            entries.push_back(entry.path().filename().string());
        }
    }
    return entries;
}

std::string read_file(const std::string& path) {
    std::ifstream file(path);
    if (!file.is_open()) return "";
    std::stringstream buffer;
    buffer << file.rdbuf();
    return buffer.str();
}

bool write_file(const std::string& path, const std::string& content) {
    std::ofstream file(path);
    if (!file.is_open()) return false;
    file << content;
    return true;
}

bool delete_file(const std::string& path) {
    std::error_code ec;
    return fs::remove(path, ec);
}

uint64_t get_file_size(const std::string& path) {
    if (!fs::exists(path)) return 0;
    return fs::file_size(path);
}

std::string get_file_hash(const std::string& path) {
    return verification::Verifier::compute_hash(path);
}

void open_url(const std::string& url) {
    ShellExecuteW(nullptr, L"open", string_to_wstring(url).c_str(), nullptr, nullptr, SW_SHOWNORMAL);
}

void open_folder(const std::string& path) {
    ShellExecuteW(nullptr, L"explore", string_to_wstring(path).c_str(), nullptr, nullptr, SW_SHOWNORMAL);
}

void copy_to_clipboard(const std::string& text) {
    if (!OpenClipboard(nullptr)) return;
    EmptyClipboard();
    
    HGLOBAL hg = GlobalAlloc(GMEM_MOVEABLE, text.size() + 1);
    if (hg) {
        memcpy(GlobalLock(hg), text.c_str(), text.size() + 1);
        GlobalUnlock(hg);
        SetClipboardData(CF_TEXT, hg);
    }
    
    CloseClipboard();
}

std::string get_clipboard() {
    if (!OpenClipboard(nullptr)) return "";
    
    HANDLE hData = GetClipboardData(CF_TEXT);
    if (!hData) {
        CloseClipboard();
        return "";
    }
    
    char* text = static_cast<char*>(GlobalLock(hData));
    std::string result = text ? text : "";
    GlobalUnlock(hData);
    CloseClipboard();
    
    return result;
}

bool check_port(int port) {
    WSADATA wsaData;
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) return false;
    
    SOCKET sock = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
    if (sock == INVALID_SOCKET) {
        WSACleanup();
        return false;
    }
    
    sockaddr_in addr = {};
    addr.sin_family = AF_INET;
    addr.sin_port = htons(static_cast<u_short>(port));
    addr.sin_addr.s_addr = INADDR_ANY;
    
    bool available = (bind(sock, reinterpret_cast<sockaddr*>(&addr), sizeof(addr)) != SOCKET_ERROR);
    
    closesocket(sock);
    WSACleanup();
    
    return available;
}

bool open_firewall_port(int port, const std::string& name) {
    std::stringstream cmd;
    cmd << "netsh advfirewall firewall add rule name=\"" << name << "\" ";
    cmd << "dir=in action=allow protocol=UDP localport=" << port;
    
    std::wstring wcmd = string_to_wstring(cmd.str());
    
    SHELLEXECUTEINFOW sei = {};
    sei.cbSize = sizeof(sei);
    sei.fMask = SEE_MASK_NOCLOSEPROCESS;
    sei.lpVerb = L"runas";
    sei.lpFile = L"cmd.exe";
    
    std::wstring params = L"/c " + wcmd;
    sei.lpParameters = params.c_str();
    sei.nShow = SW_HIDE;
    
    if (!ShellExecuteExW(&sei)) return false;
    
    if (sei.hProcess) {
        WaitForSingleObject(sei.hProcess, INFINITE);
        DWORD exitCode;
        GetExitCodeProcess(sei.hProcess, &exitCode);
        CloseHandle(sei.hProcess);
        return exitCode == 0;
    }
    
    return false;
}

bool run_as_admin(const std::string& exe, const std::string& args) {
    SHELLEXECUTEINFOW sei = {};
    sei.cbSize = sizeof(sei);
    sei.lpVerb = L"runas";
    sei.lpFile = string_to_wstring(exe).c_str();
    sei.lpParameters = string_to_wstring(args).c_str();
    sei.nShow = SW_SHOWNORMAL;
    
    return ShellExecuteExW(&sei) != FALSE;
}

bool run_process(const std::string& exe, const std::string& args, bool wait) {
    STARTUPINFOW si = {};
    si.cb = sizeof(si);
    PROCESS_INFORMATION pi = {};
    
    std::wstring cmdline = string_to_wstring(exe + " " + args);
    
    if (!CreateProcessW(nullptr, &cmdline[0], nullptr, nullptr, FALSE, 0, nullptr, nullptr, &si, &pi)) {
        return false;
    }
    
    if (wait) {
        WaitForSingleObject(pi.hProcess, INFINITE);
    }
    
    CloseHandle(pi.hProcess);
    CloseHandle(pi.hThread);
    
    return true;
}

std::string create_server_config(const std::string& game_path,
                                  const std::string& server_name,
                                  const std::string& map,
                                  const std::string& mode,
                                  int max_players,
                                  int port,
                                  const std::string& password,
                                  bool hardcore,
                                  bool dedicated) {
    if (game_path.empty()) return "";

    // Detect lobby mode from map prefix
    std::string lobby_mode = "mp";
    std::string config_suffix = "";
    if (map.rfind("zm_", 0) == 0) {
        lobby_mode = "zm";
        config_suffix = "_zm";
    } else if (map.rfind("cp_", 0) == 0) {
        lobby_mode = "cp";
        config_suffix = "_cp";
    }

    std::stringstream cfg;
    cfg << "//////////////////////////////////////////////////\n";
    cfg << "///         BOIII Server Configuration          //\n";
    cfg << "//////////////////////////////////////////////////\n\n";

    // Server identity
    cfg << "set live_steam_server_name \"" << server_name << "\"\n";
    cfg << "set live_steam_server_description \"BOIII Server\"\n\n";

    // Non-gameplay settings
    cfg << "set com_maxclients \"" << max_players << "\"\n";
    if (lobby_mode != "mp") {
        cfg << "set lobby_min_players \"1\"\n";
    }
    cfg << "set rcon_password \"\"\n";
    cfg << "set g_password \"" << password << "\"\n";
    cfg << "set sv_privateClients \"0\"\n";
    cfg << "set sv_timeout \"30\"\n";
    cfg << "set sv_reconnectlimit \"3\"\n";
    cfg << "set sv_pure \"0\"\n";
    cfg << "set sv_floodProtect \"1\"\n";
    cfg << "set g_log \"logs/games_" << lobby_mode << ".log\"\n";
    cfg << "set sv_lobby_mode \"" << lobby_mode << "\"\n";
    cfg << "set sv_skip_lobby \"1\"\n";
    cfg << "set sv_lanonly \"0\"\n\n";

    // Bot config (MP only)
    if (lobby_mode == "mp") {
        cfg << "set bot_maxallies \"0\"\n";
        cfg << "set bot_maxAxis \"0\"\n";
        cfg << "set bot_maxFree \"0\"\n";
        cfg << "set bot_difficulty \"1\"\n\n";
    }

    // Base game configuration execs
    if (lobby_mode == "zm") {
        cfg << "exec \"gamedata/gamesettings/zm/gamesettings_default.cfg\"\n";
        cfg << "exec \"gamedata/configs/common/default_xboxlive.cfg\"\n";
        cfg << "exec \"gamedata/gamesettings/zm/gamesettings_zclassic.cfg\"\n";
    } else if (lobby_mode == "cp") {
        cfg << "exec \"gamedata/gamesettings/cp/gamesettings_default.cfg\"\n";
        cfg << "exec \"gamedata/configs/common/default_xboxlive.cfg\"\n";
        cfg << "exec \"gamedata/gamesettings/cp/gamesettings_coop.cfg\"\n";
    } else {
        cfg << "exec \"gamedata/gamesettings/mp/gamesettings_" << mode << ".cfg\"\n";
    }
    cfg << "\n";

    // Gameplay settings
    if (hardcore) {
        cfg << "set g_hardcore 1\n";
    }
    cfg << "set cg_thirdPerson \"0\"\n";
    cfg << "set g_deadChat \"0\"\n";
    if (lobby_mode == "zm") {
        cfg << "set scr_firstGumFree \"1\"\n";
    }
    if (lobby_mode == "mp") {
        cfg << "set scr_teambalance \"1\"\n";
    }
    cfg << "\n";

    // Map rotation
    if (lobby_mode == "zm") {
        cfg << "set sv_maprotation \"gametype zclassic map " << map << "\"\n";
    } else if (lobby_mode == "cp") {
        cfg << "set sv_maprotation \"gametype coop map " << map << "\"\n";
    } else {
        cfg << "set sv_maprotation \"gametype " << mode << " map " << map << "\"\n";
    }

    // Determine config filename
    std::string config_path = game_path + "\\server" + config_suffix + ".cfg";

    try {
        if (write_file(config_path, cfg.str())) {
            return config_path;
        }
    } catch (...) {
        return "";
    }

    return "";
}

RemovalResult remove_boiii(const std::string& game_path) {
    RemovalResult result;
    result.success = true;
    
    std::vector<std::string> files_to_delete = {
        "boiii.exe",
        "ext.dll",
        "data\\ui_scripts",
        "data\\gamesettings",
        "data\\launcher",
        "players2\\config.cfg",
        "players2\\player.gp",
        "AppData\\Local\\BOIII"
    };
    
    std::vector<std::string> dirs_to_delete = {
        "data\\ui_scripts",
        "data\\gamesettings",
        "data\\launcher"
    };
    
    for (const auto& f : files_to_delete) {
        std::string full_path = game_path + "\\" + f;
        
        if (fs::exists(full_path)) {
            std::error_code ec;
            
            if (fs::is_directory(full_path)) {
                fs::remove_all(full_path, ec);
                if (!ec) {
                    result.deleted_dirs.push_back(f);
                } else {
                    result.failed.push_back(f);
                }
            } else {
                fs::remove(full_path, ec);
                if (!ec) {
                    result.deleted_files.push_back(f);
                } else {
                    result.failed.push_back(f);
                }
            }
        }
    }
    
    wchar_t appdata[MAX_PATH];
    if (SUCCEEDED(SHGetFolderPathW(nullptr, CSIDL_LOCAL_APPDATA, nullptr, 0, appdata))) {
        std::string boiii_appdata = wstring_to_string(appdata) + "\\BOIII";
        if (fs::exists(boiii_appdata)) {
            std::error_code ec;
            fs::remove_all(boiii_appdata, ec);
            if (!ec) {
                result.deleted_dirs.push_back("AppData\\Local\\BOIII");
            } else {
                result.failed.push_back("AppData\\Local\\BOIII");
            }
        }
    }
    
    result.success = result.failed.empty();
    
    return result;
}

bool validate_game_path(const std::string& path) {
    if (path.empty()) return false;
    try {
        return fs::exists(path + "\\BlackOps3.exe") || 
               fs::exists(path + "\\BlackOps3_UnrankedDedicatedServer.exe");
    } catch (...) {
        return false;
    }
}

std::string detect_game_path() {
    std::vector<std::string> candidates;
    
    // 1. Check Steam registry for install path
    auto try_registry = [&](HKEY root, const char* subkey) {
        HKEY hKey;
        if (RegOpenKeyExA(root, subkey, 0, KEY_READ, &hKey) == ERROR_SUCCESS) {
            char steamPath[MAX_PATH];
            DWORD size = sizeof(steamPath);
            DWORD type = 0;
            if (RegQueryValueExA(hKey, "InstallPath", nullptr, &type, (LPBYTE)steamPath, &size) == ERROR_SUCCESS) {
                std::string base = std::string(steamPath);
                candidates.push_back(base + "\\steamapps\\common\\Call of Duty Black Ops III");
                
                // Try reading libraryfolders.vdf for additional library paths
                std::string vdf = base + "\\steamapps\\libraryfolders.vdf";
                std::ifstream vdfFile(vdf);
                if (vdfFile.is_open()) {
                    std::string line;
                    while (std::getline(vdfFile, line)) {
                        auto pos = line.find("\"path\"");
                        if (pos != std::string::npos) {
                            auto last_quote = line.rfind('"');
                            if (last_quote == std::string::npos) continue;
                            auto second_last = line.rfind('"', last_quote - 1);
                            if (second_last == std::string::npos) continue;
                            std::string libPath = line.substr(second_last + 1, last_quote - second_last - 1);
                            std::string clean;
                            for (size_t i = 0; i < libPath.size(); ++i) {
                                if (libPath[i] == '\\' && i + 1 < libPath.size() && libPath[i+1] == '\\') {
                                    clean += '\\';
                                    ++i;
                                } else {
                                    clean += libPath[i];
                                }
                            }
                            candidates.push_back(clean + "\\steamapps\\common\\Call of Duty Black Ops III");
                        }
                    }
                }
            }
            RegCloseKey(hKey);
        }
    };
    
    try_registry(HKEY_LOCAL_MACHINE, "SOFTWARE\\WOW6432Node\\Valve\\Steam");
    try_registry(HKEY_LOCAL_MACHINE, "SOFTWARE\\Valve\\Steam");
    try_registry(HKEY_CURRENT_USER, "SOFTWARE\\Valve\\Steam");
    
    // 2. Common default paths
    const char* common[] = {
        "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Call of Duty Black Ops III",
        "C:\\Program Files\\Steam\\steamapps\\common\\Call of Duty Black Ops III",
        "D:\\Steam\\steamapps\\common\\Call of Duty Black Ops III",
        "D:\\SteamLibrary\\steamapps\\common\\Call of Duty Black Ops III",
        "E:\\Steam\\steamapps\\common\\Call of Duty Black Ops III",
        "E:\\SteamLibrary\\steamapps\\common\\Call of Duty Black Ops III",
        "F:\\Steam\\steamapps\\common\\Call of Duty Black Ops III",
        "F:\\SteamLibrary\\steamapps\\common\\Call of Duty Black Ops III",
    };
    for (auto& p : common) {
        candidates.push_back(p);
    }
    
    // 3. Check each candidate
    for (const auto& path : candidates) {
        if (validate_game_path(path)) {
            return path;
        }
    }
    
    return "";
}

}
