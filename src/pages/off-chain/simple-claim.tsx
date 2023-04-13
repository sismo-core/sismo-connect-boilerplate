import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import {
  SismoConnectButton,
  SismoConnectClientConfig,
  SismoConnectResponse,
} from "@sismo-core/sismo-connect-react";
import axios from "axios";
import { useState } from "react";

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
          "0xb01ee322c4f028b8a6bfcd2a5d48107dc5bc99ec",
          "0x3f559454185098cb3a496f864a4bdd82b34c7fd1",
          "0x855193BCbdbD346B423FF830b507CBf90ecCc90B"
        ],
      },
    ],
  },
};

export default function OffChainSimpleClaim() {
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const verify = async (response: SismoConnectResponse) => {
    setVerifying(true);
    try {
        await axios.post(`/api/verify-simple-claim`, {
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
            Simple claim off-chain
        </Title>
        {
            !isVerified ?
            <>
                <SismoConnectButton
                    config={sismoConnectConfig}
                    signature={{ message: "0x1234568" }}
                    claims={[{ groupId: "0xe9ed316946d3d98dfcd829a53ec9822e" }]}
                    onResponse={(response: SismoConnectResponse) => verify(response)}
                    verifying={verifying}
                    callbackPath={"/off-chain/simple-claim"}
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
