const { task } = require("hardhat/config");
const { ethers } = require("ethers");
task("create-account", "创建空白钱包 eg: npx hardhat create-account --amount 2 ")
  .addParam("amount", "钱包数量")
  .setAction(async taskArgs => {
    for(let i = 0; i < taskArgs.amount; i++){
      const wallet = ethers.Wallet.createRandom();
      console.log("%s,%s,%s", wallet.address,wallet.privateKey,wallet.mnemonic.phrase);
    }

  });

task("generate-address", "生成1000个地址 eg: npx hardhat generate-address")
  .setAction(async taskArgs => {
    const addresses = [];
    for (let i = 0; i < 1000; i++) {
      const wallet = ethers.Wallet.createRandom();
      addresses.push(wallet.address);
    }
    console.log(addresses);
    //保存到文件
    const fs = require('fs');
    fs.writeFileSync('addresses.json', JSON.stringify(addresses));
  });


task("getNonce", "获取nonce eg: npx hardhat getNonce --address 0xc2baae219aeb8473e12f40c1122a16b99257bdc1")
  .addParam("address", "地址")
  .setAction(async taskArgs => {
    // 设置alchemyProvider eth_mainnet
    const provider = new ethers.providers.AlchemyProvider("homestead", "d1OxOKceR7WNM0woxV_axXtV4SZh9-Lk");
    // 获取nonce
    const nonce = await provider.getTransactionCount(taskArgs.address);
    console.log(nonce);
  });

// 本地计算某个地址部署后的合约地址
task("getContractAddress", "预判合约地址 eg: npx hardhat getContractAddress --account 0xc2baae219aeb8473e12f40c1122a16b99257bdc1 --nonce 206")
  .addParam("account", "账户地址")
  .addParam("nonce", "nonce")
  .setAction(async (taskArgs,hre) => {
    // 本地部署计算合约
    const contract_factory = await hre.ethers.getContractFactory("CalculateAddress");
    const calculateAddress = await contract_factory.deploy();
    await calculateAddress.deployed();
    // 调用addressFrom 函数
    const contract_address = await calculateAddress.addressFrom(taskArgs.account, taskArgs.nonce);
    // 打印合约地址
    console.log("合约地址:", contract_address)
  });


module.exports = {};


