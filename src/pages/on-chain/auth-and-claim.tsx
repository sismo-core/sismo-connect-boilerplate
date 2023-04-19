import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import {
  AuthType,
  SismoConnectButton,
  SismoConnectClientConfig,
} from "@sismo-core/sismo-connect-react";
import { useState } from "react";
import { ethers } from "ethers";
import { ResponseBytes } from "@/components/ResponseBytes";
import { abi as AuthAndClaimABI } from "../../../abi/AuthAndClaim.json";
import { transactions as AuthAndClaimTransactions } from "../../../broadcast/01_AuthAndClaim.s.sol/80001/run-latest.json";

export const sismoConnectConfig: SismoConnectClientConfig = {
  appId: "0x112a692a2005259c25f6094161007967",
  devMode: {
    // enable or disable dev mode here to create development groups and use the development vault.
    // when using a testnet, you need to enable dev mode to have the correct commitment mapper public key
    enabled: true,
  },
};

// setup the provider and signer to interact with the contract deployed on a local fork
const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const signer = new ethers.Wallet(
  "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
).connect(provider);

export default function OnChainAuthAndClaim() {
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [responseBytes, setResponseBytes] = useState(null);
  const verify = async (responseBytes: string) => {
    setVerifying(true);
    setResponseBytes(responseBytes);
    // contract address of the AuthAndClaim contract on the local anvil fork network
    // this contractAddress should be replaced with the correct address if the contract is deployed on a different network
    const contractAddress = AuthAndClaimTransactions.find((tx) => tx.contractName == "AuthAndClaim")
      .contractAddress as `0x${string}`;

    const instance = new ethers.Contract(contractAddress, AuthAndClaimABI, signer);
    try {
      const txReceipt = await (
        await instance.incrementWithSismoConnect(responseBytes, 3, {
          gasLimit: 20000000,
        })
      ).wait();

      if (!txReceipt.status) {
        throw new Error("Transaction failed");
      }
      setIsVerified(true);
    } catch (e) {
      console.log(e);
      setError(e.message);
    } finally {
      setVerifying(false);
    }
  };
  return (
    <Container>
      <Title>Simple Auth and Claim on-chain</Title>
      {!isVerified ? (
        <>
          <>{error}</>
          <SismoConnectButton
            config={sismoConnectConfig}
            auths={[{ authType: AuthType.VAULT }]}
            claims={[{ groupId: "0xe9ed316946d3d98dfcd829a53ec9822e" }]}
            // we use the AbiCoder to encode the data we want to sign
            // by encoding it we will be able to decode it on chain
            signature={{ message: new ethers.AbiCoder().encode(["uint256"], ["3"]) }}
            onResponseBytes={(responseBytes: string) => verify(responseBytes)}
            verifying={verifying}
            callbackPath={"/on-chain/auth-and-claim"}
            overrideStyle={{ marginBottom: 10 }}
          />
          {responseBytes && (
            <ResponseBytes>
              ResponseBytes:
              {JSON.stringify(responseBytes)}
            </ResponseBytes>
          )}
        </>
      ) : (
        "Response verified!"
      )}
    </Container>
  );
}
