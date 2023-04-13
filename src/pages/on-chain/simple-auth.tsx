import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import {
  AuthType,
  SismoConnectButton,
  SismoConnectClientConfig,
} from "@sismo-core/sismo-connect-react";
import { useState } from "react";
import { ethers } from 'ethers';

export const sismoConnectConfig: SismoConnectClientConfig = {
  appId: "0x112a692a2005259c25f6094161007967",
  vaultAppBaseUrl: "http://staging.dev.vault-beta.sismo.io"
};

export default function OnChainSimpleClaim() {
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const verify = async (responseBytes: string) => {
    setVerifying(true);
    console.log("responseBytes", responseBytes);
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
            Simple Auth on-chain
        </Title>
        {
            !isVerified ?
            <>
                <SismoConnectButton
                    config={sismoConnectConfig}
                    auths={[{authType:AuthType.VAULT}]}
                    // we use the AbiCoder to encode the data we want to sign
                    // by encoding it we will be able to decode it on chain
                    signature={{ message: new ethers.AbiCoder().encode(['uint256'], ['3']), }}
                    onResponseBytes={(responseBytes: string) => verify(responseBytes)}
                    verifying={verifying}
                    callbackPath={"/on-chain/simple-auth"}
                    overrideStyle={{marginBottom: 10}}
                />
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
