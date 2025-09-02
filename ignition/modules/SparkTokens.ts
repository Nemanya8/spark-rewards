import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SparkTokenAModule = buildModule("SparkTokenA", (m) => {
  const owner = m.getAccount(0);
  
  const initialSupply = "1000000000000000000000000000";
  
  const tokenA = m.contract("SparkToken", [
    "Spark Token A",
    "SPKA",
    18,
    initialSupply,
    owner
  ]);
  
  return { tokenA };
});

const SparkTokenBModule = buildModule("SparkTokenB", (m) => {
  const owner = m.getAccount(0);
  
  const initialSupply = "1000000000000000000000000000";
  
  const tokenB = m.contract("SparkToken", [
    "Spark Token B", 
    "SPKB",
    18,
    initialSupply,
    owner
  ]);
  
  return { tokenB };
});

export { SparkTokenAModule, SparkTokenBModule };