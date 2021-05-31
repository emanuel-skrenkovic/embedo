pub mod util;

mod ceasar_cipher;
mod columnar_transposition;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn ceasar_cipher_encrypt(text: &str, n: u32) -> String {
    ceasar_cipher::encrypt(text, n)
}

#[wasm_bindgen]
pub fn ceasar_cipher_decrypt(text: &str, n: u32) -> String {
    ceasar_cipher::decrypt(text, n)
}

#[wasm_bindgen]
pub fn columnar_transposition_encrypt(text: &str, key: &str) -> String {
    columnar_transposition::encrypt(text, key)
}

#[wasm_bindgen]
pub fn columnar_transposition_decrypt(text: &str, key: &str) -> String {
    columnar_transposition::decrypt(text, key)
}
