const { ethers } = require("hardhat")
const { assert, expect } = require("chai");



describe("SimpleStorage", function(){
  //what we want to do before running each "it"
  let SimpleStorageFactory, simpleStorage;

  //deploying our contract before testing it
  beforeEach(async function(){
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await SimpleStorageFactory.deploy();
  })

  //where we ACTUALLY write the test logic
  it("Should start with an initial value of 0", async function(){
    const initialValue = await simpleStorage.retrieve();
    const expectedValue = "0";

    assert.equal(initialValue.toString(), expectedValue);
  })
  it("Should update when we call store", async function(){
    const expectedValue = "87";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue)
  })
})

//to run individual tests from this file, we can use this command

// yarn hardhat test --grep [keywords_inside_it_description]
// yarn hardhat test --grep store


//or with it.only(...)