// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "sismo-connect-solidity/SismoLib.sol";

contract TwoAuthsAndClaim is SismoConnect {
  bytes16 public immutable GROUP_ID;
  uint256 public counter;

  constructor(bytes16 _appId, bytes16 _groupId) SismoConnect(_appId) {
    GROUP_ID = _groupId;
  }

  function incrementWithSismoConnect(bytes memory response, uint256 number) public {
    AuthRequest[] memory auths = new AuthRequest[](2);
    auths[0] = AuthRequestBuilder.build({authType: AuthType.TWITTER, isOptional: true});
    auths[1] = AuthRequestBuilder.build({authType: AuthType.GITHUB});

    ClaimRequest[] memory claims = new ClaimRequest[](1);
    claims[0] = ClaimRequestBuilder.build({groupId: GROUP_ID});

    SismoConnectRequest memory request = RequestBuilder.buildRequest({
      auths: auths,
      claims: claims,
      signature: buildSignature({message: abi.encode(number)}),
      appId: appId
    });

    SismoConnectVerifiedResult memory result = verify({responseBytes: response, request: request});

    counter += number;
  }
}
