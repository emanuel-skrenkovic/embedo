import init from '../pkg/embedo.js';
import * as ceasarCipher from './ceasarCipher.js';
import * as columnarTransposition from './columnarTransposition.js';

let state = {
    'selectedCipher': ''
};

const clearChildren = (node) => {
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
};

const onChangeCipher = (e) => {
    const optionsDiv = document.getElementById('cipherOptions');
    clearChildren(optionsDiv);

    onSelectCipher(e.target.value);
};

const onSelectCipher = (selectedCipher) => {
    state.selectedCipher = selectedCipher;

    switch (state.selectedCipher) {
    case ceasarCipher.CipherName: {
        ceasarCipher.renderOptions();
        break;
    }
    case columnarTransposition.CipherName: {
        columnarTransposition.renderOptions();
        break;
    }
    }
};

const onEncrypt = () => {
    const encryptionInput = document.getElementById('toEncrypt').value;

    let encryptedText = '';

    switch (state.selectedCipher) {
    case ceasarCipher.CipherName: {
        encryptedText = ceasarCipher.encrypt(encryptionInput);
    }
    case columnarTransposition.CipherName: {
        encryptedText = columnarTransposition.encrypt(encryptionInput);
    }
    }

    document.getElementById("toDecrypt").value = encryptedText;
};

const onDecrypt = () => {
    const decryptionInput = document.getElementById('toDecrypt').value;

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

    document.getElementById('toEncrypt').value = decryptedText;
};

init().then(() => {
    document.getElementById('encryptButton').onclick = onEncrypt;
    document.getElementById('decryptButton').onclick = onDecrypt;

    document.getElementById('cipherSelect').onchange = onChangeCipher;
    onSelectCipher(document.getElementById('cipherSelect')[0].value);
});
