import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@parity/hardhat-polkadot"

const config: HardhatUserConfig = {
    solidity: "0.8.20",
    resolc: {
        compilerSource: "npm",
    },
    networks: {
        hardhat: {
            polkavm: true,
            nodeConfig: {
            nodeBinaryPath: "./bin/revive-dev-node",
            dev: true,
            consensus: {
              seal: "instant-seal",
            },
            rpcPort: 8000,
          },
            adapterConfig: {
                adapterBinaryPath: "./bin/eth-rpc",
                dev: true,
            },
        
        },
    },
}

export default config
