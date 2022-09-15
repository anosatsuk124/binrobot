#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod api;
mod handler;

use std::path::Path;

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            app.listen_global("execCommandPath", |event| {
                println!("an executable command path: {:?}", event.payload());
                if let Some(path) = event.payload() {
                    handler::main_handler(Path::new(path));
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
