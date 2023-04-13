import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import {
  SismoConnectButton,
  SismoConnectClientConfig,
} from "@sismo-core/sismo-connect-react";
import { useState } from "react";
import { ethers } from 'ethers';
import { ResponseBytes } from "@/components/ResponseBytes";

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
          "0xF61CabBa1e6FC166A66bcA0fcaa83762EdB6D4Bd",
        ],
      },
    ],
  },
  vaultAppBaseUrl: "http://staging.dev.vault-beta.sismo.io"
  // vaultAppBaseUrl: "http://localhost:3000"
};

export default function OnChainSimpleClaim() {
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [responseBytes, setResponseBytes] = useState(null);

  const verify = async (responseBytes: string) => {
    setVerifying(true);
    console.log("responseBytes", responseBytes);
    setResponseBytes(responseBytes);
    //TODO Call contract
    /*
        const instance = new ethers.Contract(
            CONTRACT_ADDRESS,
            ContractABI.abi,
            getWeb3Provider(chainId)
        );
        // you can see the tests of the contract in contracts/test/Boilerplate.t.sol
        return await instance.incrementWithSismoConnect(responseBytes, 3);
    */
    setVerifying(false);
  }

  return (
    <Container>
        <Title>
            Simple Claim on-chain
        </Title>
        {
            !isVerified ?
            <>
                <SismoConnectButton
                    config={sismoConnectConfig}
                    claims={[{ groupId: "0xe9ed316946d3d98dfcd829a53ec9822e" }]}
                    // we use the AbiCoder to encode the data we want to sign
                    // by encoding it we will be able to decode it on chain
                    signature={{ message: new ethers.AbiCoder().encode(['uint256'], ['3']), }}
                    onResponseBytes={(responseBytes: string) => verify(responseBytes)}
                    verifying={verifying}
                    callbackPath={"/on-chain/simple-claim"}
                    overrideStyle={{marginBottom: 10}}
                />
                {
                  responseBytes && 
                    <ResponseBytes>
                      ResponseBytes:
                      {JSON.stringify(responseBytes)}
                    </ResponseBytes>
                }
                <>
                {error}
                </>
            </>
            :
            "Response verified!"
        }
    </Container>
  );
}
