require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("ethpool", "Prints the status of EthPool")
  .addParam("address", "The contract's address")
  .setAction(async (taskArgs) => {
    console.log("Getting status from EthPool at", taskArgs.address);
    const EthPool = await hre.ethers.getContractFactory("EthPool");
    const ethPool = await EthPool.attach(taskArgs.address);

    const totalDepositAmount = await ethPool.totalDepositAmount();
    console.log("Total Deposited ETH: ", ethers.utils.formatEther(totalDepositAmount));
  })

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/" + process.env.INFURA_ID,
      chainId: 4,
      gasPrice: "auto",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
