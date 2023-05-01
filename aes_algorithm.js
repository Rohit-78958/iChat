/*sample code the understand the working*/

// Import the required modules
const CryptoJS = require("crypto-js");

// Define the key and initialization vector
const key = CryptoJS.enc.Hex.parse("0123456789abcdef0123456789abcdef");
const iv = CryptoJS.enc.Hex.parse("abcdef9876543210abcdef9876543210");

// Define the message to be encrypted
const message = "Hello, world!";

// Encrypt the message using AES-CBC
const ciphertext = CryptoJS.AES.encrypt(message, key, { iv: iv, mode: CryptoJS.mode.CBC }).toString();

// Print the encrypted message
console.log("Ciphertext:", ciphertext);

// Decrypt the message using the same key and IV
const decryptedMessage = CryptoJS.AES.decrypt(ciphertext, key, { iv: iv, mode: CryptoJS.mode.CBC }).toString(CryptoJS.enc.Utf8);

// Print the decrypted message
console.log("Decrypted message:", decryptedMessage);
