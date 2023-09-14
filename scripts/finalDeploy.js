const hre = require("hardhat");

async function main(){
    const chai = await hre.ethers.deployContract('chai');
  
    await chai.waitForDeployment();
    console.log("Address of contract:", await chai.getAddress());

  
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  