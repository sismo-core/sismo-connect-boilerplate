// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {AuthAndClaim} from "contracts/AuthAndClaim.sol";

contract DeployAuthAndClaim is Script {
    bytes16 public constant APP_ID = 0x112a692a2005259c25f6094161007967;
    bytes16 public constant GROUP_ID = 0xe9ed316946d3d98dfcd829a53ec9822e;

    function run() public {
        vm.startBroadcast();
        AuthAndClaim authAndClaim = new AuthAndClaim({_appId: APP_ID, _groupId: GROUP_ID});
        console.log("AuthAndClaim Contract deployed at", address(authAndClaim));
        vm.stopBroadcast();
    }
}