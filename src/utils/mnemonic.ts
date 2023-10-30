import * as bip39 from "bip39";

export const generateMnemonic = (strength = 256) => {
  return bip39.generateMnemonic(strength);
};

export const validateMnemonic = (mnemonic: string) => {
  return bip39.validateMnemonic(mnemonic);
};
