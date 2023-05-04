// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;
import './SimpleStorage.sol';
contract StorageFactory {
    SimpleStorage public simpleStorage;
    address[] private whitelist;
    uint256[] private  amt;

    //添加地址列表为白名单
    function addAddressesToWhitelist(address[] memory _addresses) public {
        for (uint i = 0; i < _addresses.length; i++) {
            address _address = _addresses[i];
            require(!isWhitelisted(_address));
            whitelist.push(_address);
        }
    }
    // 添加地址列表为白名单 同时设置amount 设置启用参数
    function addAddressesToWhitelistV2(address[] memory _addresses,uint256[] memory amounts,bool flag) public {
        amt = amounts;
        if (flag){
            for (uint i = 0; i < _addresses.length; i++) {
                address _address = _addresses[i];
                require(!isWhitelisted(_address));
                whitelist.push(_address);
            }
        }
    }
    //查询函数
    function isWhitelisted(address _address) public view returns (bool) {
        for (uint i = 0; i < whitelist.length; i++) {
            if (whitelist[i] == _address) {
                return true;
            }
        }
        return false;
    }
    // 0.01 ether = 10000000 GWEI
    uint public constant FEE = 0.01 ether;

    //付费函数
    function payToCall() public payable {
        require(msg.value == FEE, "PaymentRequired: Payment amount is incorrect");
        // 付费后才能创建相关合约
        simpleStorage = new SimpleStorage();
    }

    // 查询当前合约余额
    function getBalance() public view returns (uint) {
        return address(this).balance;
    } 
}