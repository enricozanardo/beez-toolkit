import * as ed from "@noble/ed25519";
import { mnemonicToSeedSync } from "bip39";
import { sha256 } from "js-sha256";
import { sha512 } from "@noble/hashes/sha512";
import { generateMnemonic } from "./mnemonic";

/** polyfill required for browser usage */
ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

export const getPublicAndPrivateKeyFromMnemonic = (mnemonic: string) => {
  const seed = mnemonicToSeedSync(mnemonic);

  const privateKey = seed.slice(32);
  const publicKey = ed.getPublicKey(privateKey);

  return {
    publicKey: ed.etc.bytesToHex(publicKey),
    privateKey: ed.etc.bytesToHex(privateKey),
  };
};

export const generateCharChecksum = (characters: string): string => {
  let cks = 0;

  for (let i = 0; i < characters.length; i++) {
    const unicode_char = characters.charCodeAt(i);
    cks ^= unicode_char;
  }

  const checksum = cks.toString().padStart(4, "0");
  return checksum;
};

export const getAddressFromPublicKey = async (publicKeyHex: string) => {
  const publicKeyHash = sha256(publicKeyHex);
  const charHash = generateCharChecksum(publicKeyHash);

  return `bzx${publicKeyHash.slice(0, 38)}${charHash}`;
};

export const generateWallet = async (mnemonicInput?: string) => {
  const mnemonic = mnemonicInput ?? generateMnemonic();

  const { publicKey, privateKey } = getPublicAndPrivateKeyFromMnemonic(mnemonic);
  const address = await getAddressFromPublicKey(publicKey);

  return {
    address,
    publicKey,
    privateKey,
    mnemonic,
  };
};

export const signMessageWithPrivateKey = (
  messageInput: Buffer | string,
  privateKeyInput: string | Buffer
) => {
  const privateKey =
    typeof privateKeyInput === "string" ? ed.etc.hexToBytes(privateKeyInput) : privateKeyInput;

  const message = typeof messageInput === "string" ? Buffer.from(messageInput) : messageInput;

  const signature = ed.sign(message, privateKey);

  return ed.etc.bytesToHex(signature);
};

export const generateSha256Sum = (input: any) => {
  return sha256(input);
};
