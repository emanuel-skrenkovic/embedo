import { ceasar_cipher, ceasar_decipher } from '../pkg/embedo.js';

export const CipherName = 'Ceasar cipher';

export const renderOptions = () => {
    const shiftInput = document.createElement('input');

    const shiftInputId = 'ceasarShift';
    shiftInput.id = shiftInputId;
    shiftInput.type = 'number';
    shiftInput.value = 1;

    const shiftLabel = document.createElement('label');
    shiftLabel.id = 'shiftLabel';
    shiftLabel.innerText = 'Shift by:';
    shiftLabel.for = shiftInputId;

    const optionsDiv = document.getElementById('cipherOptions');
    optionsDiv.appendChild(shiftLabel);
    optionsDiv.appendChild(shiftInput);
};

export const encrypt = (encryptionInput) => {
    const shiftBy = document.getElementById('ceasarShift').value;
    return ceasar_cipher(encryptionInput, shiftBy);
};

export const decrypt = (decryptionInput) => {
    const shiftBy = document.getElementById('ceasarShift').value;
    return ceasar_decipher(decryptionInput, shiftBy);
};
