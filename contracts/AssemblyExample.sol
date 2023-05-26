// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 测试两种实现的gas花费
contract AssemblyExample {
  //sum1：普通实现 34457 gas
  function sum1(uint[] memory data) public pure  returns (uint) {
    uint sum = 0;
    for (uint i = 0; i < data.length; i++) {
      sum += data[i];
    }
    return sum;
  }

  //sum2: 汇编实现  16320 gas
  function sum2(uint[] memory data) public pure returns (uint) {
    uint sum = 0;

    assembly {
      let len := mload(data)
      let ptr := add(data, 0x20)

      for {
        let end := add(ptr, mul(len, 0x20))
      } lt(ptr, end) {
        ptr := add(ptr, 0x20)
      } {
        sum := add(sum, mload(ptr))
      }
    }

    return sum;
  }

  function test1(uint[] memory data) public  {
    sum1(data);
  }
  
  function test2(uint[] memory data) public  {
    sum2(data);
  }

}

// [55, 89, 23, 71, 14, 17, 88, 44, 77, 58, 85, 47, 67, 67, 19, 84, 62, 52, 51, 46, 30, 75, 35, 84, 13, 16, 8, 59, 90, 48, 46, 5, 95, 92, 50, 60, 13, 55, 63, 90, 48, 15, 5, 36, 26, 77, 32, 8, 63, 54, 91, 10, 32, 21, 98, 4, 22, 71, 67, 35, 89, 31, 11, 94, 57, 54, 30, 78, 73, 53, 89, 18, 25, 21, 26, 23, 94, 60, 99, 53, 7, 97, 77, 71, 53, 45, 2, 54, 71, 69, 73, 9, 30, 89, 27, 45, 78, 3, 90, 12]
