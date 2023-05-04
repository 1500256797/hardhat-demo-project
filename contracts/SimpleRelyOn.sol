// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContractA {
    // ...
}

contract MyContractB {
    // ...
}

contract MyContractC {
    address public contractA;
    address public contractB;

    constructor(address _contractA, address _contractB) {
        contractA = _contractA;
        contractB = _contractB;
    }

    function getContractA() public view returns (address) {
        return contractA;
    }

    function getContractB() public view returns (address) {
        return contractB;
    }

    // ...
}
