import init from '../pkg/embedo.js';
import * as ceasarCipher from './ceasarCipher.js';
import * as columnarTransposition from './columnarTransposition.js';

let state = {
    'selectedCipher': '',
    'toEncryptInput': document.getElementById('toEncrypt'),
    'toDecryptInput': document.getElementById('toDecrypt'),
    'cipherOptionsDiv': document.getElementById('cipherOptions')
};

const clearChildren = (node) => {
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
};

const onClickClear = () => {
    clearInputs();
};

const clearInputs = () => {
    state.toEncryptInput.value = '';
    state.toDecryptInput.value = '';
};

const onChangeCipher = (e) => {
    clearChildren(state.cipherOptionsDiv);
    clearInputs();

    onSelectCipher(e.target.value);
};

const onSelectCipher = (selectedCipher) => {
    state.selectedCipher = selectedCipher;

    switch (state.selectedCipher) {
    case ceasarCipher.CipherName: {
        ceasarCipher.renderOptions(state.cipherOptionsDiv);
        break;
    }
    case columnarTransposition.CipherName: {
        columnarTransposition.renderOptions(state.cipherOptionsDiv);
        break;
    }
    }
};

const onEncrypt = () => {
    const encryptionInput = state.toEncryptInput.value;

    let encryptedText = '';

    switch (state.selectedCipher) {
    case ceasarCipher.CipherName: {
        encryptedText = ceasarCipher.encrypt(encryptionInput);
        break;
    }
    case columnarTransposition.CipherName: {
        encryptedText = columnarTransposition.encrypt(encryptionInput);
        break;
    }
    }

    state.toDecryptInput.value = encryptedText;
};

const onDecrypt = () => {
    const decryptionInput = state.toDecryptInput.value;

    let decryptedText = '';

    switch (state.selectedCipher) {
    case ceasarCipher.CipherName: {
        decryptedText = ceasarCipher.decrypt(decryptionInput);
        break;
    }
    case columnarTransposition.CipherName: {
        decryptedText = columnarTransposition.decrypt(decryptionInput);
        break;
    }
    }

    state.toEncryptInput.value = decryptedText;
};

init().then(() => {
    document.getElementById('encryptButton').onclick = onEncrypt;
    document.getElementById('decryptButton').onclick = onDecrypt;

    document.getElementById('clearButton').onclick = onClickClear;

    document.getElementById('cipherSelect').onchange = onChangeCipher;
    onSelectCipher(document.getElementById('cipherSelect')[0].value);
});
