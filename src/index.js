import init, { ceasar_cipher, ceasar_decipher } from '../pkg/embedo.js';

let state = {
    'selectedCipher': ''
};

const clearChildren = (node) => {
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
};

const renderCeasarCipherOptions = () => {
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

const onChangeCipher = (e) => {
    const optionsDiv = document.getElementById('cipherOptions');
    clearChildren(optionsDiv);

    onSelectCipher(e.target.value);
};

const onSelectCipher = (selectedCipher) => {
    state.selectedCipher = selectedCipher;

    switch (state.selectedCipher) {
    case 'Ceasar cipher': {
        renderCeasarCipherOptions();
    }
    }
};

const encrypt_CeasarCipher = (encryptionInput) => {
    const shiftBy = document.getElementById('ceasarShift').value;
    return ceasar_cipher(encryptionInput, shiftBy);
};

const decrypt_CeasarCipher = (decryptionInput) => {
    const shiftBy = document.getElementById('ceasarShift').value;
    return ceasar_decipher(decryptionInput, shiftBy);
};

const onEncrypt = () => {
    const encryptionInput = document.getElementById('toEncrypt').value;

    let encryptedText = '';

    switch (state.selectedCipher) {
    case 'Ceasar cipher': {
        encryptedText = encrypt_CeasarCipher(encryptionInput);
    }
    }

    document.getElementById("toDecrypt").value = encryptedText;
};

const onDecrypt = () => {
    const decryptionInput = document.getElementById('toDecrypt').value;

    let decryptedText = '';

    switch (state.selectedCipher) {
    case 'Ceasar cipher': {
        decryptedText = decrypt_CeasarCipher(decryptionInput);
    }
    }

    document.getElementById('toEncrypt').value = decryptedText;
};

init().then(() => {
    document.getElementById('encryptButton').onclick = onEncrypt;
    document.getElementById('decryptButton').onclick = onDecrypt;

    document.getElementById('cipherSelect').onchange = onChangeCipher;
    onSelectCipher(document.getElementById('cipherSelect')[0].value);
});
