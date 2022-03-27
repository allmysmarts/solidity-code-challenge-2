# EthPool

## Requirements

https://github.com/exactly-finance/challenge

## Deploy

### Dependency Install

- `npm install`

### Deploy Contract

- `npx hardhat run scripts/deploy.js --network {network}`

### Verify Contract

- `npx hardhat --network {network} verify --contract "contracts/EthPool.sol:EthPool" {deployed-contract-address}`

### Test

- `npx hardhat test`

### Script to get status from EthPool

- `npx hardhat ethpool --address 0x835f17a6cc794156fFB697Fa8AeC9538dcB4F388 --network rinkeby`