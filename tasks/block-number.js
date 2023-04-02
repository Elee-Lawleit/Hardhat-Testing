// we  can also make our own custom tasks, and can then run them through the CLI

const {task} = require("hardhat/config");


task("block-number", "Prints the current block number")
    .setAction(async (taskArgs, hre)=>{
        // hre is the hardhat runtime environment, 
        // basically same as importing hardhat package at the top of the file
        // can be used to access packages as follows

        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current block number is: ${blockNumber}`);
    })

// now import this in the hardhat config file and it should appear in the CLI as a task