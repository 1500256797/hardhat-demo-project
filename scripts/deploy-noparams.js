const hre = require("hardhat");

// 案例1：合约没有构造函数 不需要传参时，直接部署
async function main() {
  // 指定需要部署的合约名称 （非合约文件名）
  const storage_factory = await hre.ethers.getContractFactory("StorageFactory");
  // 部署合约
  const storage_factory_contract = await storage_factory.deploy();
  // 等待合约部署完成
  await storage_factory_contract.deployed();
  // 打印合约地址
  console.log("Collector deployed to:", storage_factory_contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 执行命令  // 0.01 ether = 10000000 GWEI
// npx hardhat run .\scripts\deploy-noparams.js