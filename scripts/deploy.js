const {ethers, run, network} = require("hardhat")
require("dotenv").config()

//ethers is the ethersjs library
//run is used to run hardhat tasks ie yarn hardhat verify
//network is for getting network info


async function main() {
    //we can't do this with simple ethers import

    //the above import wraps ether with hardhat, which helps ether keep track of a lot of stuff and it already knows that the compiled SimpleStorage contract is located in artifacts>contracts

    //simple ether wouldn't know this on its own

    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )

    console.log("Deploying contract...")
    //send the deployment transaction
    const simpleStorage = await SimpleStorageFactory.deploy()

    //wait for block confirmations
    await simpleStorage.deployed()

    console.log(`Deployed contract to: ${simpleStorage.address}`)

    //don't wanna call the verify function if it's on the fake hardhat network, so
    //network.config will contain information about the network that we're currently running on
    console.log(network.config)
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        //gonna have to wait for block confirmations to make sure the contract was deployed before verifying it

        //wait 6 blocks
        console.log("Waiting for block confirmations...")
        await simpleStorage.deployTransaction.wait(6) //--> especially used to wait for contract deployment transactions
        await verify(simpleStorage.address, [])
    }

    //now let's try interacting with the contract again
    const currentValue = await simpleStorage.retrieve() //--> a function in our contract
    console.log(`Current value is: ${currentValue}`)

    //updating the value through a function defined inside our contract
    const transactionResponse = await simpleStorage.store(44)
    await transactionResponse.wait(1) //--> used to wait for more general transactions
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is: ${updatedValue}`)

    //no private key for an account?
    //no rpc url?

    //Hardhat by default runs a fake ethereum blockchain, kinda like ganache, so that's why we don't need to put it

    //but if we're using a custom or test network, we DO need a private key AND an RPC URL
}

//ALRIGHT, TIME TO VERFIY CONTRACTS THROUGH PROGRAMMING
async function verify(contractAddress, args){
  //"args" are constructor arguments passed to the contract during deployment, but maybe also during verification???

  console.log("Verifying contract...")
  
  //can run tasks by using the "run" method

  //running the verify task here
  //the first verify is for spefifying what task we want to run, the second one is to select different options
  //other options could be 'verify:get-compiler-versions' and stuff like that
  try{
    //if the contract is already verified, it's gonna throw an error
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args
    });
  }catch(e){
    if(e.message.toLowerCase().includes("already verified")){
      console.log("Contract is already verified!")
    }else{
      console.log(e)
    }
  }

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
