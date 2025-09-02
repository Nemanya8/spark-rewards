import hre from "hardhat"
import { expect } from "chai"

describe("MyToken", () => {
    it("deploys successfully", async () => {
        const MyToken = await hre.ethers.getContractFactory("MyToken")
        const token = await MyToken.deploy(hre.ethers.parseUnits("1000000", 18))
        await token.waitForDeployment()
        
        expect(await token.getAddress()).to.be.properAddress
    })
})