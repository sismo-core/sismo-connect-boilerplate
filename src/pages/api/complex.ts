// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { SismoConnect, SismoConnectServerConfig, AuthType, SismoConnectVerifiedResult } from '@sismo-core/sismo-connect-server';
import { auths, claims, signature } from '../off-chain/complex';

const sismoConnectConfig: SismoConnectServerConfig = {
  appId: "0x112a692a2005259c25f6094161007967",
  devMode: {
    enabled: true, 
  }
}

const sismoConnect = SismoConnect(sismoConnectConfig);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  const { response } = req.body;
  console.log("Received response:", response)
  try {
    const result: SismoConnectVerifiedResult = await sismoConnect.verify(response, {
      auths: auths,
      claims: claims,
      signature: signature
    });
    console.log("Response verified:", result.response);
    console.log("Anonymized userId: ", result.getUserId(AuthType.GITHUB))
    res.status(200).send();
  } catch (e: any) {
    console.log(e);
    res.status(400).send();
  }
}
