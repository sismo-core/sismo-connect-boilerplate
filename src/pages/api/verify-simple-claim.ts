// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { SismoConnect, SismoConnectServerConfig, AuthType } from '@sismo-core/sismo-connect-server';
import { SismoConnectVerifiedResult } from '@sismo-core/sismo-connect-react';

const sismoConnectConfig: SismoConnectServerConfig = {
  appId: "0x112a692a2005259c25f6094161007967",
  devMode: {
    enabled: true, 
  }
}

const zkConnect = SismoConnect(sismoConnectConfig);

const claims = [{
  groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a",
}];
const auths = [{
  authType: AuthType.VAULT,
}];
const signature = { message: "0x1234568" }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {

  const { response } = req.body;
  try {
    const result: SismoConnectVerifiedResult = await zkConnect.verify(response, {
      claims,
      signature
    });
    console.log("Response verified:", result.response);
    res.status(200).send();
  } catch (e: any) {
    res.status(400).send();
  }
}
