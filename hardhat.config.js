// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("./tasks/claimtoken");
require("./tasks/taskdemo");
require("./tasks/create_account");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

// 可修改编译器版本
module.exports = {
  solidity: "0.8.18",
};
