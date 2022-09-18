#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use handler::main_handler;

mod api;
mod handler;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![main_handler])
        .setup(|_| Ok(()))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
