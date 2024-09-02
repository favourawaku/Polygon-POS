// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require("@nomicfoundation/hardhat-foundry");
const tokenContractJSON = require("../../artifacts/contracts/MetaToken.sol/MetaToken.json");

const tokenAddress = "0x2bE296dffcFdB57ffabb2aAb6B1c37bb12c349C8"; // place your erc20 contract address here
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0xf1e20170ffFcE8A54b263C951150b8245453FE82"; // place your public address for your wallet here

async function main() {
  const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

  console.log(
    "You now have: " + (await token.balanceOf(walletAddress)) + " tokens"
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
