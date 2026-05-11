mod commands;
mod models;
mod scanner;

use commands::{check_docker_available, scan_project};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![scan_project, check_docker_available])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
