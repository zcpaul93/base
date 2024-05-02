require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
    },
    base_sepolia: {
      url: "https://sepolia.base.org",
      accounts: [process.env.WALLET_KEY]
    },
    base_mainnet: {
      url: 'https://mainnet.base.org',
      accounts: [process.env.WALLET_KEY],
    },
  }
};
