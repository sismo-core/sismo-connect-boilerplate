# sismoConnect Boilerplate Repository

This repository contains several examples on how to use sismoConnect packages to build a Sismo Connect application. You will find code examples to easily request proofs from your users and verify them on-chain or off-chain using Sismo Connect.

## Table of Contents

- [Overview](#overview)
- [Off-Chain Examples](#off-chain-examples)
- [On-Chain Examples](#on-chain-examples)
- [Usage](#usage)

## Overview

This repository contains two sets of examples:

1. Off-chain examples: These examples use the backend for verification.
2. On-chain examples: These examples use Solidity smart contracts for verification.

You can find the documentation of Sismo Connect [here](https://docs.sismo.io/technical-documentation/sismo-connect).

## Off chain examples

- Simple Vault Authentication:
  [frontend](./src/pages/off-chain/simple-auth.tsx) / [backend](./src/pages/api/verify-simple-auth.ts)

- Simple Claim:
  [frontend](./src/pages/off-chain/simple-claim.tsx) / [backend](./src/pages/api/verify-simple-claim.ts)

- One Claim and One Vault Authentication:
  [frontend](./src/pages/off-chain/auth-and-claim.tsx) / [backend](./src/pages/api/verify-auth-and-claim.ts)

- One Claim, multiple claims (with one optional) and one signature:
  [frontend](./src/pages/off-chain/two-auths-claim-and-signature.tsx) / [backend](./src/pages/api/verify-two-auths-claim-and-signature.ts)

## On chain examples

- Simple Vault authentication:
  [frontend](./src/pages/on-chain/simple-auth.tsx) / [contract](./contracts/src/SimpleAuth.sol)

- Simple Claim:
  [frontend](./src/pages/on-chain/simple-claim.tsx) / [contract](./contracts/src/SimpleClaim.sol)

- One Claim and One Vault Authentication:
  [frontend](./src/pages/on-chain/auth-and-claim.tsx) / [contract](./contracts/src/AuthAndClaim.sol)

- One Claim, multiple claims (with one optional) and one signature:
  [frontend](./src/pages/on-chain/two-auths-and-claim.tsx) / [contract](./contracts/src/TwoAuthsAndClaim.sol)

## Usage

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) >= 18.15.0 (Latest LTS version)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Foundry](https://book.getfoundry.sh/)

### Install dependencies

```bash
# install frontend / backend dependencies
yarn

# install contract dependencies with Forge
forge install
```

### Start your local Next.js app

```bash
yarn dev
```

The frontend is now available on http://localhost:3001/

### Deploy your contracts on a local blockchain forking Goerli

```bash
# start a local blockchain with goerli fork
anvil --fork-url https://rpc.ankr.com/eth_goerli

# deploy your contracts
yarn deploy-local
```

You can now use the frontend to interact with your local contracts.

### Run contract tests

sismoConnectVerifier contracts are currently deployed on Goerli and Mumbai.
You can find the deployed addresses [here](https://docs.sismo.io/sismo-docs/technical-documentation/sismo-101).

```bash
## Run fork test with goerli
forge test --fork-url https://rpc.ankr.com/eth_goerli

## Run fork test with mumbai
forge test --fork-url https://polygon-mumbai.g.alchemy.com/v2/API_KEY

# you can aslo use the rpc url you want by passing an environment variable
forge test --fork-url $RPC_URL
```
