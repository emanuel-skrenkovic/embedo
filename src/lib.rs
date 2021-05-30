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
#[no_mangle]
pub fn ceasar_cipher(text: &str, n: u32) -> String {
    let mut result: String = String::new();

    for c in text.chars() {
        let diff = if c.is_uppercase() { 0 } else { LOWER_DIFF };

        let ascii_char = c as u32;
        let enciphered = (ascii_char + n - diff - 65) % 26;

        let encrypted_ascii_char = enciphered as u8 + 65 + diff as u8;
        result += std::str::from_utf8(&[encrypted_ascii_char]).unwrap();
    }

    result
}

#[wasm_bindgen]
#[no_mangle]
pub fn ceasar_decipher(text: &str, n: u32) -> String {
    let mut result: String = String::new();

    for c in text.chars() {
        let diff = if c.is_uppercase() { 0 } else { LOWER_DIFF };

        let deciphered = (c as u32 - n - diff - 65) % 26;

        let deciphered_ascii_char = deciphered as u8 + 65 + diff as u8;
        result += std::str::from_utf8(&[deciphered_ascii_char]).unwrap();
    }

    result
}
