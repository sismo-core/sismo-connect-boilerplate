// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {SimpleAuth} from "contracts/SimpleAuth.sol";

contract DeploySimpleAuth is Script {
    bytes16 public constant APP_ID = 0x112a692a2005259c25f6094161007967;

    function run() public {
        vm.startBroadcast();
        SimpleAuth simpleAuth = new SimpleAuth({_appId: APP_ID});

        console.log("SimpleAuth Contract deployed at", address(simpleAuth));
        vm.stopBroadcast();
    }
}