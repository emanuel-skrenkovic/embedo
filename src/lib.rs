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
    let mut result = String::new();

    for c in text.chars() {
        let is_upper = c.is_uppercase();

        let encrypted = (normalize_char(c as u32, is_upper) + n) % 26;
        result += std::str::from_utf8(&[asciify_char(encrypted, is_upper) as u8]).unwrap();
    }

    result
}

#[wasm_bindgen]
pub fn ceasar_decipher(text: &str, n: u32) -> String {
    let mut result = String::new();

    for c in text.chars() {
        let is_upper = c.is_uppercase();
        
        let deciphered = (normalize_char(c as u32, is_upper) - n) % 26;
        result += std::str::from_utf8(&[asciify_char(deciphered, is_upper) as u8]).unwrap();
    }

    result
}

const META_ROWS: usize = 2;

#[wasm_bindgen]
pub fn columnar_transposition_cipher(text: &str, key: &str) -> String {
    let mut result = String::new();

    let cols = key.len();

    let required_rows = text.len() as f32 / cols as f32;
    let rows = META_ROWS + (required_rows as f32).ceil() as usize;

    let mut matrix = vec![vec![32; cols]; rows];

    let key_chars: Vec<char> = key.to_uppercase().chars().collect();
    let text_chars: Vec<char> = text.chars().collect();

    /*
     Keys vec contains tuple consisted of the alphabetized value
     of the key char and its index. Later we sort by the alphabetized
     value to get the column reading order.
    */
    let mut keys: Vec<(u32, u32)> = vec![];

    /*
     Fill up the matrix.
     First row contains the key. Second row contains
     the order of alphabets in the key. Rest of the rows
     are filled with the text which will be encrypted.
    */
    for i in 0..rows {
        for j in 0..cols {
            if i == 0 {
                // first row contains the key
                matrix[i][j] = key_chars[j] as u32; 
            } else if i == 1 {
                let alphabetized_char = normalize_char(key_chars[j] as u32, true);
                matrix[i][j] = alphabetized_char;
                keys.push((j as u32, alphabetized_char));
            } else {
                let char_index = (i - META_ROWS) + j + ((i - META_ROWS) * (cols - 1));
                if char_index < text_chars.len() {
                    matrix[i][j] = text_chars[char_index] as u32;
                } else {
                    matrix[i][j] = 32; // 95 == ' '
                }
            }
        }
    }

    // Sort keys by char alphabet value. (Stored at index 1 in the tuple)
    keys.sort_by(|a, b| a.1.cmp(&b.1));

    /*
     Read the columns of the text. Order of reading
     is determined but the key alphabets.
    */
    for j in keys.iter() {
        for i in META_ROWS..rows {
            log_u32(j.0);
            let c = matrix[i as usize][j.0 as usize];
            result += std::str::from_utf8(&[c as u8]).unwrap();
        }
    }
    
    result
}

#[wasm_bindgen]
pub fn columnar_transposition_decipher(text: &str, key: &str) -> String {
    todo!();
    /*
    let mut result = String::new();
    result
    */
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
