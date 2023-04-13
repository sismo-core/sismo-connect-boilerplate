import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import {
  AuthType,
  SismoConnectButton,
  SismoConnectClientConfig,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react";
import axios from "axios";
import { useState } from "react";

export const sismoConnectConfig: SismoConnectClientConfig = {
  appId: "0x112a692a2005259c25f6094161007967",
  devMode: {
    enabled: true,
  }
};

export default function OffChainSimpleAuth() {
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const verify = async (response: SismoConnectResponse) => {
    setVerifying(true);
    try {
        await axios.post(`/api/verify-simple-auth`, {
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
            Simple auth off-chain
        </Title>
        {
            !isVerified ?
            <>
                <SismoConnectButton
                    config={sismoConnectConfig}
                    auths={[{authType:AuthType.VAULT}]}
                    onResponse={(response: SismoConnectResponse) => verify(response)}
                    verifying={verifying}
                    callbackPath={"/off-chain/simple-auth"}
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
