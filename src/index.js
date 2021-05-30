import init, { ceasar_cipher, ceasar_decipher } from "../pkg/embedo.js";

const onEncrypt = () => {
    const encryptTextarea = document.getElementById("toEncrypt");
    const encryptedText = ceasar_cipher(encryptTextarea.value, 1); // TODO: pull n from UI

    document.getElementById("toDecrypt").value = encryptedText;
};

const onDecrypt = () => {
    const decryptTextarea = document.getElementById("toDecrypt");
    const decryptedText = ceasar_decipher(decryptTextarea.value, 1); // TODO: pull n from UI

    document.getElementById("toEncrypt").value = decryptedText;
}

init().then(() => {
    document.getElementById("encryptButton").onclick = onEncrypt;
    document.getElementById("decryptButton").onclick = onDecrypt;
});
