require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: __dirname + '/.env' })
require("@nomiclabs/hardhat-etherscan")

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const ETHEREUM_ACCOUNT_PRIVATE_KEY = process.env.ETHEREUM_ACCOUNT_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

module.exports = {
    defaultNetwork: "hardhat",
    //yarn hardhat run .\scripts\deploy.js --network hardhat --> to be explicit at runtime (running with a specific network)

    //it deploys on the fake hardhat network by default

    //can also use our custom networks
    //or test networks, other than the provided fake one
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [ETHEREUM_ACCOUNT_PRIVATE_KEY],
            chainId: 11155111,
        },
    },
    solidity: "0.8.7",

    //etherscan plugin

    //plugins are added as tasks that can be run using "yarn hardhat [task_name]"
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
}
