// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleWithParams {
    address public owner;
    address public OtherAddress;
    uint256 public amount;
    uint256 public exAmount;

    // 设置合约部署者为owner
    constructor(address _owner, address _OtherAddress, uint256 _amount,  uint256 _exAmount) payable {
        require(msg.value == 0.01 ether, "The value must be exactly 0.01 ether"); 
        owner = _owner;
        OtherAddress = _OtherAddress;
        amount = _amount;
        exAmount = _exAmount;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    //查询当前合约余额
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}
