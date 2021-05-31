use crate::util;

const META_ROWS: usize = 2;
const EMPTY_CHAR: u32 = 32;

pub fn encrypt(text: &str, key: &str) -> String {
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
                let alphabetized_char = util::alphabetize_char(key_chars[j] as u32, true);
                matrix[i][j] = alphabetized_char;

                keys.push((j as u32, alphabetized_char));
            } else {
                let char_index = (i - META_ROWS) + j + ((i - META_ROWS) * (cols - 1));

                if char_index < text_chars.len() {
                    matrix[i][j] = text_chars[char_index] as u32;
                } else {
                    matrix[i][j] = EMPTY_CHAR;
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
            let c = matrix[i as usize][j.0 as usize];
            result += std::str::from_utf8(&[c as u8]).unwrap();
        }
    }
    
    result
}

pub fn decrypt(text: &str, key: &str) -> String {
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
     are filled with the text which will be decrypted.
    */
    for i in 0..rows {
        for j in 0..cols {
            if i == 0 {
                // first row contains the key
                matrix[i][j] = key_chars[j] as u32; 
            } else if i == 1 {
                let alphabetized_char = util::alphabetize_char(key_chars[j] as u32, true);
                matrix[i][j] = alphabetized_char;

                keys.push((j as u32, alphabetized_char));
            }
        }
    }

    // Sort keys by char alphabet value. (Stored at index 1 in the tuple)
    keys.sort_by(|a, b| a.1.cmp(&b.1));

    let mut char_index: usize = 0;

    /*
     Write the columns of the text. Order of writing
     is determined but the key alphabets.
    */
    for j in keys.iter() {
        for i in META_ROWS..rows {
            if char_index < text_chars.len() {
                matrix[i as usize][j.0 as usize] = text_chars[char_index] as u32;
            } else {
                matrix[i as usize][j.0 as usize] = EMPTY_CHAR;
            }

            char_index += 1;
        }
    }

    for i in META_ROWS..rows {
        for j in 0..cols {
            let c = matrix[i as usize][j as usize];
            result += std::str::from_utf8(&[c as u8]).unwrap();
        }
    }

    result
}
