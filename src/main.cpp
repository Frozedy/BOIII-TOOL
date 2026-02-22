#include "pch.hpp"
#include "backend.hpp"
#include "verification.hpp"
#include "resource.h"
#include <queue>

#define WM_WEBVIEW_MSG (WM_APP + 1)

static ComPtr<ICoreWebView2> g_webview;
static ComPtr<ICoreWebView2Controller> g_controller;
static HWND g_hwnd = nullptr;
static verification::Verifier g_verifier;
static std::mutex g_msg_mutex;
static std::queue<std::string> g_msg_queue;

void send_to_webview(const std::string& json) {
    if (g_webview) {
        std::wstring ws = backend::string_to_wstring(json);
        g_webview->PostWebMessageAsJson(ws.c_str());
    }
}

// Thread-safe version: marshals message to UI thread via PostMessage
void send_to_webview_safe(const std::string& json) {
    {
        std::lock_guard<std::mutex> lock(g_msg_mutex);
        g_msg_queue.push(json);
    }
    if (g_hwnd) {
        PostMessage(g_hwnd, WM_WEBVIEW_MSG, 0, 0);
    }
}

std::string escape_json_string(const std::string& s) {
    std::string result;
    for (char c : s) {
        switch (c) {
            case '"': result += "\\\""; break;
            case '\\': result += "\\\\"; break;
            case '\n': result += "\\n"; break;
            case '\r': result += "\\r"; break;
            case '\t': result += "\\t"; break;
            default: result += c; break;
        }
    }
    return result;
}

