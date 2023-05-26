const hre = require("hardhat");
const { expect } = require("chai");
  

describe("测试erc20 合约", function () {
    it("Should return the right result", async function () {
        const token = await hre.ethers.getContractFactory("token");
        const token_instance = await token.deploy();
        await token_instance.deployed();

        
        // expect(await assemblyTest.sum2(data)).to.equal(5038);

        await assemblyTest.test2()
    }
    );
});
