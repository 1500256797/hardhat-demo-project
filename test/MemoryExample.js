const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Attack", function () {
    it("期望能够读取到slot内存插槽中的数据，同时通过内存插槽读取private数据", async function () {
        // Deploy the  contract
        const MemoryExample = await ethers.getContractFactory("MemoryExample");


        const memoryExample = await MemoryExample.deploy();
        await memoryExample.deployed();
        await memoryExample.foo();
        // Get the storage at storage slot 0,1
        const slot0Bytes = await ethers.provider.getStorageAt(
            memoryExample.address,
            0
        );
        const slot1Bytes = await ethers.provider.getStorageAt(
            memoryExample.address,
            1
        );
        const slot2Bytes = await ethers.provider.getStorageAt(
            memoryExample.address,
            2
        );

        // We are able to extract the values of the private variables
        console.log("slot0Bytes", slot0Bytes);
        console.log("slot1Bytes", slot1Bytes); 
        console.log("slot2Bytes", slot2Bytes);
        // expect(ethers.utils.parseBytes32Integer(slot0Bytes)).to.equal(1);
        // expect(ethers.utils.parseBytes32Integer(slot0Bytes)).to.equal(2);

        // 16进制
        // slot0Bytes 0x0000000000000000000000000000000000000000000000000000000000000001
        // slot1Bytes 0x0000000000000000000000000000000000000000000000000000000000000002
        // slot2Bytes 0x000000000000000000000000000000000000000000000000000000000000007b
    });
});
// 1、说明private变量可以通过内存插槽读取，所以连上无隐私
// 2、以太坊的内存slot最多有256个，每个slot大小为32字节。其中uint256 bytes32占用一个slot。
// uint8是1个字节 所以还剩31个字节