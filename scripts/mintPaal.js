const { ethers } = require("hardhat");

async function main() {
  const paalAddress = "0xEf0B251E8E83A1F3a6397737a2078975f7B52F94"; // Mainnet PAAL token address

  if (!paalAddress) {
    throw new Error("Missing PAAL token address");
  }

  const paalToken = await ethers.getContractAt("IERC20", paalAddress);
  const [signer] = await ethers.getSigners();

  const balance = await paalToken.balanceOf(signer.address);
  console.log("Your PAAL balance:", balance.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});