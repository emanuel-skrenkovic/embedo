use crate::util;

pub fn encrypt(text: &str, n: u32) -> String {
    let mut result = String::new();

    for c in text.chars() {
        let is_upper = c.is_uppercase();

        let encrypted = (util::alphabetize_char(c as u32, is_upper) + n) % 26;
        result += std::str::from_utf8(&[util::asciify_char(encrypted, is_upper) as u8]).unwrap();
    }

    result
}

pub fn decrypt(text: &str, n: u32) -> String {
    let mut result = String::new();

    for c in text.chars() {
        let is_upper = c.is_uppercase();
        
        let deciphered = (util::alphabetize_char(c as u32, is_upper) - n) % 26;
        result += std::str::from_utf8(&[util::asciify_char(deciphered, is_upper) as u8]).unwrap();
    }

    result
}

