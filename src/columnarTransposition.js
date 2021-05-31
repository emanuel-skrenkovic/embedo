import {
    columnar_transposition_cipher,
    columnar_transposition_decipher
} from '../pkg/embedo.js';

export const CipherName = 'Columnar transposition cipher';

export const encrypt = (encryptionInput) => {
    const encryptionKey = document.getElementById('columnarTranspositionKey').value;
    return columnar_transposition_cipher(encryptionInput, encryptionKey);
};

export const decrypt = (decryptionInput) => {
    const encryptionKey = document.getElementById('columnarTranspositionKey').value;
    return columnar_transposition_decipher(decryptionInput, encryptionKey);
};

export const renderOptions = () => {
    const keyInput = document.createElement('input');

    const keyInputId = 'columnarTranspositionKey';
    keyInput.id = keyInputId;
    keyInput.type = 'text';

    const keyInputLabel = document.createElement('label');
    keyInputLabel.id = 'keyInputLabel';
    keyInputLabel.innerText = 'Key:';
    keyInputLabel.for = keyInputId;

    const optionsDiv = document.getElementById('cipherOptions');
    optionsDiv.appendChild(keyInputLabel);
    optionsDiv.appendChild(keyInput);
};


