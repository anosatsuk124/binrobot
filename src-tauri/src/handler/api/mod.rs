use crate::api::command;
use std::{
    io::{BufRead, BufReader},
    process::Child,
    str::FromStr,
};

pub fn api_handler(
    command: &mut Child,
) -> Result<command::CommandAPI, command::CommandAPIParseError> {
    let mut command_stdout = BufReader::new(command.stdout.as_mut().expect("Couldn't get STDOUT"));
    let mut api = String::new();

    command_stdout
        .read_line(&mut api)
        .expect("There is no output");

    command::CommandAPI::from_str(&api.trim_end())
}
