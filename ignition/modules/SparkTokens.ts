import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SparkTokensModule = buildModule("SparkTokens", (m) => {
  const owner = m.getAccount(0);
  
  const initialSupply = "1000000000000000000000000000";
  
  const tokenA = m.contract("SparkToken", [
    "Spark Token A",
    "SPKA",
    18,
    initialSupply,
    owner
  ], {
    id: "SparkTokenA_Deterministic"
  });
  
  const tokenB = m.contract("SparkToken", [
    "Spark Token B",
    "SPKB",
    18,
    initialSupply,
    owner
  ], {
    id: "SparkTokenB_Deterministic"
  });
  
  return { tokenA, tokenB };
});

export default SparkTokensModule;