const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const utils = require("ethereum-cryptography/utils");


const MESSAGE = "My Message";
let privateKey = toHex(secp.secp256k1.utils.randomPrivateKey());
let publicKey = toHex(secp.secp256k1.getPublicKey(privateKey));
let hashMessage = toHex(keccak256(utf8ToBytes(MESSAGE)));


function signMessage() {
    return secp.secp256k1.sign(hashMessage, privateKey);
}

function returnHash() {
    return hashMessage;
}

function getSignature() {
    console.log("Private Key: ", privateKey);
    console.log("Public Key: ", publicKey);
    let signatureHex = signMessage().toCompactHex();
    let signatureHexRecovery = signMessage().recovery + signatureHex
    console.log("Encoded Signature: ", signatureHexRecovery);
}

function recoverPublicKey(encodedSignature) {
  let signature = secp.secp256k1.Signature.fromCompact(encodedSignature.slice(1,));
  signature.recovery = Number(encodedSignature.slice(0,1));
  return publicKey = toHex(signature.recoverPublicKey(hashMessage).toRawBytes()) 
}

module.exports = { returnHash, getSignature, recoverPublicKey };