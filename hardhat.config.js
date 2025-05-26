require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.20",
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/Qev0lmomWp61mqZsUl0Xl",
        blockNumber: 19814690,
      },
    },
  },
};