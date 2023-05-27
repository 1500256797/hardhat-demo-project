const { ethers } = require("hardhat");
const { expect } = require("chai");

// 读取本地主网副本数据
// 打印当前本地主网副本的区块高度
describe("PrintForkNumber", function () {
    it("打印当前本地主网副本的区块高度", async function () {
        console.log("本地主网副本区块高度："+(await ethers.provider.getBlockNumber()).toString());
    });
});

// 读取本地主网副本的合约数据
describe("PrintUsdtBalance", function () {
    it("打印17342219高度下usdt的余额", async function () {
        const USDT_ABI = require("./abi/usdt_abi.json");
        const USDT_ADDRESS = "0xdac17f958d2ee523a2206206994597c13d831ec7";
        const USDT_CONTRACT = new ethers.Contract(USDT_ADDRESS, USDT_ABI, ethers.provider);

        // 打印usdt的总发行量
        let totalSupply = await USDT_CONTRACT.totalSupply() / 1e6;
        console.log("usdt总发行量：",totalSupply.toString());

        // 打印Kucoin的usdt余额
        const USDT_BALANCE = await USDT_CONTRACT.balanceOf("0xD6216fC19DB775Df9774a6E33526131dA7D19a2c") / 1e6;
        console.log("usdt余额："+USDT_BALANCE.toString());
    }
    );
});

// 冒充用户，调用合约方法
describe("CallContract", function () {
    it("冒充用户，调用合约方法", async function () {
        const vitalik = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
        await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [vitalik],
        });
        const signer = await ethers.provider.getSigner(vitalik);

        // 打印vitalik的eth余额 usdt余额
        let ETHBalance = await signer.getBalance();
        console.log(`V神 的 ETH balance is ${ETHBalance.toString() / 1e18}`);

        const USDT_ABI = require("./abi/usdt_abi.json");
        const USDT_ADDRESS = "0xdac17f958d2ee523a2206206994597c13d831ec7";
        const USDT = new ethers.Contract(USDT_ADDRESS, USDT_ABI, ethers.provider);
        let USDTBalance = await USDT.balanceOf(signer.getAddress()) / 1e6;
        console.log(`V神 的 USDT balance is ${USDTBalance.toString()}`);
    });
});

// 冒充用户发起交易
describe("SendTransaction", function () {
    it("冒充用户发起交易", async function () {
        const vitalik = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
        const ouhuang = "0x356faDD245d35ff8F1a207aC83BE7EEa911abeEE";
        await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [vitalik],
        });

        // 给欧皇地址转账eth
        const signer = await ethers.provider.getSigner(vitalik);
        const tx = await signer.sendTransaction({
            to: ouhuang,
            value: ethers.utils.parseEther("4669.730"),
        });
        await tx.wait();


        // 给某个地址授权usdt approve
        const USDT_ABI = require("./abi/usdt_abi.json");
        const USDT_ADDRESS = "0xdac17f958d2ee523a2206206994597c13d831ec7";
        const USDT = new ethers.Contract(USDT_ADDRESS, USDT_ABI, ethers.provider);
        const tx2 = await USDT.connect(signer).approve(ouhuang, ethers.utils.parseUnits("100", 6));
        await tx2.wait();

        // 冒充 ouhuang 这个地址 将v神的usdt都转走
        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [ouhuang],
        });
        const ouhuang_signer2 = await ethers.provider.getSigner(ouhuang);
        const tx3 = await USDT.connect(ouhuang_signer2).transferFrom(vitalik, ouhuang, ethers.utils.parseUnits("79.23",6));
        await tx3.wait();

        //打印v神的usdt eth余额
        let USDTBalance = await USDT.balanceOf(vitalik) / 1e6;
        console.log(`V神 的 USDT balance is ${USDTBalance.toString()}`);
        let ETHBalance = await signer.getBalance();
        console.log(`V神 的 ETH balance is ${ETHBalance.toString() / 1e18}`);

        // 打印ouhuang的usdt余额 和 eth余额
        let USDTBalance2 = await USDT.balanceOf(ouhuang) / 1e6;
        console.log(`欧皇 的 USDT balance is ${USDTBalance2.toString()}`);
        let ETHBalance2 = await ouhuang_signer2.getBalance();
        console.log(`欧皇 的 ETH balance is ${ETHBalance2.toString() / 1e18}`);
    });
});

