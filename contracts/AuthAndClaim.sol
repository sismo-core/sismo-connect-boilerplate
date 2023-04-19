// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "sismo-connect-solidity/SismoLib.sol";

contract AuthAndClaim is SismoConnect {
  bytes16 public immutable GROUP_ID;
  uint256 public counter;

  constructor(bytes16 _appId, bytes16 _groupId) SismoConnect(_appId) {
    GROUP_ID = _groupId;
  }

  function incrementWithSismoConnect(bytes memory response, uint256 number) public {
    SismoConnectVerifiedResult memory result = verify({
      responseBytes: response,
      auth: buildAuth({authType: AuthType.VAULT}),
      claim: buildClaim({groupId: GROUP_ID}),
      signature: buildSignature({message: abi.encode(number)})
    });

    counter += number;
  }
}