void handle_message(const std::string& message) {
    rapidjson::Document doc;
    if (doc.Parse(message.c_str()).HasParseError()) return;
    
    if (!doc.HasMember("action") || !doc["action"].IsString()) return;
    
    std::string action = doc["action"].GetString();
    std::string id = doc.HasMember("id") ? doc["id"].GetString() : "";
    
    auto send_response = [&](const std::string& data, bool error = false) {
        std::stringstream ss;
        ss << "{\"id\":\"" << id << "\",";
        if (error) {
            ss << "\"error\":\"" << escape_json_string(data) << "\"";
        } else {
            ss << "\"data\":" << data;
        }
        ss << "}";
        send_to_webview(ss.str());
    };
    
    if (action == "browse_folder") {
        std::string title = doc.HasMember("title") ? doc["title"].GetString() : "Select Folder";
        std::string path = backend::browse_folder(title);
        send_response("\"" + escape_json_string(path) + "\"");
    }
    else if (action == "browse_file") {
        std::string title = doc.HasMember("title") ? doc["title"].GetString() : "Select File";
        std::string filter = doc.HasMember("filter") ? doc["filter"].GetString() : "All Files|*.*";
        std::string path = backend::browse_file(title, filter);
        send_response("\"" + escape_json_string(path) + "\"");
    }
    else if (action == "open_url") {
        std::string url = doc["url"].GetString();
        backend::open_url(url);
        send_response("true");
    }
    else if (action == "open_folder") {
        std::string path = doc["path"].GetString();
        backend::open_folder(path);
        send_response("true");
    }
    else if (action == "copy_to_clipboard") {
        std::string text = doc["text"].GetString();
        backend::copy_to_clipboard(text);
        send_response("true");
    }
    else if (action == "check_port") {
        int port = doc["port"].GetInt();
        bool available = backend::check_port(port);
        send_response(available ? "true" : "false");
    }
    else if (action == "open_firewall_port") {
        int port = doc["port"].GetInt();
        std::string name = doc.HasMember("name") ? doc["name"].GetString() : "BOIII";
        bool success = backend::open_firewall_port(port, name);
        send_response(success ? "true" : "false");
    }
    else if (action == "create_server_config") {
        try {
            std::string game_path = doc.HasMember("game_path") ? doc["game_path"].GetString() : "";
            std::string server_name = doc.HasMember("server_name") ? doc["server_name"].GetString() : "BOIII Server";
            std::string map = doc.HasMember("map") ? doc["map"].GetString() : "mp_biodome";
            std::string mode = doc.HasMember("mode") ? doc["mode"].GetString() : "tdm";
            int max_players = doc.HasMember("max_players") && doc["max_players"].IsInt() ? doc["max_players"].GetInt() : 18;
            int port = doc.HasMember("port") && doc["port"].IsInt() ? doc["port"].GetInt() : 27017;
            std::string password = doc.HasMember("password") ? doc["password"].GetString() : "";
            bool hardcore = doc.HasMember("hardcore") && doc["hardcore"].IsBool() ? doc["hardcore"].GetBool() : false;
            bool dedicated = doc.HasMember("dedicated") && doc["dedicated"].IsBool() ? doc["dedicated"].GetBool() : false;

            if (game_path.empty()) {
                send_response("Please set a game path first", true);
                return;
            }

            std::string config_path = backend::create_server_config(
                game_path, server_name, map, mode, max_players, port, password, hardcore, dedicated
            );

            if (config_path.empty()) {
                send_response("Failed to create server config", true);
            } else {
                send_response("\"" + escape_json_string(config_path) + "\"");
            }
        } catch (const std::exception& ex) {
            send_response(std::string("Config error: ") + ex.what(), true);
        } catch (...) {
            send_response("Unknown error creating server config", true);
        }
    }
    else if (action == "remove_boiii") {
        std::string game_path = doc["game_path"].GetString();
        std::string cb_id = id;
        
        std::thread([cb_id, game_path]() {
            try {
                auto result = backend::remove_boiii(game_path);
                
                std::stringstream ss;
                ss << "{\"success\":" << (result.success ? "true" : "false");
                ss << ",\"deleted_files\":[";
                for (size_t i = 0; i < result.deleted_files.size(); ++i) {
                    if (i > 0) ss << ",";
                    ss << "\"" << escape_json_string(result.deleted_files[i]) << "\"";
                }
                ss << "],\"deleted_dirs\":[";
                for (size_t i = 0; i < result.deleted_dirs.size(); ++i) {
                    if (i > 0) ss << ",";
                    ss << "\"" << escape_json_string(result.deleted_dirs[i]) << "\"";
                }
                ss << "],\"failed\":[";
                for (size_t i = 0; i < result.failed.size(); ++i) {
                    if (i > 0) ss << ",";
                    ss << "\"" << escape_json_string(result.failed[i]) << "\"";
                }
                ss << "]}";
                
                std::stringstream resp;
                resp << "{\"id\":\"" << cb_id << "\",\"data\":" << ss.str() << "}";
                send_to_webview_safe(resp.str());
            } catch (const std::exception& ex) {
                std::stringstream resp;
                resp << "{\"id\":\"" << cb_id << "\",\"error\":\"" << escape_json_string(std::string("Removal failed: ") + ex.what()) << "\"}";
                send_to_webview_safe(resp.str());
            } catch (...) {
                std::stringstream resp;
                resp << "{\"id\":\"" << cb_id << "\",\"error\":\"Unknown removal error\"}";
                send_to_webview_safe(resp.str());
            }
        }).detach();
    }
    else if (action == "load_verification_manifest") {
        // Try external file first (verification.json next to exe), then fall back to embedded resource
        bool loaded = g_verifier.load_manifest_from_exe_dir();
        if (!loaded) {
            loaded = g_verifier.load_manifest_from_resource();
        }
        if (!loaded) {
            send_response("Failed to load verification manifest. Make sure verification.json is in the same folder as the exe.", true);
            return;
        }
        
        std::stringstream ss;
        ss << "{\"components\":{";
        
        auto& comps = g_verifier.get_components();
        bool first = true;
        for (const auto& [name, comp] : comps) {
            if (!first) ss << ",";
            first = false;
            ss << "\"" << name << "\":{";
            ss << "\"displayName\":\"" << escape_json_string(comp.displayName) << "\",";
            ss << "\"show\":" << (comp.show ? "true" : "false") << ",";
            ss << "\"required\":" << (comp.required ? "true" : "false") << ",";
            ss << "\"defaultEnabled\":" << (comp.defaultEnabled ? "true" : "false") << ",";
            ss << "\"totalSize\":" << comp.totalSize;
            ss << "}";
        }
        
        ss << "},\"totalFiles\":" << g_verifier.get_files().size() << "}";
        send_response(ss.str());
    }
    else if (action == "verify_files") {
        std::string game_path = doc["game_path"].GetString();
        bool check_hash = doc.HasMember("check_hash") ? doc["check_hash"].GetBool() : false;
        
        std::vector<std::string> components;
        if (doc.HasMember("components") && doc["components"].IsArray()) {
            for (auto& c : doc["components"].GetArray()) {
                if (c.IsString()) {
                    components.push_back(c.GetString());
                }
            }
        }
        
        std::string cb_id = id;
        std::thread([cb_id, game_path, components, check_hash]() {
            try {
                auto result = g_verifier.verify(game_path, components, check_hash,
                    [&cb_id](int verified, int total, const std::string& current_file) {
                        std::stringstream ss;
                        ss << "{\"type\":\"progress\",\"id\":\"" << cb_id << "\",";
                        ss << "\"verified\":" << verified << ",";
                        ss << "\"total\":" << total << ",";
                        ss << "\"current\":\"" << escape_json_string(current_file) << "\"}";
                        send_to_webview_safe(ss.str());
                    }
                );
                
                std::stringstream ss;
                ss << "{\"complete\":" << (result.complete ? "true" : "false");
                ss << ",\"verified\":" << result.verified;
                ss << ",\"total\":" << result.total;
                ss << ",\"missing\":[";
                for (size_t i = 0; i < result.missing.size(); ++i) {
                    if (i > 0) ss << ",";
                    ss << "{\"path\":\"" << escape_json_string(result.missing[i].path) << "\",";
                    ss << "\"size\":" << result.missing[i].size << ",";
                    ss << "\"component\":\"" << result.missing[i].component << "\"}";
                }
                ss << "],\"corrupted\":[";
                for (size_t i = 0; i < result.corrupted.size(); ++i) {
                    if (i > 0) ss << ",";
                    ss << "{\"path\":\"" << escape_json_string(result.corrupted[i].path) << "\",";
                    ss << "\"size\":" << result.corrupted[i].size << ",";
                    ss << "\"actual_size\":" << result.corrupted[i].actual_size << ",";
                    ss << "\"hash\":\"" << result.corrupted[i].hash << "\",";
                    ss << "\"actual_hash\":\"" << result.corrupted[i].actual_hash << "\",";
                    ss << "\"reason\":\"" << result.corrupted[i].reason << "\",";
                    ss << "\"component\":\"" << result.corrupted[i].component << "\"}";
                }
                ss << "]}";
                
                std::stringstream resp;
                resp << "{\"id\":\"" << cb_id << "\",\"data\":" << ss.str() << "}";
                send_to_webview_safe(resp.str());
            } catch (const std::exception& ex) {
                std::stringstream resp;
                resp << "{\"id\":\"" << cb_id << "\",\"error\":\"" << escape_json_string(std::string("Verification failed: ") + ex.what()) << "\"}";
                send_to_webview_safe(resp.str());
            } catch (...) {
                std::stringstream resp;
                resp << "{\"id\":\"" << cb_id << "\",\"error\":\"Verification failed with unknown error\"}";
                send_to_webview_safe(resp.str());
            }
        }).detach();
    }
    else if (action == "pause_verification") {
        g_verifier.pause();
        send_response("true");
    }
    else if (action == "resume_verification") {
        g_verifier.resume();
        send_response("true");
    }
    else if (action == "cancel_verification") {
        g_verifier.cancel();
        send_response("true");
    }
    else if (action == "file_exists") {
        std::string path = doc["path"].GetString();
        bool exists = backend::file_exists(path);
        send_response(exists ? "true" : "false");
    }
    else if (action == "directory_exists") {
        std::string path = doc["path"].GetString();
        bool exists = backend::directory_exists(path);
        send_response(exists ? "true" : "false");
    }
    else if (action == "detect_game_path") {
        std::string detected = backend::detect_game_path();
        send_response("\"" + escape_json_string(detected) + "\"");
    }
    else if (action == "validate_game_path") {
        std::string path = doc.HasMember("path") ? doc["path"].GetString() : "";
        bool valid = backend::validate_game_path(path);
        send_response(valid ? "true" : "false");
    }
}

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam) {
    switch (msg) {
        case WM_SIZE:
            if (g_controller) {
                RECT bounds;
                GetClientRect(hwnd, &bounds);
                g_controller->put_Bounds(bounds);
            }
            return 0;
        
        case WM_WEBVIEW_MSG: {
            std::vector<std::string> msgs;
            {
                std::lock_guard<std::mutex> lock(g_msg_mutex);
                while (!g_msg_queue.empty()) {
                    msgs.push_back(std::move(g_msg_queue.front()));
                    g_msg_queue.pop();
                }
            }
            for (auto& m : msgs) {
                send_to_webview(m);
            }
            return 0;
        }
            
        case WM_DESTROY:
            PostQuitMessage(0);
            return 0;
            
        default:
            return DefWindowProcW(hwnd, msg, wParam, lParam);
    }
}

