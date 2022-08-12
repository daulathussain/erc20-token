require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/6547946c388047d5add5efb5a670288f` || "",
      accounts:
        `41ee81c00829b2fe236879eec5d09ba67792a5555459525e9097491b582d9ce1` !==
        undefined
          ? [`41ee81c00829b2fe236879eec5d09ba67792a5555459525e9097491b582d9ce1`]
          : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: "WCEZKZEQUBKEFBU32GJYYV7F9YM8G3HJEG",
  },
};
