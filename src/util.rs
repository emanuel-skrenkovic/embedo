const LOWER_DIFF: u32 = 32;

pub fn alphabetize_char(c: u32, is_upper: bool) -> u32 {
    /*
    Since ASCII is being used, need to 'alphabetize'
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

pub fn asciify_char(c: u32, is_upper: bool) -> u32 {
    /*
    Since ASCII is being used, need to 'alphabetize'
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
