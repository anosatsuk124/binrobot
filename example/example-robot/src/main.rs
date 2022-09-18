use std::{thread, time};

fn wait_for_starting() {
    loop {
        let mut s = String::new();
        std::io::stdin().read_line(&mut s).unwrap();
        if s.as_str().trim_end() == "STARTED" {
            break;
        }
    }
}

fn main() {
    wait_for_starting();
    loop {
        thread::sleep(time::Duration::from_millis(100));
        println!("MOVE RIGHT 1");
        let mut s = String::new();
        std::io::stdin().read_line(&mut s).unwrap();
        /*
        if s.as_str().trim_end() != "{ success: true }" {
            break;
        }
        */
    }
}
