// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 测试slot内存插槽和private变量读取
contract MemoryExample {
    uint256 public a;
    uint256 private b;
    uint256 public c;
    

    function foo() public {
        a = 1;
        b = 2;
        c = 123;
    }
}