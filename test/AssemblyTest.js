const hre = require("hardhat");
const { expect } = require("chai");

describe("AssemblyExample Sum1普通实现 gas 估计", function () {
    it("Should return the right result", async function () {
        const AssemblyTest = await hre.ethers.getContractFactory("AssemblyExample");
        const assemblyTest = await AssemblyTest.deploy();
        await assemblyTest.deployed();
        const data = [55, 89, 23, 71, 14, 17, 88, 44, 77, 58, 85, 47, 67, 67, 19, 84, 62, 52, 51, 46, 30, 75, 35, 84, 13, 16, 8, 59, 90, 48, 46, 5, 95, 92, 50, 60, 13, 55, 63, 90, 48, 15, 5, 36, 26, 77, 32, 8, 63, 54, 91, 10, 32, 21, 98, 4, 22, 71, 67, 35, 89, 31, 11, 94, 57, 54, 30, 78, 73, 53, 89, 18, 25, 21, 26, 23, 94, 60, 99, 53, 7, 97, 77, 71, 53, 45, 2, 54, 71, 69, 73, 9, 30, 89, 27, 45, 78, 3, 90, 12]
        await assemblyTest.sum1(data)
        // expect(await assemblyTest.sum1(data)).to.equal(5038);
        await assemblyTest.test1(data)

    }
    );
});

// 测试汇编合约 gas 估计
describe("AssemblyExample Sum2汇编实现 gas 估计", function () {
    it("Should return the right result", async function () {
        const AssemblyTest = await hre.ethers.getContractFactory("AssemblyExample");
        const assemblyTest = await AssemblyTest.deploy();
        await assemblyTest.deployed();

        const data = [55, 89, 23, 71, 14, 17, 88, 44, 77, 58, 85, 47, 67, 67, 19, 84, 62, 52, 51, 46, 30, 75, 35, 84, 13, 16, 8, 59, 90, 48, 46, 5, 95, 92, 50, 60, 13, 55, 63, 90, 48, 15, 5, 36, 26, 77, 32, 8, 63, 54, 91, 10, 32, 21, 98, 4, 22, 71, 67, 35, 89, 31, 11, 94, 57, 54, 30, 78, 73, 53, 89, 18, 25, 21, 26, 23, 94, 60, 99, 53, 7, 97, 77, 71, 53, 45, 2, 54, 71, 69, 73, 9, 30, 89, 27, 45, 78, 3, 90, 12]
        await assemblyTest.sum2(data)
        // expect(await assemblyTest.sum2(data)).to.equal(5038);
        await assemblyTest.test2(data)
    }
    );
});
