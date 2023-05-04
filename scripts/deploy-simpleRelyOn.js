const hre = require("hardhat");

// 案例2：要部署多个合约，合约部署有顺序上的依赖，一个合约的部署地址是另一个合约的构造参数。
async function main() {
  const myContractA_f = await hre.ethers.getContractFactory("MyContractA");
  const myContractA = await myContractA_f.deploy(); // 合约A 无构造参数
  await myContractA.deployed();
  console.log("ContractA deployed to:", myContractA.address);

  const myContractB_f = await hre.ethers.getContractFactory("MyContractB");
  const myContractB = await myContractB_f.deploy(); // 合约B 无构造参数
  await myContractB.deployed();
  console.log("ContractB deployed to:", myContractB.address);

  const myContractC_f = await hre.ethers.getContractFactory("MyContractC");
  const myContractC = await myContractC_f.deploy(myContractA.address,myContractB.address);
  await myContractC.deployed();
  console.log("ContractC deployed to:", myContractC.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 执行命令
// npx hardhat run .\scripts\deploy-simpleRelyOn.js