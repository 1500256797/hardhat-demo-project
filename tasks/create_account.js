const { task } = require("hardhat/config");

const { ethers } = require("ethers");

task("create-account", "创建空白钱包")
  .addParam("amount", "钱包数量")
  .setAction(async taskArgs => {
    for(let i = 0; i < taskArgs.amount; i++){
      const wallet = ethers.Wallet.createRandom();
      console.log("%s,%s,%s", wallet.address,wallet.privateKey,wallet.mnemonic.phrase);
    }

  });

module.exports = {};
