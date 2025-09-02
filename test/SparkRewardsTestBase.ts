import { ethers, ignition } from "hardhat";
import { SparkRewards } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import SparkRewardsModule from "../ignition/modules/SparkRewards";

export class SparkRewardsTestBase {
  public rewards!: SparkRewards;
  
  public admin!: SignerWithAddress;
  public epochAdmin!: SignerWithAddress;
  public merkleRootAdmin!: SignerWithAddress;
  
  public readonly DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";
  public readonly EPOCH_ROLE = ethers.keccak256(ethers.toUtf8Bytes("EPOCH_ROLE"));
  public readonly MERKLE_ROOT_ROLE = ethers.keccak256(ethers.toUtf8Bytes("MERKLE_ROOT_ROLE"));

  async setUp() {
    // Get signers for different roles
    const signers = await ethers.getSigners();
    this.admin = signers[0];
    this.epochAdmin = signers[1];
    this.merkleRootAdmin = signers[2];

    try {
      // Use Ignition for deterministic deployment
      // The determinism comes from the module ID and consistent parameters
      const { sparkRewards } = await ignition.deploy(SparkRewardsModule);
      this.rewards = sparkRewards as unknown as SparkRewards;
      
      console.log("Deployed via Ignition at:", await this.rewards.getAddress());
    } catch (error) {
      console.log("Ignition deployment failed, falling back to direct deployment");
      console.log("Error:", error);
      
      // Fallback: Direct deployment 
      const SparkRewards = await ethers.getContractFactory("SparkRewards");
      this.rewards = await SparkRewards.deploy(this.admin.address) as SparkRewards;
      await this.rewards.waitForDeployment();
      
      console.log("Deployed via direct deployment at:", await this.rewards.getAddress());
    }

    // Grant roles as admin
    await this.rewards.connect(this.admin).grantRole(this.EPOCH_ROLE, this.epochAdmin.address);
    await this.rewards.connect(this.admin).grantRole(this.MERKLE_ROOT_ROLE, this.merkleRootAdmin.address);
  }
}

export async function setupSparkRewards(): Promise<SparkRewardsTestBase> {
  const testBase = new SparkRewardsTestBase();
  await testBase.setUp();
  return testBase;
}