import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import {
  SismoConnectButton,
  SismoConnectClientConfig,
  SismoConnectResponse,
  AuthType
} from "@sismo-core/sismo-connect-react";
import axios from "axios";
import { useState } from "react";

export const sismoConnectConfig: SismoConnectClientConfig = {
  appId: "0x112a692a2005259c25f6094161007967",
  devMode: {
    // enable or disable dev mode here to create development groups and use the development vault.
    enabled: true,
  },
};

export default function OffChainAuthAndClaim() {
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const verify = async (response: SismoConnectResponse) => {
    setVerifying(true);
    console.log(response)
    try {
        await axios.post(`/api/verify-two-auths-claim-and-signature`, {
            response,
        })
        setIsVerified(true);
    } catch (e) {
        setError("Invalid response")
        console.error(e);
    } finally {
        setVerifying(false);
    }
  }

  return (
    <Container>
        <Title>
           Claim / optional Twitter account / required GitHub account and signature
        </Title>
        {
            !isVerified ?
            <>
                <SismoConnectButton
                    config={sismoConnectConfig}
                    auths={[
                      {authType: AuthType.TWITTER, isOptional: true},
                      {authType: AuthType.GITHUB}
                    ]}
                    claims={[{ groupId: "0xe9ed316946d3d98dfcd829a53ec9822e" }]}
                    signature={{message: "0x1234568"}}
                    onResponse={(response: SismoConnectResponse) => verify(response)}
                    verifying={verifying}
                    callbackPath={"/off-chain/two-auths-claim-and-signature"}
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
