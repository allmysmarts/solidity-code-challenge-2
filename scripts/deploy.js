require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account: ", deployer.address);
  const EthPool = await ethers.getContractFactory("EthPool");
  const ethPool = await EthPool.deploy();

  console.log("Deployed `EthPool` at: ", ethPool.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
