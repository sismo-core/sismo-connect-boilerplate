// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {SimpleAuth} from "contracts/SimpleAuth.sol";

contract DeploySimpleAuth is Script {
    bytes16 public constant APP_ID = 0x112a692a2005259c25f6094161007967;

    function run() public {
        vm.startBroadcast();
        SimpleAuth simpleAuth = new SimpleAuth({_appId: APP_ID});

        // Check that the contract was deployed successfully on the local anvil network with the first account of the test mnemonic
        // You can remove the following line if you are deploying to a different network
        require(address(simpleAuth) == 0x56D100FB63cCF93163d03834aF7240c2Fb5bd741, "SimpleAuth contract needs to be deployed to the address 0x56D100FB63cCF93163d03834aF7240c2Fb5bd741 to make the boilerplate works. Please check that you are deploying FOR THE SECOND TIME to a new local anvil network (forked from goerli for example) with the first account (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266) of the test mnemonic (test test test test test test test test test test test junk). If you are deploying to a different network, you can remove this check in script/SimpleAuth.s.sol file.");

        console.log("SimpleAuth Contract deployed at", address(simpleAuth));
        vm.stopBroadcast();
    }
}