void init_webview(HWND hwnd) {
    CreateCoreWebView2EnvironmentWithOptions(nullptr, nullptr, nullptr,
        Callback<ICoreWebView2CreateCoreWebView2EnvironmentCompletedHandler>(
            [hwnd](HRESULT result, ICoreWebView2Environment* env) -> HRESULT {
                if (FAILED(result)) return result;
                
                env->CreateCoreWebView2Controller(hwnd,
                    Callback<ICoreWebView2CreateCoreWebView2ControllerCompletedHandler>(
                        [hwnd](HRESULT result, ICoreWebView2Controller* controller) -> HRESULT {
                            if (FAILED(result)) return result;
                            
                            g_controller = controller;
                            controller->get_CoreWebView2(&g_webview);
                            
                            RECT bounds;
                            GetClientRect(hwnd, &bounds);
                            controller->put_Bounds(bounds);
                            
                            ICoreWebView2Settings* settings;
                            g_webview->get_Settings(&settings);
                            settings->put_IsScriptEnabled(TRUE);
                            settings->put_AreDefaultScriptDialogsEnabled(TRUE);
                            settings->put_IsWebMessageEnabled(TRUE);
                            settings->put_AreDevToolsEnabled(TRUE);
                            settings->put_IsStatusBarEnabled(FALSE);
                            
                            g_webview->add_WebMessageReceived(
                                Callback<ICoreWebView2WebMessageReceivedEventHandler>(
                                    [](ICoreWebView2* webview, ICoreWebView2WebMessageReceivedEventArgs* args) -> HRESULT {
                                        LPWSTR message;
                                        args->TryGetWebMessageAsString(&message);
                                        if (message) {
                                            std::wstring ws(message);
                                            handle_message(backend::wstring_to_string(ws));
                                            CoTaskMemFree(message);
                                        }
                                        return S_OK;
                                    }
                                ).Get(), nullptr
                            );
                            
                            std::string exe_dir = backend::get_exe_directory();
                            std::string html_path = exe_dir + "\\ui\\index.html";
                            std::wstring wpath = L"file:///" + backend::string_to_wstring(html_path);
                            std::replace(wpath.begin(), wpath.end(), L'\\', L'/');
                            
                            g_webview->Navigate(wpath.c_str());
                            
                            return S_OK;
                        }
                    ).Get()
                );
                
                return S_OK;
            }
        ).Get()
    );
}

