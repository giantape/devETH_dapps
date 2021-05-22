require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require("truffle-hdwallet-provider");
const privateKeys = process.env.PRIVATE_KEYS || ""

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    deveth: {
      provider: () => new HDWalletProvider (
          privateKeys.split(','),
          `https://rpc.deveth.org/`
        ),
      network_id: "777",
      gasPrice: 2000000000 
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}