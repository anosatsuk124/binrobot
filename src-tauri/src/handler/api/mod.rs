use crate::api::command;
use std::{
    io::{BufRead, BufReader},
    process::Child,
    str::FromStr,
};

pub fn api_handler(command: Child) -> Result<command::CommandAPI, command::CommandAPIParseError> {
    let mut command_stdout = BufReader::new(command.stdout.expect("Couldn't get STDOUT"));
    let mut api = String::new();

    command_stdout
        .read_line(&mut api)
        .expect("There is no STDOUT");

    command::CommandAPI::from_str(&api)
}
