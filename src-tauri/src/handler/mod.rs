mod api;
mod process_message;

use std::{
    io::Write,
    path::PathBuf,
    process::{Child, Command, Stdio},
    thread,
};

pub fn execute_command(path: PathBuf) -> Child {
    Command::new(path)
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .expect("Failed to execute a binary.")
}

#[tauri::command]
pub fn main_handler(app: tauri::AppHandle, path: PathBuf) {
    let mut command = execute_command(path.into());

    let command_stdin = command.stdin.as_mut().expect("Couldn't get STDIN");
    writeln!(command_stdin, "{}", process_message::STARTING_MESSAGE)
        .expect("Couldn't write to STDIN");
    thread::spawn(move || loop {
        let api = api::api_handler(&mut command);
        println!("api: {:?}", api);
        match api {
            Ok(a) => {
                if let Err(e) = a.execute(&app, &mut command) {
                    eprintln!("command execution failed: {:?}", e);
                }
            }
            Err(e) => eprintln!("api error: {:?}", e),
        }
    });
}
