import init, {
    ceasar_cipher,
    ceasar_decipher,
    columnar_transposition_cipher,
    columnar_transposition_decipher,
} from '../pkg/embedo.js';

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

const renderColumnarTranspositionCipher = () => {
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
        break;
    }
    case 'Columnar transposition cipher': {
        renderColumnarTranspositionCipher();
        break;
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

const encrypt_ColumnarTransposition = (encryptionInput) => {
    const encryptionKey = document.getElementById('columnarTranspositionKey').value;
    return columnar_transposition_cipher(encryptionInput, encryptionKey);
};

const decrypt_ColumnarTransposition = (decryptionInput) => {
    const encryptionKey = document.getElementById('columnarTranspositionKey').value;
    return columnar_transposition_decipher(decryptionInput, encryptionKey);
};

const onEncrypt = () => {
    const encryptionInput = document.getElementById('toEncrypt').value;

    let encryptedText = '';

    switch (state.selectedCipher) {
    case 'Ceasar cipher': {
        encryptedText = encrypt_CeasarCipher(encryptionInput);
    }
    case 'Columnar transposition cipher': {
        encryptedText = encrypt_ColumnarTransposition(encryptionInput);
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
