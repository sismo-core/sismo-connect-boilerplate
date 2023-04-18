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
import {
  createPublicClient,
  http,
  getContract,
  custom,
  createWalletClient,
  createTestClient,
  parseEther,
} from "viem";
import { foundry, localhost } from "viem/chains";
import { abi as AuthAndClaimABI } from "../../../abi/AuthAndClaim.json";
import { transactions as AuthAndClaimTransactions } from "../../../broadcast/01_AuthAndClaim.s.sol/5/run-latest.json";
import { privateKeyToAccount } from "viem/accounts";

export const sismoConnectConfig: SismoConnectClientConfig = {
  appId: "0x112a692a2005259c25f6094161007967",
  devMode: {
    // enable or disable dev mode here to create development groups and use the development vault.
    enabled: true,
    devGroups: [
      {
        groupId: "0xe9ed316946d3d98dfcd829a53ec9822e",
        // Add your dev addresses here to become eligible in the DEV env
        data: [
          "0x2b9b9846d7298e0272c61669a54f0e602aba6290",
          "0x3f559454185098cb3a496f864a4bdd82b34c7fd1",
          "0x855193BCbdbD346B423FF830b507CBf90ecCc90B",
        ],
      },
    ],
  },
};

export default function OnChainSimpleClaim() {
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [responseBytes, setResponseBytes] = useState(null);

  const verify = async (responseBytes: string) => {
    setVerifying(true);
    setResponseBytes(responseBytes);

    console.log("AuthAndClaimABI", AuthAndClaimABI);

    const publicClient = createPublicClient({
      chain: localhost,
      transport: http("http://localhost:8545"),
    });

    const walletClient = createWalletClient({
      chain: localhost,
      transport: http("http://localhost:8545"),
      account: privateKeyToAccount(
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
      ),
    });

    console.log("publicClient", publicClient);
    console.log("walletClient", walletClient);

    // contract address of the AuthAndClaim contract on the local anvil network forking Goerli
    // this contractAddress should be replaced with the correct address if the contract is deployed on a different network
    const contractAddress = AuthAndClaimTransactions.find((tx) => tx.contractName == "AuthAndClaim")
      .contractAddress as `0x${string}`;

    const instance = getContract({
      // this is the address of the AuthAndClaim contract deployed on a local anvil network forking Goerli
      address: contractAddress,
      // this is the abi of the AuthAndClaim contract
      abi: AuthAndClaimABI,
      // this is the client to call the contract
      publicClient,
      walletClient,
    });

    console.log("instance", instance);
    setVerifying(false);
    return instance.write.incrementWithSismoConnect([responseBytes, 3]);
  };

  return (
    <Container>
      <Title>Simple Auth and Claim on-chain</Title>
      {!isVerified ? (
        <>
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
          <>{error}</>
        </>
      ) : (
        "Response verified!"
      )}
    </Container>
  );
}
