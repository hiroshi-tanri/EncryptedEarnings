# EncryptedEarnings

> Privacy-preserving ETH staking platform powered by Fully Homomorphic Encryption (FHE)

[![License: BSD-3-Clause-Clear](https://img.shields.io/badge/License-BSD--3--Clause--Clear-blue.svg)](LICENSE)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.27-e6e6e6?logo=solidity)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Built%20with-Hardhat-yellow)](https://hardhat.org/)
[![FHEVM](https://img.shields.io/badge/Powered%20by-FHEVM-purple)](https://docs.zama.ai/fhevm)

## Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Why EncryptedEarnings?](#why-encryptedearnings)
- [Technology Stack](#technology-stack)
- [Problems Solved](#problems-solved)
- [Architecture](#architecture)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Deployment](#deployment)
- [Usage Guide](#usage-guide)
  - [Smart Contract Interactions](#smart-contract-interactions)
  - [Frontend Application](#frontend-application)
- [Smart Contracts](#smart-contracts)
- [Testing](#testing)
- [Security Considerations](#security-considerations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Introduction

**EncryptedEarnings** is a revolutionary DeFi staking platform that brings true privacy to on-chain earnings. Built on Zama's FHEVM (Fully Homomorphic Encryption Virtual Machine), it allows users to stake ETH and earn ZCoin rewards while keeping their balances, stakes, and rewards completely confidential through cryptographic encryption.

Unlike traditional staking platforms where all balances are publicly visible on the blockchain, EncryptedEarnings ensures that sensitive financial information remains private. Users can stake ETH, accrue rewards over time, and manage their positions without revealing their holdings to the world.

### What Makes This Special?

- **Privacy-First Design**: All balances and rewards are encrypted on-chain using FHE
- **Transparent Rewards**: Earn 1,000 ZCoin per staked ETH every 24 hours
- **Confidential Token Standard**: Implements ERC7984 for fully encrypted token balances
- **User-Controlled Decryption**: Only you can decrypt your own balance information
- **Production-Ready**: Built with enterprise-grade Hardhat development framework

## Key Features

### 1. Encrypted Staking

- **Stake ETH**: Deposit whole ETH amounts (1 ETH, 2 ETH, etc.) to earn rewards
- **Confidential Balances**: Your stake amount is encrypted on-chain using FHE
- **No Public Disclosure**: Nobody can see how much you've staked without your permission

### 2. Private Reward Accrual

- **Time-Based Rewards**: Earn 1,000 ZCoin per ETH per day (with 6 decimal precision)
- **Encrypted Rewards**: Reward balances are stored as encrypted values
- **Real-Time Accrual**: Rewards accumulate every second you maintain your stake
- **Claim When Ready**: Withdraw your rewards at any time

### 3. ERC7984 Confidential Tokens

- **ZCoin Rewards**: Receive rewards in a confidential ERC7984 token
- **Encrypted Transfers**: All token balances remain encrypted
- **Standard Compliance**: Follows the ERC7984 confidential token standard
- **DeFi Compatible**: Can be integrated with other privacy-preserving protocols

### 4. Flexible Withdrawals

- **Partial Withdrawals**: Remove portions of your stake while keeping rewards active
- **No Lock-Ups**: Withdraw your staked ETH at any time
- **Continued Earning**: Remaining stake continues to accrue rewards

### 5. Modern Web3 Frontend

- **React + TypeScript**: Type-safe, modern user interface
- **RainbowKit Integration**: Seamless wallet connection experience
- **Real-Time Updates**: Live display of encrypted balances and rewards
- **Client-Side Decryption**: Decrypt your private data in the browser

## Why EncryptedEarnings?

### Privacy Matters

In traditional DeFi protocols, every transaction, balance, and interaction is publicly visible on the blockchain. This creates several problems:

1. **Front-Running**: Large stakers can be targeted by MEV bots
2. **Competitive Disadvantage**: Revealing your positions to competitors
3. **Personal Security**: Wealthy addresses become targets for exploits
4. **Financial Privacy**: Your financial activities are permanently public

EncryptedEarnings solves these problems by making privacy the default, not an afterthought.

### Advantages Over Traditional Staking

| Feature | Traditional Staking | EncryptedEarnings |
|---------|-------------------|-------------------|
| **Balance Privacy** | ❌ Public | ✅ Encrypted |
| **Reward Privacy** | ❌ Public | ✅ Encrypted |
| **Front-Running Protection** | ❌ Vulnerable | ✅ Protected |
| **User Control** | Limited | ✅ Full Control |
| **On-Chain Verification** | ✅ Yes | ✅ Yes (encrypted) |
| **Third-Party Access** | ❌ Open | ✅ Permission-based |

### Real-World Use Cases

1. **Institutional Investors**: Keep positions private while still earning yields
2. **Privacy-Conscious Users**: Protect personal financial information
3. **Competitive Traders**: Hide strategies from competitors
4. **High-Net-Worth Individuals**: Avoid becoming targets for exploits

## Technology Stack

### Smart Contracts

- **Solidity 0.8.27**: Latest stable Solidity with Cancun EVM features
- **FHEVM by Zama**: Fully Homomorphic Encryption Virtual Machine
  - `@fhevm/solidity`: Core FHE primitives and encrypted types
  - `euint64`: 64-bit encrypted unsigned integers
  - Encrypted arithmetic operations (add, sub, mul)
- **OpenZeppelin Confidential Contracts**: ERC7984 implementation
- **Hardhat**: Development environment and testing framework
  - TypeScript configuration
  - Hardhat Deploy for deployment management
  - Hardhat Verify for contract verification
  - Typechain for type-safe contract interactions

### Frontend

- **React 19**: Latest React with improved performance
- **TypeScript 5.8**: Type-safe development
- **Vite 7**: Lightning-fast build tool and dev server
- **Wagmi 2**: React hooks for Ethereum
- **RainbowKit 2**: Best-in-class wallet connection
- **ethers.js 6**: Ethereum library for contract interactions
- **@zama-fhe/relayer-sdk**: Client-side FHE decryption
- **@tanstack/react-query**: Efficient data fetching and caching

### Development Tools

- **Hardhat Network**: Local development blockchain
- **Hardhat Gas Reporter**: Gas usage optimization
- **Solhint**: Solidity linting
- **Prettier**: Code formatting
- **Mocha + Chai**: Testing framework
- **Solidity Coverage**: Code coverage analysis
- **ESLint**: TypeScript/JavaScript linting

### Deployment & Infrastructure

- **Sepolia Testnet**: Ethereum testnet deployment
- **Infura**: Node provider for testnet access
- **Etherscan**: Contract verification
- **FHEVM-Compatible Networks**: Any network supporting FHEVM

## Problems Solved

### 1. On-Chain Privacy

**Problem**: Traditional blockchains offer transparency but sacrifice privacy. Every transaction and balance is visible to everyone.

**Solution**: EncryptedEarnings uses FHEVM to perform computations on encrypted data. Smart contracts can process transactions without ever revealing the underlying amounts.

### 2. Selective Disclosure

**Problem**: Users often want to prove they have certain holdings without revealing exact amounts.

**Solution**: With FHE, users can selectively decrypt and share specific information while keeping everything else private.

### 3. Front-Running and MEV

**Problem**: Public transaction data allows bots to front-run large transactions, extracting value from users.

**Solution**: Encrypted transactions prevent MEV bots from seeing transaction details until after execution.

### 4. Competitive Intelligence

**Problem**: In financial markets, revealing your positions gives competitors an advantage.

**Solution**: Encrypted balances keep your strategy private while still participating in DeFi protocols.

### 5. Regulatory Compliance

**Problem**: Some jurisdictions require financial privacy for users while maintaining auditability.

**Solution**: FHE allows authorized parties to decrypt data for compliance while keeping it private from the public.

## Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         User Interface                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ StakingApp   │  │ StakeForm    │  │ RewardsPanel │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│           │                 │                 │              │
│           └─────────────────┴─────────────────┘              │
│                          │                                   │
│                    Wagmi + ethers.js                         │
│                          │                                   │
└──────────────────────────┼───────────────────────────────────┘
                           │
                      Blockchain
┌──────────────────────────┼───────────────────────────────────┐
│                          ▼                                   │
│              ┌─────────────────────┐                         │
│              │  EncryptedStaking   │                         │
│              │    Smart Contract   │                         │
│              └─────────────────────┘                         │
│                          │                                   │
│          ┌───────────────┴───────────────┐                   │
│          │                               │                   │
│          ▼                               ▼                   │
│  ┌───────────────┐              ┌──────────────┐            │
│  │ ERC7984Zcoin  │              │ FHEVM Library│            │
│  │ (Confidential │◄─────────────┤ (Zama)       │            │
│  │    Token)     │              └──────────────┘            │
│  └───────────────┘                                           │
│                                                               │
│  Encrypted Data Storage:                                     │
│  • euint64 _encryptedStakes[user]                           │
│  • euint64 _encryptedRewards[user]                          │
│  • euint64 _confidentialBalances[user] (ZCoin)              │
└───────────────────────────────────────────────────────────────┘
```

### Smart Contract Architecture

#### EncryptedStaking.sol

The main staking contract managing encrypted ETH deposits and reward distribution.

**Key Components**:
- Encrypted stake tracking using `euint64`
- Time-based reward accrual calculation
- Plain stake units for gas optimization
- Permission-based decryption system

**State Variables**:
```solidity
mapping(address => euint64) private _encryptedStakes;  // Encrypted ETH stake
mapping(address => uint256) private _stakeUnits;        // Plain ETH units
mapping(address => euint64) private _encryptedRewards;  // Encrypted rewards
mapping(address => uint256) private _rewardPlain;       // Plain rewards cache
mapping(address => uint256) private _lastAccrual;       // Timestamp tracking
```

#### ERC7984Zcoin.sol

Confidential reward token implementing the ERC7984 standard.

**Features**:
- Encrypted balances for all holders
- Mint permissions limited to staking contract
- Standard ERC20-like interface with encryption
- Ownable access control

### Data Flow

#### Staking Flow
```
1. User stakes 5 ETH
   ├─→ Frontend: Sign transaction with 5 ETH value
   ├─→ Contract: Receive ETH
   ├─→ Encrypt: FHE.asEuint64(5)
   └─→ Store: _encryptedStakes[user] += encrypted(5)

2. Time passes (24 hours)
   ├─→ User requests claim
   ├─→ _accrue() calculates: 5 ETH × 1000 ZCoin × 86400s / 86400s
   ├─→ newReward = 5000 ZCoin (with 6 decimals)
   ├─→ Encrypt reward amount
   └─→ Mint encrypted ZCoin to user

3. User views balance
   ├─→ Frontend: Request encrypted balance
   ├─→ Contract: Return euint64 encrypted value
   ├─→ Frontend: User decrypts with private key
   └─→ Display: Show decrypted balance
```

### Encryption Mechanism

FHEVM uses Fully Homomorphic Encryption (FHE) to enable computation on encrypted data:

1. **Encryption**: Plain values are encrypted using FHE
2. **Computation**: Smart contracts perform math on encrypted values
3. **Access Control**: Only authorized addresses can decrypt
4. **Client-Side Decryption**: Users decrypt in their browser using private keys

Example:
```solidity
// Encrypt a value
euint64 encrypted = FHE.asEuint64(1000);

// Grant access permissions
FHE.allowThis(encrypted);  // Contract can use it
FHE.allow(encrypted, userAddress);  // User can decrypt it

// Perform encrypted arithmetic
euint64 result = FHE.add(encryptedA, encryptedB);
```

## How It Works

### For Users

1. **Connect Wallet**: Use MetaMask or any Web3 wallet via RainbowKit
2. **Stake ETH**: Deposit whole ETH amounts (minimum 1 ETH)
3. **Earn Rewards**: Automatically accrue 1,000 ZCoin per ETH per day
4. **View Encrypted Balances**: Decrypt your balances in the UI
5. **Claim Rewards**: Withdraw ZCoin to your wallet
6. **Withdraw Stakes**: Remove ETH whenever you want

### Reward Calculation

```
Reward = (Staked ETH) × (1000 ZCoin/ETH/day) × (Time Elapsed in Seconds) / 86400
```

**Example**:
- Stake: 3 ETH
- Duration: 12 hours (43,200 seconds)
- Reward: 3 × 1,000 × 43,200 / 86,400 = 1,500 ZCoin

### Privacy Model

- **On-Chain**: All balances stored as `euint64` encrypted values
- **Computation**: Contracts perform calculations without decrypting
- **Decryption**: Only the data owner (user) can decrypt their values
- **Permissions**: Contract owner can grant/revoke decryption permissions
- **Public Info**: Only events (Staked, Withdrawn, RewardClaimed) show amounts

## Getting Started

### Prerequisites

- **Node.js**: Version 20 or higher
- **npm**: Version 7.0.0 or higher
- **Git**: For cloning the repository
- **MetaMask**: Or another Web3 wallet

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/EncryptedEarnings.git
   cd EncryptedEarnings
   ```

2. **Install backend dependencies**

   ```bash
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```bash
   # Required for deployment
   PRIVATE_KEY=your_private_key_here

   # Required for Sepolia testnet
   INFURA_API_KEY=your_infura_api_key

   # Optional for contract verification
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

   Or use Hardhat's secure variable storage:

   ```bash
   npx hardhat vars set PRIVATE_KEY
   npx hardhat vars set INFURA_API_KEY
   npx hardhat vars set ETHERSCAN_API_KEY
   ```

### Running Locally

#### 1. Start Local Hardhat Node

```bash
# Terminal 1: Start local blockchain with FHEVM support
npx hardhat node
```

#### 2. Deploy Contracts

```bash
# Terminal 2: Deploy to local network
npx hardhat deploy --network localhost
```

#### 3. Run Frontend

```bash
# Terminal 2: Navigate to frontend and start dev server
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

### Deployment

#### Deploy to Sepolia Testnet

1. **Ensure you have Sepolia ETH**

   Get testnet ETH from a [Sepolia faucet](https://sepoliafaucet.com/)

2. **Deploy contracts**

   ```bash
   npm run deploy:sepolia
   ```

3. **Verify contracts on Etherscan**

   ```bash
   npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
   ```

4. **Configure frontend**

   Update `frontend/src/config/contracts.ts` with deployed addresses:

   ```typescript
   export const STAKING_CONTRACT = '0x...';
   export const ZCOIN_CONTRACT = '0x...';
   ```

5. **Build and deploy frontend**

   ```bash
   cd frontend
   npm run build
   # Deploy dist/ folder to your hosting provider
   ```

## Usage Guide

### Smart Contract Interactions

#### Using Hardhat Tasks

The project includes convenient Hardhat tasks for contract interaction:

**View Contract Address**
```bash
npx hardhat staking:address --network sepolia
```

**Stake ETH**
```bash
# Stake 5 ETH
npx hardhat staking:stake --amount 5 --network sepolia
```

**Withdraw ETH**
```bash
# Withdraw 2 ETH
npx hardhat staking:withdraw --amount 2 --network sepolia
```

**Claim Rewards**
```bash
npx hardhat staking:claim --network sepolia
```

**Decrypt Your Stake**
```bash
# Decrypt your own stake
npx hardhat staking:decrypt-stake --network sepolia

# Decrypt someone else's stake (requires permission)
npx hardhat staking:decrypt-stake --address 0x... --network sepolia
```

**Decrypt Your Rewards**
```bash
npx hardhat staking:decrypt-reward --network sepolia
```

#### Direct Contract Calls

```javascript
// Using ethers.js
const stakingContract = await ethers.getContractAt(
  "EncryptedStaking",
  STAKING_ADDRESS
);

// Stake 3 ETH
await stakingContract.stake({ value: ethers.parseEther("3") });

// Withdraw 1 ETH
await stakingContract.withdraw(ethers.parseEther("1"));

// Claim rewards
await stakingContract.claimRewards();

// Get encrypted stake
const encryptedStake = await stakingContract.encryptedStakeOf(userAddress);

// Get encrypted rewards
const encryptedRewards = await stakingContract.encryptedRewardsOf(userAddress);
```

### Frontend Application

#### Connect Wallet

1. Click "Connect Wallet" button
2. Select your preferred wallet (MetaMask, WalletConnect, etc.)
3. Approve the connection

#### Stake ETH

1. Enter the amount of ETH to stake (whole numbers only)
2. Click "Stake ETH"
3. Confirm the transaction in your wallet
4. Wait for confirmation

#### View Your Positions

The Rewards Panel shows:
- **Encrypted Stake**: Your total staked ETH (encrypted on-chain, decrypted in UI)
- **Encrypted Rewards**: Your accumulated ZCoin rewards
- **Last Accrual**: Timestamp of last reward calculation

#### Claim Rewards

1. Navigate to Rewards Panel
2. Click "Claim Rewards"
3. Confirm transaction
4. ZCoin tokens will be minted to your wallet

#### Withdraw Stake

1. Enter amount to withdraw in the Stake Form
2. Select "Withdraw" tab
3. Click "Withdraw ETH"
4. Confirm transaction

## Smart Contracts

### EncryptedStaking.sol

**Location**: `contracts/EncryptedStaking.sol`

**Functions**:

| Function | Visibility | Description |
|----------|-----------|-------------|
| `stake()` | external payable | Stake whole ETH amounts |
| `withdraw(uint256)` | external | Withdraw staked ETH |
| `claimRewards()` | external | Claim accumulated ZCoin rewards |
| `encryptedStakeOf(address)` | external view | Get encrypted stake amount |
| `encryptedRewardsOf(address)` | external view | Get encrypted reward amount |
| `stakeUnitsOf(address)` | external view | Get plain stake units |
| `lastAccrualOf(address)` | external view | Get last accrual timestamp |

**Events**:
```solidity
event Staked(address indexed user, uint256 amountWei);
event Withdrawn(address indexed user, uint256 amountWei);
event RewardClaimed(address indexed user, uint256 rewardAmount);
```

**Constants**:
```solidity
uint64 public constant SECONDS_PER_DAY = 86_400;
uint64 public constant REWARD_PER_ETH_PER_DAY = 1_000_000_000; // 1000 ZCoin (6 decimals)
uint64 public constant MAX_STAKE_UNITS = 1_000_000; // Max 1M ETH per user
```

### ERC7984Zcoin.sol

**Location**: `contracts/ERC7984ZCoin.sol`

**Functions**:

| Function | Visibility | Description |
|----------|-----------|-------------|
| `setStakingContract(address)` | external (onlyOwner) | Set authorized minter |
| `mintEncrypted(address, euint64)` | external | Mint encrypted tokens |
| `mintPlain(address, uint64)` | external | Mint from plain amount |
| `confidentialBalanceOf(address)` | external view | Get encrypted balance (inherited) |

**Token Details**:
- **Name**: ZCoin
- **Symbol**: ZC
- **Decimals**: 6 (implied by REWARD_PER_ETH_PER_DAY)

## Testing

### Run All Tests

```bash
# Run tests on local Hardhat network
npm run test

# Run with gas reporting
REPORT_GAS=true npm run test

# Run tests on Sepolia
npm run test:sepolia
```

### Coverage

```bash
npm run coverage
```

### Test Structure

**Location**: `test/EncryptedStaking.ts`

**Test Cases**:
1. ✅ Stake ETH and verify encrypted stake
2. ✅ Accrue rewards over time
3. ✅ Claim rewards and verify ZCoin balance
4. ✅ Withdraw partial stake
5. ✅ Decrypt encrypted values

### Writing Tests

```typescript
import { expect } from "chai";
import { ethers, fhevm } from "hardhat";
import { FhevmType } from "@fhevm/hardhat-plugin";

it("should stake and decrypt", async () => {
  await fhevm.initializeCLIApi();

  await staking.connect(user).stake({ value: ethers.parseEther("2") });

  const encrypted = await staking.encryptedStakeOf(user.address);
  const decrypted = await fhevm.userDecryptEuint(
    FhevmType.euint64,
    encrypted,
    await staking.getAddress(),
    user
  );

  expect(decrypted).to.equal(2n);
});
```

## Security Considerations

### Audit Status

🚨 **This project has NOT been audited.** Do not use in production with real funds without a professional security audit.

### Known Considerations

1. **Whole ETH Requirement**: Only whole ETH amounts can be staked to prevent precision issues
2. **Reward Overflow**: Rewards capped at `type(uint64).max` to prevent overflow
3. **Stake Limit**: Maximum 1M ETH per user to prevent overflow
4. **Front-Running**: Encrypted values mitigate but don't eliminate all MEV risks
5. **Gas Costs**: FHE operations are more expensive than plain operations

### Best Practices

- **Start Small**: Test with small amounts on testnet first
- **Understand FHE**: Learn about homomorphic encryption limitations
- **Key Management**: Protect private keys used for decryption
- **Monitor Events**: Track Staked/Withdrawn/RewardClaimed events
- **Verify Contracts**: Always verify contract source code on Etherscan

### Emergency Procedures

If you encounter issues:

1. **Check Permissions**: Ensure you have decryption permissions
2. **Verify Network**: Confirm you're on the correct network
3. **Check Balance**: Ensure sufficient ETH for gas
4. **Review Logs**: Check blockchain explorer for transaction details
5. **Contact Support**: Open an issue on GitHub

## Roadmap

### Phase 1: Foundation ✅ (Current)

- [x] Core staking contract with encrypted stakes
- [x] ERC7984 confidential token implementation
- [x] Basic reward accrual mechanism
- [x] React frontend with wallet integration
- [x] Hardhat deployment infrastructure
- [x] Sepolia testnet deployment

### Phase 2: Enhanced Features 🚧 (Q2 2025)

- [ ] **Multi-Asset Staking**: Support for other tokens (USDC, DAI, etc.)
- [ ] **Variable APY**: Dynamic reward rates based on TVL
- [ ] **Compound Rewards**: Auto-restake rewards
- [ ] **Delegation**: Allow delegated staking for others
- [ ] **Lock Periods**: Optional lock-ups for boosted rewards
- [ ] **NFT Receipts**: Issue NFTs representing staking positions

### Phase 3: Advanced Privacy 🔮 (Q3 2025)

- [ ] **Private Transfers**: Encrypted ZCoin transfers between users
- [ ] **Confidential Governance**: Vote with encrypted token weights
- [ ] **Zero-Knowledge Proofs**: Prove stake without revealing amount
- [ ] **Multi-Party Computation**: Advanced privacy features
- [ ] **Anonymous Staking**: Stake through privacy pools
- [ ] **Compliance Layer**: Selective disclosure for regulation

### Phase 4: Ecosystem Integration 🌐 (Q4 2025)

- [ ] **Cross-Chain Staking**: Bridge to other FHEVM chains
- [ ] **DeFi Integrations**: Liquidity pools, lending markets
- [ ] **Mobile App**: iOS and Android applications
- [ ] **DAO Governance**: Decentralized protocol governance
- [ ] **API & SDK**: Developer tools for integration
- [ ] **Institutional Features**: Custody, reporting, compliance

### Phase 5: Production & Scale 🚀 (2026)

- [ ] **Professional Audit**: Multiple security audits
- [ ] **Mainnet Launch**: Ethereum mainnet deployment
- [ ] **Insurance**: Smart contract insurance coverage
- [ ] **Performance Optimization**: Gas optimization, batching
- [ ] **Advanced Analytics**: Dashboards, reporting tools
- [ ] **Institutional Adoption**: Enterprise-grade features

### Research & Innovation 🔬 (Ongoing)

- [ ] **FHE Performance**: Optimize encrypted computations
- [ ] **New Crypto Primitives**: Explore new encryption schemes
- [ ] **Scalability Solutions**: Layer 2 integration
- [ ] **Interoperability**: Cross-protocol standards
- [ ] **Regulatory Compliance**: Privacy-preserving compliance tools

## Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **Report Bugs**: Open issues for any bugs you find
2. **Suggest Features**: Propose new features or improvements
3. **Submit PRs**: Fix bugs or implement new features
4. **Improve Docs**: Enhance documentation and examples
5. **Write Tests**: Increase test coverage
6. **Security Research**: Help identify vulnerabilities

### Development Workflow

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests for new features
   - Update documentation

4. **Run tests and linting**
   ```bash
   npm run test
   npm run lint
   npm run prettier:write
   ```

5. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

   Use [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New features
   - `fix:` Bug fixes
   - `docs:` Documentation changes
   - `test:` Test additions or changes
   - `refactor:` Code refactoring
   - `style:` Code style changes
   - `chore:` Maintenance tasks

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Provide a clear description
   - Reference any related issues
   - Ensure CI checks pass

### Code Standards

- **Solidity**: Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- **TypeScript**: Use ESLint and Prettier configurations
- **Testing**: Maintain >80% code coverage
- **Documentation**: Document all public functions with NatSpec
- **Gas Optimization**: Consider gas costs in contract design

### Testing Guidelines

- Write unit tests for all new functions
- Include integration tests for complex flows
- Test edge cases and error conditions
- Use descriptive test names
- Mock external dependencies

### Community Guidelines

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)

## License

This project is licensed under the **BSD-3-Clause-Clear License**.

See the [LICENSE](LICENSE) file for full details.

### Key Points

- ✅ Free to use, modify, and distribute
- ✅ Can be used commercially
- ✅ Must preserve copyright notices
- ❌ No patent grant (Clear clause)
- ❌ No warranty or liability

## Support

### Documentation

- **Project Docs**: This README and inline documentation
- **FHEVM Docs**: [https://docs.zama.ai/fhevm](https://docs.zama.ai/fhevm)
- **Hardhat Docs**: [https://hardhat.org/docs](https://hardhat.org/docs)
- **Wagmi Docs**: [https://wagmi.sh](https://wagmi.sh)

### Get Help

- **GitHub Issues**: [Report bugs or ask questions](https://github.com/yourusername/EncryptedEarnings/issues)
- **GitHub Discussions**: [Community discussions](https://github.com/yourusername/EncryptedEarnings/discussions)
- **Zama Discord**: [Join the Zama community](https://discord.gg/zama)
- **Twitter**: [@YourTwitterHandle](https://twitter.com/yourhandle)

### Frequently Asked Questions

**Q: Why can I only stake whole ETH amounts?**

A: This prevents precision issues with encrypted arithmetic and simplifies reward calculations.

**Q: How do I decrypt my balances?**

A: The frontend automatically decrypts your balances using your wallet's signature. You can also use Hardhat tasks.

**Q: Is this safe to use with real money?**

A: No, this project has not been audited. Only use testnet funds until a professional audit is completed.

**Q: What networks are supported?**

A: Currently Sepolia testnet and local Hardhat network. Mainnet support coming after audit.

**Q: Can I transfer my ZCoin tokens?**

A: Yes, ZCoin follows the ERC7984 standard and supports encrypted transfers.

**Q: What happens if I lose my private key?**

A: You lose access to decrypt your balances, though the encrypted data remains on-chain.

**Q: How much does it cost to stake?**

A: Gas costs vary by network. On Sepolia testnet, it's a few cents. On mainnet it would be higher.

**Q: Can I stake from a smart contract?**

A: Yes, but the contract must handle FHEVM permissions correctly.

---

## Acknowledgments

- **Zama**: For building FHEVM and making on-chain privacy possible
- **OpenZeppelin**: For secure smart contract libraries
- **Hardhat**: For the excellent development framework
- **RainbowKit**: For beautiful wallet UX
- **The Ethereum Community**: For continuous innovation

---

**Built with ❤️ for a more private future**

*Privacy is not a feature, it's a fundamental right.*
