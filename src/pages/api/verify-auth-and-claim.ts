// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { SismoConnect, SismoConnectServerConfig, AuthType, SismoConnectVerifiedResult } from '@sismo-core/sismo-connect-server';

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
  try {
    const result: SismoConnectVerifiedResult = await sismoConnect.verify(response, {
      claims: [{groupId: "0xe9ed316946d3d98dfcd829a53ec9822e"}],
      auths: [{authType: AuthType.VAULT}],
    });
    console.log("Response verified:", result.response);
    console.log("Anonymized userId: ", result.getUserId(AuthType.VAULT))
    res.status(200).send();
  } catch (e: any) {
    res.status(400).send();
  }
}
