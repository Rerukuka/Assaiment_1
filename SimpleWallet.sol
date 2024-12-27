// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleWallet {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    // Function to receive Ether
    receive() external payable {}

    // Withdraw all Ether by the owner
    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(msg.sender).transfer(address(this).balance);
    }

    // Check contract balance
    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}
