const hre = require("hardhat");

async function main() {

  // const Lottery = await ethers.getContractFactory("Lottery");
  // const lottery = await Lottery.deploy();

  // console.log("Contract address:", lottery.address);
  

  const Lock = await ethers.getContractFactory("Lock");
  const zcbear = await Lock.deploy("0xcE12a9d4A70eC18F82A141dc6f8FF7c1c94aCd1F");

  console.log("Contract address:", zcbear.address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
