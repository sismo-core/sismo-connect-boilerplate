// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {TwoAuthsAndClaim} from "contracts/TwoAuthsAndClaim.sol";

contract DeployTwoAuthsAndClaim is Script {
    bytes16 public constant APP_ID = 0x112a692a2005259c25f6094161007967;
    bytes16 public constant GROUP_ID = 0xe9ed316946d3d98dfcd829a53ec9822e;

    function run() public {
        vm.startBroadcast();
        TwoAuthsAndClaim twoAuthsAndClaim = new TwoAuthsAndClaim({_appId: APP_ID, _groupId: GROUP_ID});

        // Check that the contract was deployed successfully on the local anvil network with the first account of the test mnemonic
        // You can remove the following line if you are deploying to a different network
        require(address(twoAuthsAndClaim) == 0xDdcCd8A0143204896A88627aBB24683eceb131C7, "TwoAuthsAndClaim contract needs to be deployed to the address 0xDdcCd8A0143204896A88627aBB24683eceb131C7 to make the boilerplate works. Please check that you are deploying FOR THE FOURTH TIME to a new local anvil network (forked from goerli for example) with the first account (0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266) of the test mnemonic (test test test test test test test test test test test junk). If you are deploying to a different network, you can remove this check in script/TwoAuthsAndClaim.s.sol file.");

        console.log("TwoAuthsAndClaim Contract deployed at", address(twoAuthsAndClaim));
        vm.stopBroadcast();
    }
}