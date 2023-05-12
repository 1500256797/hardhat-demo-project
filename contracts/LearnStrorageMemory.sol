// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract Example {
//     // 创建两种类型的变量
//     uint256 public num;
//     Person public person;

//     struct Person {
//         string name;
//         uint age;
//     }

//     constructor() {
//         num = 10;
//         person = Person("Alice", 20);
//     }
//     // 在函数内修改函数外变量的值
//     function updateNum(uint256 _newNum) public{
//         //在函数内修改
//         num = _newNum;
//         num++;
//     }

//     // 传递Person类型的变量 并在函数中修改其内容
//     function updatePerson (Person storage _newPerson) public {
//         person = _newPerson;
//         person.name = "Zhangsan";
//     }
// }


// contract ExampleCaller {
//     Example example= new Example();
//     Example.Person  newPerson = Example.Person("Bob", 30);

//     function callFunctions() public returns (string memory ,uint,uint){
//         uint256 newNum = 20;

//         // 在函数中无法修改newNum newNum还是20 
//         example.updateNum(newNum);

//         // 在函数中可以修改newPerson的内容 从Bob ===》 Zhangsan
//         // age不变 依旧是 30
//         example.updatePerson(newPerson);
 
//         string memory name = newPerson.name;
//         uint age = newPerson.age;
//         return (
//             name,age,newNum
//         );

//     }
// }