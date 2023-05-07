const { expect } = require("chai");

describe("Counter contract", function () {
  let Counter;
  let counter;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Deploy Counter contract before each test
    Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy();
    await counter.deployed();

    // Get some Ethereum addresses to use as test accounts
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Initial count should be zero", async function () {
    // Check the initial count of the counter
    expect(await counter.getCount()).to.equal(0);
  });

  it("Count should increment", async function () {
    // Call the increment function and check the new count
    await counter.increment();
    expect(await counter.getCount()).to.equal(1);
  });

  it("Count should decrement", async function () {
    // Call the decrement function and check the new count
    await counter.decrement();
    expect(await counter.getCount()).to.equal(-1);
  });

  it("Only owner can call increment", async function () {
    // Call the increment function from a non-owner account and check the count doesn't change
    await counter.connect(addr1).increment();
    expect(await counter.getCount()).to.equal(0);

    // Call the increment function from the owner account and check the new count
    await counter.connect(owner).increment();
    expect(await counter.getCount()).to.equal(1);
  });

  it("Owner can transfer ownership", async function () {
    // Transfer ownership to addr1 and check the new owner
    await counter.transferOwnership(addr1.address);
    expect(await counter.owner()).to.equal(addr1.address);

    // Call increment from new owner and check the count
    await counter.connect(addr1).increment();
    expect(await counter.getCount()).to.equal(1);

    // Transfer ownership back to original owner and check the new owner
    await counter.transferOwnership(owner.address);
    expect(await counter.owner()).to.equal(owner.address);
  });
});
