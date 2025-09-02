import { expect } from "chai";
import { ethers } from "hardhat";
import { SparkRewardsTestBase, setupSparkRewards } from "./SparkRewardsTestBase";

describe("SparkRewards", function () {
  let testBase: SparkRewardsTestBase;

  beforeEach(async function () {
    testBase = await setupSparkRewards();
  });

  describe("Deployment", function () {
    it("Should set the correct admin", async function () {
      expect(await testBase.rewards.hasRole(testBase.DEFAULT_ADMIN_ROLE, testBase.admin.address)).to.be.true;
    });

    it("Should grant EPOCH_ROLE to epochAdmin", async function () {
      expect(await testBase.rewards.hasRole(testBase.EPOCH_ROLE, testBase.epochAdmin.address)).to.be.true;
    });

    it("Should grant MERKLE_ROOT_ROLE to merkleRootAdmin", async function () {
      expect(await testBase.rewards.hasRole(testBase.MERKLE_ROOT_ROLE, testBase.merkleRootAdmin.address)).to.be.true;
    });

    it("Should have correct role values", async function () {
      expect(testBase.DEFAULT_ADMIN_ROLE).to.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
      expect(testBase.EPOCH_ROLE).to.equal(ethers.keccak256(ethers.toUtf8Bytes("EPOCH_ROLE")));
      expect(testBase.MERKLE_ROOT_ROLE).to.equal(ethers.keccak256(ethers.toUtf8Bytes("MERKLE_ROOT_ROLE")));
    });
  });
});