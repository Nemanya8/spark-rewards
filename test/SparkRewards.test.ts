import { expect } from "chai";
import { network } from "hardhat";
import { SparkRewardsTestBase } from "./SparkRewardsTestBase";

describe("SparkRewards", function () {
    let testBase: SparkRewardsTestBase;

    beforeEach(async function () {
        await network.provider.send("hardhat_reset");
        testBase = new SparkRewardsTestBase();
        await testBase.setUp();
    });

    it("should deploy contracts at expected addresses", async function () {
        expect(testBase.rewards.target).to.equal("0xc01Ee7f10EA4aF4673cFff62710E1D7792aBa8f3");
        expect(testBase.token1.target).to.equal("0x970951a12F975E6762482ACA81E57D5A2A4e73F4");
        expect(testBase.token2.target).to.equal("0x3ed62137c5DB927cb137c26455969116BF0c23Cb");
    });

    it("should have correct admin addresses", async function () {
        expect(await testBase.rewards.hasRole(testBase.DEFAULT_ADMIN_ROLE, testBase.admin.address)).to.be.true;
        expect(await testBase.rewards.hasRole(testBase.EPOCH_ROLE, testBase.epochAdmin.address)).to.be.true;
        expect(await testBase.rewards.hasRole(testBase.MERKLE_ROOT_ROLE, testBase.merkleRootAdmin.address)).to.be.true;
    });
});