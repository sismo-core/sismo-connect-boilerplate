## sismoConnect boilerplate repository

This repository contains several examples on how to use sismoConnect packages to build a sismoConnect application.
You can find the documentation of sismoConnect [here](https://docs.sismo.io/technical-documentation/sismo-connect).

Here are the path to the different examples:

### Off chain examples

- Simple Vault Authentication:
  [frontend](./src/pages/off-chain/simple-auth.tsx) / [backend](./src/pages/api/verify-simple-auth.ts)

- Simple Claim: 
  [frontend](./src/pages/off-chain/simple-claim.tsx) / [backend](./src/pages/api/verify-simple-claim.ts)

- One Claim and One Vault Authentication:
  [frontend](./src/pages/off-chain/auth-and-claim.tsx) / [backend](./src/pages/api/verify-auth-and-claim.ts)

- One Claim, multiple claims (with one optional) and one signature:
  [frontend](./src/pages/off-chain/two-auths-claim-and-signature.tsx) / [backend](./src/pages/api/verify-two-auths-claim-and-signature.ts)


### On chain examples

- Simple Vault authentication:
  [frontend](./src/pages/on-chain/simple-auth.tsx) / [contract](./contracts/src/SimpleAuth.sol)

- Simple Claim:
  [frontend](./src/pages/on-chain/simple-claim.tsx) / [contract](./contracts/src/SimpleClaim.sol)

- One Claim and One Vault Authentication:
  [frontend](./src/pages/on-chain/auth-and-claim.tsx) / [contract](./contracts/src/AuthAndClaim.sol)

- One Claim, multiple claims (with one optional) and one signature:
  [frontend](./src/pages/on-chain/two-auths-and-claim.tsx) / [contract](./contracts/src/TwoAuthsAndClaim.sol)


## Usage

### Install dependencies

```bash
yarn
```

### Start frontend

```bash
yarn dev
```

The frontend is now available on http://localhost:3000/

### Run contract tests

sismoConnectVerifier contracts are currently deployed on goerli and mumbai.
You can find the deployed addresses [here](https://docs.sismo.io/sismo-docs/technical-documentation/sismo-101) 

```bash
cd contracts

## Run fork test with goerli
forge test --fork-url https://rpc.ankr.com/eth_goerli

## Run fork test with mumbai
forge test --fork-url https://polygon-mumbai.g.alchemy.com/v2/API_KEY 
```
