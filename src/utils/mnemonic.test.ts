import * as mnemonic from "./mnemonic";

const VALID_PASSPHRASE =
  "about anchor parade crash drastic agent tomato behind engine april install inner salon cliff zero window depth long seed sword scene crouch route among";

describe("mnemonic.ts tests", () => {
  it("should generate a 24 word passphrase", async () => {
    expect(mnemonic.generateMnemonic().split(" ").length).toBe(24);
  });

  it("should fail the passphrase validation", async () => {
    const badPassphrase = "one two three";
    expect(mnemonic.validateMnemonic(badPassphrase)).toBe(false);
  });

  it("should pass the passphrase validation", async () => {
    expect(mnemonic.validateMnemonic(VALID_PASSPHRASE)).toBe(true);
  });
});
