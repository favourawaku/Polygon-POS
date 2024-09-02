const hre = require("hardhat");
require("dotenv").config();

const fxERC721RootContractABI = require("../token/ERC721FxRootContractABI.json");

const fxERC721RootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const MetaTokenNFTFactory = await hre.ethers.getContractFactory(
    "MetaTokenNFT"
  );
  const metaTokenNFT = await MetaTokenNFTFactory.attach(
    process.env.CONTRACT_ADDRESS
  );

  const fxRootContract = await hre.ethers.getContractAt(
    fxERC721RootContractABI,
    fxERC721RootAddress
  );

  // Approve NFTs for transfer
  const approveTx = await metaTokenNFT
    .connect(deployer)
    .setApprovalForAll(fxERC721RootAddress, true);

  await approveTx.wait();

  console.log("NFT approval confirmed");

  // Deposit NFTs to Polygon Mumbai bridge
  const tokenAddress = "0x2bE296dffcFdB57ffabb2aAb6B1c37bb12c349C8";
  const walletAddress = "0xf1e20170ffFcE8A54b263C951150b8245453FE82";
  for (let i = 0; i < 5; i++) {
    const depositTx = await fxRootContract
      .connect(deployer)
      .deposit(tokenAddress, walletAddress, i, "0x6566");

    await depositTx.wait();
  }

  console.log("NFT deposited on Polygon Mumbai");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
