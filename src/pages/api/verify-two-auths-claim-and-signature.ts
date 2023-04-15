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
      auths: [
        {authType: AuthType.TWITTER, isOptional: true},
        {authType: AuthType.GITHUB},
      ],
      claims: [{groupId: "0xe9ed316946d3d98dfcd829a53ec9822e"}],
      signature: {message: "0x1234568"}
    });
    console.log("Response verified:", result.response);
    console.log("Github Id: ", result.getUserId(AuthType.GITHUB))
    console.log("Twitter Id: ", result.getUserId(AuthType.TWITTER))
    res.status(200).send();
  } catch (e: any) {
    console.log(e);
    res.status(400).send();
  }
}
