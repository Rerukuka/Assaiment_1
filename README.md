# Simple Wallet Smart Contract

This project contains a simple Ethereum smart contract for managing Ether deposits and withdrawals, along with deployment and interaction scripts.

## Project Structure

```
├── Node_moludes
├── SimpleWallet.sol          # Solidity contract for a simple wallet
├── deploy.js                # Deployment script for the smart contract
├── interact.js              # Script to interact with the deployed contract
├── SimpleWallet_abi.json    # ABI (Application Binary Interface) for the contract
├── package.json             # Node.js project dependencies
├── package-lock.json        # Lock file for dependency management
├── LICENSE                  # Project license file
```

## Prerequisites
- Node.js (v14 or higher)
- Ganache (or any Ethereum testnet/local blockchain)
- MetaMask or any Web3 provider

## Installation
1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd blockchain-assignment
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Smart Contract
### SimpleWallet.sol
- A simple wallet contract allowing Ether deposits and withdrawals.
- Functions:
  - `getBalance()`: Returns the balance of the contract.
  - `withdraw()`: Allows the owner to withdraw all Ether.
  - `receive() external payable`: Fallback function to accept Ether.

## Deployment
### deploy.js
- Reads and compiles the `SimpleWallet.sol` contract using `solc`.
- Deploys the contract to the Ethereum blockchain (Ganache by default).
- Saves the ABI to `SimpleWallet_abi.json`.

#### Run Deployment:
```bash
node deploy.js
```
- After deployment, update the contract address in `interact.js`.

## Interaction
### interact.js
- Provides methods to interact with the deployed contract.
- Functions:
  - `checkBalance()`: Logs the current contract balance.
  - `sendEther(amount)`: Sends Ether to the contract.
  - `withdrawFunds()`: Withdraws all Ether (owner-only).

#### Run Interaction Script:
```bash
node interact.js
```

## Configuration
- Update the contract address in `interact.js` after deployment:
```javascript
const contractAddress = '0xYourContractAddress';
```

## Dependencies
- Solidity compiler (`solc`) v0.8.0

```json
"dependencies": {
  "solc": "^0.8.0"
}
```

## License
This project is licensed under the terms of the MIT license. See the LICENSE file for details.

