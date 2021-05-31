import {
    columnar_transposition_encrypt,
    columnar_transposition_decrypt
} from '../pkg/embedo.js';

export const CipherName = 'Columnar transposition cipher';

export const encrypt = (encryptionInput) => {
    const encryptionKey = document.getElementById('columnarTranspositionKey').value;
    return columnar_transposition_encrypt(encryptionInput, encryptionKey);
};

export const decrypt = (decryptionInput) => {
    const encryptionKey = document.getElementById('columnarTranspositionKey').value;
    return columnar_transposition_decrypt(decryptionInput, encryptionKey);
};

export const renderOptions = (optionsDiv) => {
    const keyInput = document.createElement('input');

    const keyInputId = 'columnarTranspositionKey';
    keyInput.id = keyInputId;
    keyInput.type = 'text';

    const keyInputLabel = document.createElement('label');
    keyInputLabel.id = 'keyInputLabel';
    keyInputLabel.innerText = 'Key:';
    keyInputLabel.for = keyInputId;
    keyInputLabel.classList.add('padded');

    optionsDiv.appendChild(keyInputLabel);
    optionsDiv.appendChild(keyInput);
};


