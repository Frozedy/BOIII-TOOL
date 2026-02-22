#pragma once
#include "pch.hpp"
#include "verification.hpp"

namespace backend {

std::string browse_folder(const std::string& title);
std::string browse_file(const std::string& title, const std::string& filter);
bool create_directory(const std::string& path);
bool delete_directory(const std::string& path);
bool file_exists(const std::string& path);
bool directory_exists(const std::string& path);
std::vector<std::string> list_directory(const std::string& path);
std::string read_file(const std::string& path);
bool write_file(const std::string& path, const std::string& content);
bool delete_file(const std::string& path);
uint64_t get_file_size(const std::string& path);
std::string get_file_hash(const std::string& path);

void open_url(const std::string& url);
void open_folder(const std::string& path);
void copy_to_clipboard(const std::string& text);
std::string get_clipboard();

bool check_port(int port);
bool open_firewall_port(int port, const std::string& name);
bool run_as_admin(const std::string& exe, const std::string& args);
bool run_process(const std::string& exe, const std::string& args, bool wait);

std::string create_server_config(const std::string& game_path,
                                  const std::string& server_name,
                                  const std::string& map,
                                  const std::string& mode,
                                  int max_players,
                                  int port,
                                  const std::string& password,
                                  bool hardcore,
                                  bool dedicated);

struct RemovalResult {
    bool success;
    std::vector<std::string> deleted_files;
    std::vector<std::string> deleted_dirs;
    std::vector<std::string> failed;
    std::string error;
};

RemovalResult remove_boiii(const std::string& game_path);

std::string get_exe_directory();
std::string get_data_path();
std::string wstring_to_string(const std::wstring& wstr);
std::wstring string_to_wstring(const std::string& str);
std::string detect_game_path();
bool validate_game_path(const std::string& path);

}
