import { expect } from "chai";
import { ethers, network, fhevm } from "hardhat";
import { FhevmType } from "@fhevm/hardhat-plugin";
import type { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import type { ERC7984Zcoin, EncryptedStaking } from "../types";

describe("EncryptedStaking", function () {
  let deployer: HardhatEthersSigner;
  let user: HardhatEthersSigner;
  let zcoin: ERC7984Zcoin;
  let staking: EncryptedStaking;

  beforeEach(async () => {
    [deployer, user] = await ethers.getSigners();

    const ZcoinFactory = await ethers.getContractFactory("ERC7984Zcoin");
    zcoin = (await ZcoinFactory.connect(deployer).deploy()) as ERC7984Zcoin;
    await zcoin.waitForDeployment();

    const StakingFactory = await ethers.getContractFactory("EncryptedStaking");
    staking = (await StakingFactory.connect(deployer).deploy(await zcoin.getAddress())) as EncryptedStaking;
    await staking.waitForDeployment();

    await zcoin.connect(deployer).setStakingContract(await staking.getAddress());
  });

  it("stakes ETH and accrues encrypted rewards", async () => {
    await fhevm.initializeCLIApi();

    const stakeValue = ethers.parseEther("2");
    await staking.connect(user).stake({ value: stakeValue });

    const encryptedStake = await staking.encryptedStakeOf(user.address);
    const decryptedStake = await fhevm.userDecryptEuint(
      FhevmType.euint64,
      encryptedStake,
      await staking.getAddress(),
      user,
    );

    expect(decryptedStake).to.equal(2n);

    await network.provider.send("evm_increaseTime", [86_400]);
    await network.provider.send("evm_mine", []);

    const lastBeforeClaim = await staking.lastAccrualOf(user.address);
    const claimTx = await staking.connect(user).claimRewards();
    const claimReceipt = await claimTx.wait();
    const claimBlock = await ethers.provider.getBlock(claimReceipt!.blockNumber!);
    const elapsed = BigInt(claimBlock!.timestamp) - BigInt(lastBeforeClaim);

    const encryptedBalance = await zcoin.confidentialBalanceOf(user.address);
    const decryptedBalance = await fhevm.userDecryptEuint(
      FhevmType.euint64,
      encryptedBalance,
      await zcoin.getAddress(),
      user,
    );

    const expectedReward = (2n * 1_000_000_000n * elapsed) / 86_400n;
    expect(decryptedBalance).to.equal(expectedReward);

    const encryptedRewardsAfterClaim = await staking.encryptedRewardsOf(user.address);
    const decryptedRewardsAfterClaim = await fhevm.userDecryptEuint(
      FhevmType.euint64,
      encryptedRewardsAfterClaim,
      await staking.getAddress(),
      user,
    );

    expect(decryptedRewardsAfterClaim).to.equal(0n);

    await staking.connect(user).withdraw(ethers.parseEther("1"));

    const encryptedStakeAfterWithdraw = await staking.encryptedStakeOf(user.address);
    const decryptedStakeAfterWithdraw = await fhevm.userDecryptEuint(
      FhevmType.euint64,
      encryptedStakeAfterWithdraw,
      await staking.getAddress(),
      user,
    );

    expect(decryptedStakeAfterWithdraw).to.equal(1n);
  });
});
