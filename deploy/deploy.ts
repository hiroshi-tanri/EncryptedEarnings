import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const zcoinDeployment = await deploy("ERC7984Zcoin", {
    from: deployer,
    log: true,
  });

  const stakingDeployment = await deploy("EncryptedStaking", {
    from: deployer,
    args: [zcoinDeployment.address],
    log: true,
  });

  const deployerSigner = await hre.ethers.getSigner(deployer);
  const zcoinContract = await hre.ethers.getContractAt("ERC7984Zcoin", zcoinDeployment.address, deployerSigner);
  const tx = await zcoinContract.setStakingContract(stakingDeployment.address);
  await tx.wait();

  console.log(`ERC7984Zcoin deployed at ${zcoinDeployment.address}`);
  console.log(`EncryptedStaking deployed at ${stakingDeployment.address}`);
};
export default func;
func.id = "deploy_encrypted_staking"; // id required to prevent reexecution
func.tags = ["EncryptedStaking", "ERC7984Zcoin"];
