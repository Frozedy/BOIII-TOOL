#pragma once
#include "pch.hpp"

namespace verification {

struct Component {
    std::string name;
    std::string displayName;
    bool show;
    bool required;
    bool defaultEnabled;
    uint64_t totalSize;
};

struct FileEntry {
    std::string path;
    uint64_t size;
    std::string hash;
    std::string component;
};

struct CorruptedEntry {
    std::string path;
    uint64_t size;
    uint64_t actual_size;
    std::string hash;
    std::string actual_hash;
    std::string component;
    std::string reason; // "size_mismatch" or "hash_mismatch"
};

struct VerificationResult {
    std::vector<FileEntry> missing;
    std::vector<CorruptedEntry> corrupted;
    std::vector<std::string> extra;
    int verified;
    int total;
    bool complete;
    std::string error;
};

class Verifier {
public:
    bool load_manifest(const std::string& path);
    bool load_manifest_from_string(const std::string& json);
    bool load_manifest_from_resource();
    bool load_manifest_from_exe_dir();
    
    VerificationResult verify(const std::string& game_path, 
                              const std::vector<std::string>& components,
                              bool check_hash,
                              std::function<void(int, int, const std::string&)> progress);
    
    void cancel();
    void pause();
    void resume();
    bool is_paused() const;
    bool is_cancelled() const;
    
    const std::map<std::string, Component>& get_components() const;
    const std::vector<FileEntry>& get_files() const;
    
    static std::string compute_hash(const std::string& file_path);
    static std::string format_size(uint64_t bytes);
    
private:
    std::map<std::string, Component> components_;
    std::vector<FileEntry> files_;
    std::atomic<bool> cancelled_{false};
    std::atomic<bool> paused_{false};
    std::mutex mutex_;
};

}
