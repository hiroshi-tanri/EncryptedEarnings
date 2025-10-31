import { FhevmType } from "@fhevm/hardhat-plugin";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("staking:address", "Prints the EncryptedStaking contract address").setAction(async (_args, hre) => {
  const { deployments } = hre;
  const staking = await deployments.get("EncryptedStaking");
  console.log(`EncryptedStaking address: ${staking.address}`);
});

task("staking:stake", "Stake whole ETH amount")
  .addParam("amount", "Amount of ETH to stake (integer)")
  .setAction(async (taskArguments: TaskArguments, hre) => {
    const { deployments, ethers } = hre;
    const staking = await deployments.get("EncryptedStaking");
    const signer = (await ethers.getSigners())[0];

    const amountEth = BigInt(taskArguments.amount);
    const value = ethers.parseEther(amountEth.toString());

    const contract = await ethers.getContractAt("EncryptedStaking", staking.address);
    const tx = await contract.connect(signer).stake({ value });
    console.log(`Stake tx: ${tx.hash}`);
    await tx.wait();
  });

task("staking:withdraw", "Withdraw whole ETH amount")
  .addParam("amount", "Amount of ETH to withdraw (integer)")
  .setAction(async (taskArguments: TaskArguments, hre) => {
    const { deployments, ethers } = hre;
    const staking = await deployments.get("EncryptedStaking");
    const signer = (await ethers.getSigners())[0];

    const amountEth = BigInt(taskArguments.amount);
    const amountWei = ethers.parseEther(amountEth.toString());

    const contract = await ethers.getContractAt("EncryptedStaking", staking.address);
    const tx = await contract.connect(signer).withdraw(amountWei);
    console.log(`Withdraw tx: ${tx.hash}`);
    await tx.wait();
  });

task("staking:claim", "Claim accumulated rewards").setAction(async (_args, hre) => {
  const { deployments, ethers } = hre;
  const staking = await deployments.get("EncryptedStaking");
  const signer = (await ethers.getSigners())[0];

  const contract = await ethers.getContractAt("EncryptedStaking", staking.address);
  const tx = await contract.connect(signer).claimRewards();
  console.log(`Claim tx: ${tx.hash}`);
  await tx.wait();
});

task("staking:decrypt-stake", "Decrypt encrypted stake amount")
  .addOptionalParam("address", "Optionally specify an address to inspect")
  .setAction(async (taskArguments: TaskArguments, hre) => {
    const { deployments, ethers, fhevm } = hre;
    await fhevm.initializeCLIApi();

    const stakingDeployment = await deployments.get("EncryptedStaking");
    const signer = (await ethers.getSigners())[0];
    const target = taskArguments.address ?? signer.address;

    const contract = await ethers.getContractAt("EncryptedStaking", stakingDeployment.address);
    const encryptedStake = await contract.encryptedStakeOf(target);

    const decryptedStake = await fhevm.userDecryptEuint(
      FhevmType.euint64,
      encryptedStake,
      stakingDeployment.address,
      signer,
    );

    console.log(`Encrypted stake (${target}): ${encryptedStake}`);
    console.log(`Stake in whole ETH units : ${decryptedStake}`);
  });

task("staking:decrypt-reward", "Decrypt pending reward amount")
  .addOptionalParam("address", "Optionally specify an address to inspect")
  .setAction(async (taskArguments: TaskArguments, hre) => {
    const { deployments, ethers, fhevm } = hre;
    await fhevm.initializeCLIApi();

    const stakingDeployment = await deployments.get("EncryptedStaking");
    const signer = (await ethers.getSigners())[0];
    const target = taskArguments.address ?? signer.address;

    const contract = await ethers.getContractAt("EncryptedStaking", stakingDeployment.address);
    const encryptedReward = await contract.encryptedRewardsOf(target);

    const decryptedReward = await fhevm.userDecryptEuint(
      FhevmType.euint64,
      encryptedReward,
      stakingDeployment.address,
      signer,
    );

    console.log(`Encrypted reward (${target}): ${encryptedReward}`);
    console.log(`Reward in ZCoin base units: ${decryptedReward}`);
  });
