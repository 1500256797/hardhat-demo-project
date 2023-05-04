const hre = require("hardhat");

// 案例2：合约有构造参数，需要进行传参。【注意】这里注意owner参数如何传递
async function main() {
  // 指定需要部署的合约名称 （非合约文件名）
  const simple_with_params_f = await hre.ethers.getContractFactory("SimpleWithParams");
  //(await hre.ethers.getSigner()).address，即当部署合约的账户地址。
  const simple_with_params_f_contract = await simple_with_params_f.deploy((await hre.ethers.getSigner()).getAddress(),'0x356faDD245d35ff8F1a207aC83BE7EEa911abeEE',100,97,{
    value: ethers.utils.parseEther("0.01") // 这里发送 0.01 ether 因为构造函数有payable函数进行修饰。
  });
  await simple_with_params_f_contract.deployed();
  console.log("Contract deployed to:", simple_with_params_f_contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 执行命令
// npx hardhat run .\scripts\deploy-withparams.js