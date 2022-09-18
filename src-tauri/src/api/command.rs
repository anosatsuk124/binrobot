use std::{io::Write, process::Child, str::FromStr};

use serde::{Deserialize, Serialize};
use tauri::Manager;

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub enum CommandAPI {
    Move { direction: Direction, velocity: f64 },
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub enum Direction {
    #[serde(rename = "left")]
    Left,
    #[serde(rename = "right")]
    Right,
    #[serde(rename = "up")]
    Up,
    #[serde(rename = "down")]
    Down,
}

impl CommandAPI {
    pub fn execute(self, app: &tauri::AppHandle, command: &mut Child) -> tauri::Result<()> {
        match self {
            Self::Move {
                direction,
                velocity,
            } => {
                app.emit_all(
                    "command-api-move",
                    Self::Move {
                        direction,
                        velocity,
                    },
                )?;

                let command_stdin = command.stdin.as_mut().expect("Couldn't get STDIN");
                writeln!(command_stdin, "{{ success: true }}").expect("Couldn't write to STDIN");
            }
        }

        Ok(())
    }
}

#[derive(Debug)]
pub struct CommandAPIParseError;

impl FromStr for CommandAPI {
    type Err = CommandAPIParseError;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut command = s.split(' ').into_iter();

        match command.next() {
            Some("MOVE") => {
                let direction = if let Some(d) = command.next() {
                    Direction::from_str(d)?
                } else {
                    return Err(CommandAPIParseError);
                };

                let velocity = if let Some(v) = command.next() {
                    match v.parse::<f64>() {
                        Ok(v) => v,
                        Err(_) => return Err(CommandAPIParseError),
                    }
                } else {
                    return Err(CommandAPIParseError);
                };

                Ok(Self::Move {
                    direction,
                    velocity,
                })
            }
            _ => Err(CommandAPIParseError),
        }
    }
}

impl FromStr for Direction {
    type Err = CommandAPIParseError;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "LEFT" => Ok(Direction::Left),
            "RIGHT" => Ok(Direction::Right),
            "UP" => Ok(Direction::Up),
            "DOWN" => Ok(Direction::Down),
            _ => Err(CommandAPIParseError),
        }
    }
}
