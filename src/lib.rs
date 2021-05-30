//#![no_std] // TODO: try without std

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: &str);
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    pub fn log_u32(a: u32);
}

const LOWER_DIFF: u32 = 32;

#[wasm_bindgen]
pub fn ceasar_cipher(text: &str, n: u32) -> String {
    let mut result: String = String::new();

    for c in text.chars() {
        let is_upper = c.is_uppercase();

        let encrypted = (normalize_char(c as u32, is_upper) + n) % 26;
        result += std::str::from_utf8(&[asciify_char(encrypted, is_upper) as u8]).unwrap();
    }

    result
}

#[wasm_bindgen]
pub fn ceasar_decipher(text: &str, n: u32) -> String {
    let mut result: String = String::new();

    for c in text.chars() {
        let is_upper = c.is_uppercase();
        
        let deciphered = (normalize_char(c as u32, is_upper) - n) % 26;
        result += std::str::from_utf8(&[asciify_char(deciphered, is_upper) as u8]).unwrap();
    }

    result
}

fn normalize_char(c: u32, is_upper: bool) -> u32 {
    /*
     Since ASCII is being used, need to 'normalize'
     the char. In ASCII, lowercase characters are higher in
     number by 32 from their uppercase equivalents.
    */
    let diff = if is_upper { 0 } else { LOWER_DIFF };

    /*
     In ASCII, letters start at 65 so we subtract it
     (along with the diff above) to get to the 0-26 range.
    */
    c - diff - 65
}

fn asciify_char(c: u32, is_upper: bool) -> u32 {
    /*
    Since ASCII is being used, need to 'normalize'
    the char. In ASCII, lowercase characters are higher in
    number by 32 from their uppercase equivalents.
     */
    let diff = if is_upper { 0 } else { LOWER_DIFF };

    /*
     This time we simply reverse the 'normalization' operation.
     Add up 65 and the diff to the char to get back to the
     ASCII range with correct capitalization.
    */
    c + 65 + diff
}
