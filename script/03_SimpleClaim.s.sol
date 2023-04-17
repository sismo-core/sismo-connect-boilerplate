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

        // Check that the contract was deployed successfully on the local anvil network with the first account of the test mnemonic
        // You can remove the following line if you are deploying to a different network
        require(address(simpleClaim) == 0xf0b6034277b013D2FcC769CC578a6750FFE1E5A0, "SimpleClaim contract needs to be deployed to the address 0xf0b6034277b013D2FcC769CC578a6750FFE1E5A0 to make the boilerplate works. Please check that you are deploying FOR THE THIRD TIME to a new local anvil network (forked from goerli for example) with the first account (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266) of the test mnemonic (test test test test test test test test test test test junk). If you are deploying to a different network, you can remove this check in script/SimpleClaim.s.sol file.");

        console.log("SimpleClaim Contract deployed at", address(simpleClaim));
        vm.stopBroadcast();
    }
}