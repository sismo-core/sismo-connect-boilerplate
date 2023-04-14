import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import {
  SismoConnectButton,
  SismoConnectClientConfig,
  SismoConnectResponse,
  AuthType,
  ClaimType,
  ClaimRequest,
  AuthRequest,
  SignatureRequest
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
        groupId: "0xd138c33e8a6a450336a6c5dda990cf95",
        groupTimestamp: "latest",
        data: {
          "0x938f169352008d35e065F153be53b3D3C07Bcd90": 4,
          "0x35Af38bAC1793642D2fd3d71807aA54A56ed8183": 3,
          "0xEeE99560F6ccfa8e12994872725a10f80E8a4FFa": 3,
          "0x25fcc2A4B8e5387649ba3B6DeDDcAC343D8E11B6": 11,
          "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045": 2,
        },
      },
      // {
      //   groupId: "0x8d5e3ee2049c1c7d363ea88b2b424877",
      //   groupTimestamp: "latest",
      //   data: {
      //     "0x938f169352008d35e065F153be53b3D3C07Bcd90": 3,
      //   },
      // },
      // {
      //   groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a",
      //   groupTimestamp: "latest",
      //   data: {
      //     "0x938f169352008d35e065F153be53b3D3C07Bcd90": 3,
  
      //   },
      // },
      // {
      //   groupId: "0x682544d549b8a461d7fe3e589846bb7b",
      //   groupTimestamp: "latest",
      //   data: {
      //     "0x938f169352008d35e065F153be53b3D3C07Bcd90": 3,
      //   },
      // },
    ],
  },
 // vaultAppBaseUrl: "http://dev.vault-beta.sismo.io"
 vaultAppBaseUrl: "http://localhost:3000"
};

export const signature: SignatureRequest = {
  message:
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of usin",
  isSelectableByUser: true,
  extraData: "",
};

export const claims = [
  // {
  //   claimType: ClaimType.GTE,
  //   groupId: "0xd138c33e8a6a450336a6c5dda990cf95",
  //   groupTimestamp: "latest",
  //   isOptional: false,
  //   isSelectableByUser: true,
  //   value: 1,
  //   extraData: "",
  // } as ClaimRequest,
  // {
  //   claimType: ClaimType.GTE,
  //   groupId: "0xd138c33e8a6a450336a6c5dda990cf95",
  //   groupTimestamp: "latest",
  //   isOptional: false,
  //   isSelectableByUser: true,
  //   value: 1,
  //   extraData: "",
  // } as ClaimRequest,
  // {
  //   claimType: ClaimType.EQ,
  //   groupId: "0xd138c33e8a6a450336a6c5dda990cf95",
  //   groupTimestamp: "latest",
  //   isOptional: false,
  //   isSelectableByUser: true,
  //   value: 3,
  //   extraData: "",
  // } as ClaimRequest,
]

export const auths: AuthRequest[] = [
  // {
  //   authType: AuthType.VAULT,
  //   isAnon: false,
  //   userId: "0x938f169352008d35e065F153be53b3D3C07Bcd90",
  //   isOptional: false,
  //   isSelectableByUser: false,
  //   extraData: "",
  // },
  // {
  //   authType: AuthType.EVM_ACCOUNT,
  //   isAnon: false,
  //   userId: "0x25fcc2A4B8e5387649ba3B6DeDDcAC343D8E11B6",
  //   isOptional: false,
  //   isSelectableByUser: false,
  //   extraData: "",
  // },
  // {
  //   authType: AuthType.EVM_ACCOUNT,
  //   isAnon: false,
  //   userId: "0x938f169352008d35e065F153be53b3D3C07Bcd90",
  //   isOptional: true,
  //   isSelectableByUser: false,
  //   extraData: "",
  // },
  // {
  //   authType: AuthType.TWITTER,
  //   isAnon: false,
  //   userId: "971701818",
  //   isOptional: true,
  //   isSelectableByUser: true,
  //   extraData: "",
  // },
  // {
  //   authType: AuthType.GITHUB,
  //   isAnon: false,
  //   userId: "124567",
  //   isOptional: false,
  //   isSelectableByUser: true,
  //   extraData: "",
  // },
  // {
  //   authType: AuthType.EVM_ACCOUNT,
  //   isAnon: false,
  //   userId: "0x938f169352008d35e065F153be53b3D3C07Bcd90",
  //   isOptional: true,
  //   isSelectableByUser: false,
  //   extraData: "",
  // },
  // {
  //   authType: AuthType.EVM_ACCOUNT,
  //   isAnon: false,
  //   userId: "0x938f169352008d35e065F153be53b3D3C07Bcd90",
  //   isOptional: true,
  //   isSelectableByUser: true,
  //   extraData: "",
  // },
  // {
  //   authType: AuthType.TWITTER,
  //   isAnon: false,
  //   userId: "971701818",
  //   isOptional: true,
  //   isSelectableByUser: false,
  //   extraData: "",
  // },
];


export default function Complex() {
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const verify = async (response: SismoConnectResponse) => {
    setVerifying(true);
    console.log(response)
    try {
        await axios.post(`/api/complex`, {
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
                    auths={auths}
                    claims={claims}
                    signature={signature}
                    onResponse={(response: SismoConnectResponse) => verify(response)}
                    verifying={verifying}
                    callbackPath={"/off-chain/complex"}
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
