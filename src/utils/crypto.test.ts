import { sha256 } from "js-sha256";
import * as crypto from "./crypto";
import { mnemonicToSeedSync } from "bip39";

const TEST_WALLET = {
  address: "bzxac27b53881650d317c880ae8d120fb7d8b2e160011",
  publicKey: "2243f5a4b0a66b9c40e42bb0855021daf222ec6b8f249aa8eb026366f324100d",
  privateKey: "c2439e5b14d934bb63d573878ce1520479872dbe727f7835ce045225b1bcf60f",
  mnemonic:
    "about anchor parade crash drastic agent tomato behind engine april install inner salon cliff zero window depth long seed sword scene crouch route among",
};

describe("crypto.ts tests", () => {
  it("should return 0096", async () => {
    expect(crypto.generateCharChecksum("abc")).toBe("0096");
  });

  it("should return 0011", async () => {
    expect(crypto.generateCharChecksum(sha256(TEST_WALLET.publicKey))).toBe("0011");
  });

  it("should create a wallet", async () => {
    expect(await crypto.generateWallet(TEST_WALLET.mnemonic)).toStrictEqual(TEST_WALLET);
  });

  it("should create a wallet without passing a passphrase", async () => {
    expect(Object.keys(await crypto.generateWallet())).toStrictEqual(Object.keys(TEST_WALLET));
  });

  it("should get the address from the public key", async () => {
    expect(await crypto.getAddressFromPublicKey(TEST_WALLET.publicKey)).toBe(TEST_WALLET.address);
  });

  it("should get the public and private key from the passphrase", async () => {
    expect(crypto.getPublicAndPrivateKeyFromMnemonic(TEST_WALLET.mnemonic)).toStrictEqual({
      privateKey: TEST_WALLET.privateKey,
      publicKey: TEST_WALLET.publicKey,
    });
  });

  it("should sign the message with a private key string", async () => {
    expect(
      crypto.signMessageWithPrivateKey("my authenticated message", TEST_WALLET.privateKey)
    ).toBe(
      "8d6a9c4fcf3c18ace10205c42e76c62ea96fd77c315744f5364e3968fdb9989b983923d7fa6054b11d1db95c0e214cbec8f3af4bc4b17c873952ec5293155a09"
    );
  });

  it("should sign the message with a private key buffer", async () => {
    const seed = mnemonicToSeedSync(TEST_WALLET.mnemonic);
    const privateKey = seed.slice(32);

    expect(crypto.signMessageWithPrivateKey("my authenticated message", privateKey)).toBe(
      "8d6a9c4fcf3c18ace10205c42e76c62ea96fd77c315744f5364e3968fdb9989b983923d7fa6054b11d1db95c0e214cbec8f3af4bc4b17c873952ec5293155a09"
    );
  });

  it("should generate a correct checksum", async () => {
    expect(crypto.generateSha256Sum("Hello World")).toBe(
      "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
    );
  });
});