int WINAPI wWinMain(HINSTANCE hInstance, HINSTANCE, PWSTR, int nCmdShow) {
    SetProcessDpiAwarenessContext(DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE_V2);
    CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);
    
    WNDCLASSEXW wc = {};
    wc.cbSize = sizeof(wc);
    wc.style = CS_HREDRAW | CS_VREDRAW;
    wc.lpfnWndProc = WndProc;
    wc.hInstance = hInstance;
    wc.hCursor = LoadCursor(nullptr, IDC_ARROW);
    wc.hbrBackground = CreateSolidBrush(RGB(10, 10, 10));
    wc.lpszClassName = L"BOIII-TOOL";
    wc.hIcon = LoadIconW(hInstance, MAKEINTRESOURCEW(IDI_APP_ICON));
    wc.hIconSm = LoadIconW(hInstance, MAKEINTRESOURCEW(IDI_APP_ICON));
    
    RegisterClassExW(&wc);
    
    int screenWidth = GetSystemMetrics(SM_CXSCREEN);
    int screenHeight = GetSystemMetrics(SM_CYSCREEN);
    int windowWidth = 1600;
    int windowHeight = 900;
    int x = (screenWidth - windowWidth) / 2;
    int y = (screenHeight - windowHeight) / 2;
    
    g_hwnd = CreateWindowExW(
        0,
        L"BOIII-TOOL",
        L"BOIII Tool",
        WS_OVERLAPPEDWINDOW,
        x, y, windowWidth, windowHeight,
        nullptr, nullptr, hInstance, nullptr
    );
    
    if (!g_hwnd) {
        MessageBoxW(nullptr, L"Failed to create window", L"Error", MB_ICONERROR);
        return 1;
    }
    
    ShowWindow(g_hwnd, nCmdShow);
    UpdateWindow(g_hwnd);
    
    init_webview(g_hwnd);
    
    MSG msg;
    while (GetMessage(&msg, nullptr, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }
    
    CoUninitialize();
    return static_cast<int>(msg.wParam);
}
