# Beez Toolkit

![CI Badge](https://github.com/enricozanardo/beez-toolkit/actions/workflows/main.yml/badge.svg)

Toolkit for the Beez frontend application.

## Installation

```sh
npm i @stellab/beez-toolkit
```

## Usage

```ts
import { generateWallet, signMessageWithPrivateKey } from "@stellab/beez-toolkit";

const wallet = await generateWallet();
console.log(wallet);
// =>   {
//        mnemonic: "about anchor parade crash drastic agent tomato behind engine april install inner salon cliff zero window depth long seed sword scene crouch route among",
//        address: "bzxac27b53881650d317c880ae8d120fb7d8b2e160011",
//        publicKey: "2243f5a4b0a66b9c40e42bb0855021daf222ec6b8f249aa8eb026366f324100d",
//        privateKey: "c2439e5b14d934bb63d573878ce1520479872dbe727f7835ce045225b1bcf60f",
//      };

const signature = signMessageWithPrivateKey(
  "my authenticated message",
  "c2439e5b14d934bb63d573878ce1520479872dbe727f7835ce045225b1bcf60f" // Uint8Array is accepted as well
);
console.log(signature);
// => "8d6a9c4fcf3c18ace10205c42e76c62ea96fd77c315744f5364e3968fdb9989b983923d7fa6054b11d1db95c0e214cbec8f3af4bc4b17c873952ec5293155a09"
```

## Package Contents

### Mnemonic Utils

- `generateMnemonic`
- `validateMnemonic`

### Crypto utils

- `getPublicAndPrivateKeyFromMnemonic`
- `getAddressFromPublicKey`
- `generateCharChecksum`
- `generateWallet`
- `signMessageWithPrivateKey`
- `generateSha256Sum`

## Build locally

```sh
git clone https://github.com/enricozanardo/beez-toolkit
cd beez-toolkit
npm ci
npm run build
```

## Run test suite

```sh
npm run test
# npm run test:watch
# npm run test:coverage
```

## License

[AGPL-3.0](LICENSE)
