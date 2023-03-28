// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // user deploy collector
  const Collector = await hre.ethers.getContractFactory("Collector");
  // 代币地址作为第一个参数传递给Collector合约的构造函数。
  //第二个参数是(await hre.ethers.getSigner()).address，即当前账户的地址，用于初始化Collector合约的所有者。
  const collector = await Collector.deploy((await hre.ethers.getSigner()).address);

  await collector.deployed();
  console.log("Collector deployed to:", collector.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
