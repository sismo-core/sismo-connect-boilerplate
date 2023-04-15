// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthType, SismoConnect, SismoConnectServerConfig, SismoConnectVerifiedResult } from '@sismo-core/sismo-connect-server';

const sismoConnectConfig: SismoConnectServerConfig = {
  appId: "0x112a692a2005259c25f6094161007967",
}

const sismoConnect = SismoConnect(sismoConnectConfig);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  const { response } = req.body;
  try {
    const result: SismoConnectVerifiedResult = await sismoConnect.verify(response, {
      auths: [{authType: AuthType.VAULT}]
    });
    console.log("Response verified:", result.response);
    // vaultId = hash(userVaultSecret, appId). 
    // the vaultId is an app-specific, anonymous identifier of a vault
    console.log("VaultId: ", result.getUserId(AuthType.VAULT))
    res.status(200).send();
  } catch (e: any) {
    console.log("response:", response.proofs[0]);
    console.error(e);
    res.status(400).send();
  }
}
