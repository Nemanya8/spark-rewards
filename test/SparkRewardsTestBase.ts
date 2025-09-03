import { ethers, network } from "hardhat";
import { SparkRewards, SparkToken } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

export class SparkRewardsTestBase {
    public rewards!: SparkRewards;
    public token1!: SparkToken;
    public token2!: SparkToken;
    
    public admin!: SignerWithAddress;
    public epochAdmin!: SignerWithAddress;
    public merkleRootAdmin!: SignerWithAddress;

    public readonly DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";
    public readonly EPOCH_ROLE = ethers.keccak256(ethers.toUtf8Bytes("EPOCH_ROLE"));
    public readonly MERKLE_ROOT_ROLE = ethers.keccak256(ethers.toUtf8Bytes("MERKLE_ROOT_ROLE"));

    public async setUp(): Promise<void> {
        const blockNumber = await network.provider.send("eth_blockNumber");
        console.log(`Current block number: ${parseInt(blockNumber, 16)}`);
        
        const signers = await ethers.getSigners();
        this.admin = signers[0];
        this.epochAdmin = signers[1];
        this.merkleRootAdmin = signers[2];

        const SparkRewardsFactory = await ethers.getContractFactory("SparkRewards");
        this.rewards = await SparkRewardsFactory.deploy(this.admin.address);
        await this.rewards.waitForDeployment();
        console.log(`SparkRewards deployed to: ${this.rewards.target}`);

        const SparkTokenFactory = await ethers.getContractFactory("SparkToken");
        this.token1 = await SparkTokenFactory.deploy(
            "Spark Token 1",
            "SPK1", 
            18,
            ethers.parseEther("1000000"),
            this.admin.address
        );
        await this.token1.waitForDeployment();
        console.log(`Token1 deployed to: ${this.token1.target}`);

        this.token2 = await SparkTokenFactory.deploy(
            "Spark Token 2",
            "SPK2",
            18,
            ethers.parseEther("1000000"),
            this.admin.address
        );
        await this.token2.waitForDeployment();
        console.log(`Token2 deployed to: ${this.token2.target}`);

        await this.rewards.connect(this.admin).grantRole(this.EPOCH_ROLE, this.epochAdmin.address);
        await this.rewards.connect(this.admin).grantRole(this.MERKLE_ROOT_ROLE, this.merkleRootAdmin.address);
    }
}