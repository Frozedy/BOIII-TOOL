#include "pch.hpp"
#include "verification.hpp"
#include "resource.h"

#define XXH_INLINE_ALL
#include "xxhash.h"

namespace verification {

static bool parse_manifest(const std::string& content,
                           std::map<std::string, Component>& components,
                           std::vector<FileEntry>& files) {
    rapidjson::Document doc;
    if (doc.Parse(content.c_str()).HasParseError()) return false;
    
    components.clear();
    files.clear();
    
    if (doc.HasMember("components") && doc["components"].IsObject()) {
        for (auto& m : doc["components"].GetObject()) {
            Component comp;
            comp.name = m.name.GetString();
            comp.displayName = m.value.HasMember("displayName") ? m.value["displayName"].GetString() : comp.name;
            comp.show = m.value.HasMember("show") ? m.value["show"].GetBool() : true;
            comp.required = m.value.HasMember("required") ? m.value["required"].GetBool() : false;
            comp.defaultEnabled = m.value.HasMember("defaultEnabled") ? m.value["defaultEnabled"].GetBool() : true;
            comp.totalSize = m.value.HasMember("totalSize") ? m.value["totalSize"].GetUint64() : 0;
            components[comp.name] = comp;
        }
    }
    
    if (doc.HasMember("files") && doc["files"].IsArray()) {
        for (auto& f : doc["files"].GetArray()) {
            if (!f.IsArray() || f.Size() < 4) continue;
            FileEntry entry;
            entry.path = f[0].GetString();
            entry.size = f[1].GetUint64();
            entry.hash = f[2].GetString();
            entry.component = f[3].GetString();
            files.push_back(entry);
        }
    }
    
    return true;
}

bool Verifier::load_manifest(const std::string& path) {
    std::ifstream file(path);
    if (!file.is_open()) return false;
    
    std::stringstream buffer;
    buffer << file.rdbuf();
    return parse_manifest(buffer.str(), components_, files_);
}

bool Verifier::load_manifest_from_string(const std::string& json) {
    return parse_manifest(json, components_, files_);
}

bool Verifier::load_manifest_from_resource() {
    HRSRC hRes = FindResourceW(nullptr, MAKEINTRESOURCEW(IDR_VERIFICATION), RT_RCDATA);
    if (!hRes) return false;
    
    HGLOBAL hData = LoadResource(nullptr, hRes);
    if (!hData) return false;
    
    DWORD size = SizeofResource(nullptr, hRes);
    const char* data = static_cast<const char*>(LockResource(hData));
    if (!data || size == 0) return false;
    
    std::string content(data, size);
    return parse_manifest(content, components_, files_);
}

bool Verifier::load_manifest_from_exe_dir() {
    wchar_t exe_path[MAX_PATH];
    GetModuleFileNameW(nullptr, exe_path, MAX_PATH);
    std::wstring ws(exe_path);
    auto pos = ws.find_last_of(L"\\/");
    if (pos != std::wstring::npos) {
        ws = ws.substr(0, pos);
    }
    std::string dir;
    int sz = WideCharToMultiByte(CP_UTF8, 0, ws.c_str(), -1, nullptr, 0, nullptr, nullptr);
    dir.resize(sz - 1);
    WideCharToMultiByte(CP_UTF8, 0, ws.c_str(), -1, &dir[0], sz, nullptr, nullptr);
    
    std::string json_path = dir + "\\verification.json";
    return load_manifest(json_path);
}

VerificationResult Verifier::verify(const std::string& game_path,
                                    const std::vector<std::string>& components,
                                    bool check_hash,
                                    std::function<void(int, int, const std::string&)> progress) {
    VerificationResult result;
    result.verified = 0;
    result.total = 0;
    result.complete = false;
    
    cancelled_ = false;
    paused_ = false;
    
    std::vector<FileEntry> filtered;
    for (const auto& f : files_) {
        if (components.empty() || 
            std::find(components.begin(), components.end(), f.component) != components.end()) {
            filtered.push_back(f);
        }
    }
    
    result.total = static_cast<int>(filtered.size());
    
    for (const auto& f : filtered) {
        if (cancelled_) {
            result.error = "Cancelled";
            return result;
        }
        
        while (paused_ && !cancelled_) {
            std::this_thread::sleep_for(std::chrono::milliseconds(100));
        }
        
        std::string file_path = game_path + "\\" + f.path;
        std::replace(file_path.begin(), file_path.end(), '/', '\\');
        
        if (progress) {
            progress(result.verified, result.total, f.path);
        }
        
        try {
            if (!fs::exists(file_path)) {
                result.missing.push_back(f);
            } else {
                std::error_code ec;
                auto fsize = fs::file_size(file_path, ec);
                if (ec) {
                    CorruptedEntry ce;
                    ce.path = f.path; ce.size = f.size; ce.actual_size = 0;
                    ce.hash = f.hash; ce.actual_hash = ""; ce.component = f.component;
                    ce.reason = "unreadable";
                    result.corrupted.push_back(ce);
                } else if (fsize != f.size) {
                    CorruptedEntry ce;
                    ce.path = f.path; ce.size = f.size; ce.actual_size = fsize;
                    ce.hash = f.hash; ce.actual_hash = ""; ce.component = f.component;
                    ce.reason = "size_mismatch";
                    result.corrupted.push_back(ce);
                } else if (check_hash) {
                    std::string hash = compute_hash(file_path);
                    if (hash != f.hash) {
                        CorruptedEntry ce;
                        ce.path = f.path; ce.size = f.size; ce.actual_size = fsize;
                        ce.hash = f.hash; ce.actual_hash = hash; ce.component = f.component;
                        ce.reason = "hash_mismatch";
                        result.corrupted.push_back(ce);
                    }
                }
            }
        } catch (...) {
            CorruptedEntry ce;
            ce.path = f.path; ce.size = f.size; ce.actual_size = 0;
            ce.hash = f.hash; ce.actual_hash = ""; ce.component = f.component;
            ce.reason = "error";
            result.corrupted.push_back(ce);
        }
        
        result.verified++;
    }
    
    result.complete = true;
    return result;
}

void Verifier::cancel() {
    cancelled_ = true;
    paused_ = false;
}

void Verifier::pause() {
    paused_ = true;
}

void Verifier::resume() {
    paused_ = false;
}

bool Verifier::is_paused() const {
    return paused_;
}

bool Verifier::is_cancelled() const {
    return cancelled_;
}

const std::map<std::string, Component>& Verifier::get_components() const {
    return components_;
}

const std::vector<FileEntry>& Verifier::get_files() const {
    return files_;
}

std::string Verifier::compute_hash(const std::string& file_path) {
    std::ifstream file(file_path, std::ios::binary);
    if (!file.is_open()) return "";
    
    file.seekg(0, std::ios::end);
    auto file_size = static_cast<size_t>(file.tellg());
    file.seekg(0, std::ios::beg);
    
    if (file_size == 0) return "";
    
    XXH3_state_t* state = XXH3_createState();
    if (!state) return "";
    
    XXH3_64bits_reset(state);
    
    constexpr size_t read_buffer_size = 16 * 1024 * 1024; // 16MB
    std::string buffer;
    buffer.resize(read_buffer_size);
    
    auto bytes_to_read = file_size;
    while (bytes_to_read > 0) {
        auto read_size = std::min(bytes_to_read, read_buffer_size);
        file.read(buffer.data(), read_size);
        XXH3_64bits_update(state, buffer.data(), read_size);
        bytes_to_read -= read_size;
    }
    
    auto hash_value = XXH3_64bits_digest(state);
    XXH3_freeState(state);
    
    // Output as uppercase hex in native (little-endian) byte order
    static const char hex[] = "0123456789ABCDEF";
    std::string result;
    result.reserve(16);
    const auto* bytes = reinterpret_cast<const uint8_t*>(&hash_value);
    for (int i = 0; i < 8; i++) {
        result += hex[bytes[i] >> 4];
        result += hex[bytes[i] & 0x0F];
    }
    return result;
}

std::string Verifier::format_size(uint64_t bytes) {
    const char* units[] = {"B", "KB", "MB", "GB", "TB"};
    int unit = 0;
    double size = static_cast<double>(bytes);
    
    while (size >= 1024.0 && unit < 4) {
        size /= 1024.0;
        unit++;
    }
    
    std::stringstream ss;
    ss << std::fixed << std::setprecision(2) << size << " " << units[unit];
    return ss.str();
}

}
