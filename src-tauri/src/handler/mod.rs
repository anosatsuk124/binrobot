mod api;

use std::{
    path::{Path, PathBuf},
    process::{Child, Command, Stdio},
};

pub fn execute_command(path: PathBuf) -> Child {
    Command::new(path)
        .stderr(Stdio::piped())
        .spawn()
        .expect("Failed to execute a binary.")
}

pub fn main_handler(path: &Path) {
    let command = execute_command(path.into());
}
