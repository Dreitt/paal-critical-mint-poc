const { ethers } = require("hardhat");

async function main() {
  // Get the first signer which will be the contract owner (deployer)
  const [owner] = await ethers.getSigners();

  // Deploy a mock ERC20 contract with public mint access (vulnerable)
  const TokenFactory = await ethers.getContractFactory("VulnerableToken", owner);
  const token = await TokenFactory.deploy("Paal Token", "PAAL");
  await token.waitForDeployment();

  console.log(`\n🚀 VulnerableToken deployed to: ${token.target}`);

  // Mint tokens directly using unrestricted owner access (vulnerability)
  const mintAmount = ethers.parseUnits("1000000", 18); // 1 million tokens
  const tx = await token.mint(owner.address, mintAmount);
  await tx.wait();

  const balance = await token.balanceOf(owner.address);
  console.log(`✅ Mint successful. Owner balance: ${ethers.formatUnits(balance, 18)} PAAL`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
