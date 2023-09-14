const hre = require("hardhat");

async function getBalance(address) {
  const balance = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balance);
}

async function consoleBalance(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalance(address));
    counter++;
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;

    console.log(`At ${timestamp}, name: ${name}, address: ${from}, message: ${message}`);
  }
}

async function main() {
  const [owner, from1, from2,from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.deployContract('chai');
  // const contract = await chai.deploy(); //instance of contract

  await chai.waitForDeployment();
  console.log("Address of contract:", await chai.getAddress());

  const addresses=[owner.address,from1.address,from2.address,from3.address];
  console.log("Before chai");
  await consoleBalance(addresses);

  const amount= {value: hre.ethers.parseEther("1")};
  await chai.connect(from1).buy("from1","very good",amount);
  await chai.connect(from2).buy("from2","very good",amount);
  await chai.connect(from3).buy("from3","very good",amount);
  console.log("After chai");
  await consoleBalance(addresses);

  const memos= await chai.get();
  consoleMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
