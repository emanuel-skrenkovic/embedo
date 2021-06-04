import { ceasar_cipher_encrypt, ceasar_cipher_decrypt } from './embedo.js';

export const CipherName = 'Ceasar cipher';

export const renderOptions = (optionsDiv) => {
    const shiftInput = document.createElement('input');

    const shiftInputId = 'ceasarShift';
    shiftInput.id = shiftInputId;
    shiftInput.type = 'number';
    shiftInput.value = 1;
    shiftInput.min = 1;

    const shiftLabel = document.createElement('label');
    shiftLabel.id = 'shiftLabel';
    shiftLabel.innerText = 'Shift by:';
    shiftLabel.for = shiftInputId;
    shiftLabel.classList.add('padded');

    optionsDiv.appendChild(shiftLabel);
    optionsDiv.appendChild(shiftInput);
};

export const encrypt = (encryptionInput) => {
    const shiftBy = document.getElementById('ceasarShift').value;
    return ceasar_cipher_encrypt(encryptionInput, shiftBy);
};

export const decrypt = (decryptionInput) => {
    const shiftBy = document.getElementById('ceasarShift').value;
    return ceasar_cipher_decrypt(decryptionInput, shiftBy);
};
