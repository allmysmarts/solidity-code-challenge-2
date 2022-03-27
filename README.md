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
