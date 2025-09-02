import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SparkRewardsModule = buildModule("SparkRewards", (m) => {
  const admin = m.getAccount(0);
  
  const sparkRewards = m.contract("SparkRewards", [
    admin
  ], {
    id: "SparkRewards_Deterministic"
  });
  
  return { sparkRewards };
});

export default SparkRewardsModule;