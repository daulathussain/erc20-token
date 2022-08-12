const hre = require("hardhat");

async function main() {
  const FunToken = await hre.ethers.getContractFactory("FunToken");
  // const FunTokenSale = await hre.ethers.getContractFactory("FunTokenSale");
  const funToken = await FunToken.deploy(1000000);

  // const tokenPrice = 1000000000000000;

  // const funTokenSale = await FunTokenSale.deploy(funToken.address, tokenPrice);

  await funToken.deployed();
  // await funTokenSale.deployed();

  console.log("FunToken :", funToken.address);
  // console.log("FunTokenSale :", funTokenSale.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
