// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "sismo-connect-solidity/SismoLib.sol";

contract SimpleAuth is SismoConnect {
  uint256 public counter;

  constructor(bytes16 _appId) SismoConnect(_appId) {}

  function incrementWithSismoConnect(bytes memory response, uint256 number) public {
    SismoConnectVerifiedResult memory result = verify({
      responseBytes: response,
      auth: buildAuth({authType: AuthType.VAULT}),
      signature: buildSignature({message: abi.encode(number)})
    });

    counter += number;
  }
}
