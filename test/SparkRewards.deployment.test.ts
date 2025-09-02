import { expect } from "chai";
import { ethers } from "hardhat";
import { SparkRewards } from "../typechain-types";

describe("SparkRewards - Deployment", function () {
  let sparkRewards: SparkRewards;
  let admin: any;

  beforeEach(async function () {
    [admin] = await ethers.getSigners();
    
    const SparkRewardsFactory = await ethers.getContractFactory("SparkRewards");
    sparkRewards = await SparkRewardsFactory.deploy(admin.address);
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(await sparkRewards.getAddress()).to.be.properAddress;
    });

    it("Should set the admin role correctly", async function () {
      const DEFAULT_ADMIN_ROLE = await sparkRewards.DEFAULT_ADMIN_ROLE();
      expect(await sparkRewards.hasRole(DEFAULT_ADMIN_ROLE, admin.address)).to.be.true;
    });

    it("Should initialize with default values", async function () {
      expect(await sparkRewards.wallet()).to.equal(ethers.ZeroAddress);
      expect(await sparkRewards.merkleRoot()).to.equal(ethers.ZeroHash);
    });

    it("Should have correct role constants", async function () {
      const EPOCH_ROLE = await sparkRewards.EPOCH_ROLE();
      const MERKLE_ROOT_ROLE = await sparkRewards.MERKLE_ROOT_ROLE();
      
      expect(EPOCH_ROLE).to.equal(ethers.keccak256(ethers.toUtf8Bytes("EPOCH_ROLE")));
      expect(MERKLE_ROOT_ROLE).to.equal(ethers.keccak256(ethers.toUtf8Bytes("MERKLE_ROOT_ROLE")));
    });
  });
});