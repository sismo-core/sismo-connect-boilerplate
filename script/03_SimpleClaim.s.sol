// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {SimpleClaim} from "contracts/SimpleClaim.sol";

contract DeploySimpleClaim is Script {
    bytes16 public constant APP_ID = 0x112a692a2005259c25f6094161007967;
    bytes16 public constant GROUP_ID = 0xe9ed316946d3d98dfcd829a53ec9822e;

    function run() public {
        vm.startBroadcast();
        SimpleClaim simpleClaim = new SimpleClaim({_appId: APP_ID, _groupId: GROUP_ID});

        console.log("SimpleClaim Contract deployed at", address(simpleClaim));
        vm.stopBroadcast();
    }
}