// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.27;

import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";
import {FHE, euint64} from "@fhevm/solidity/lib/FHE.sol";
import {ERC7984Zcoin} from "./ERC7984ZCoin.sol";

/// @title Encrypted staking contract rewarding ZCoin tokens
/// @notice Users stake whole ETH amounts and accrue confidential ZCoin rewards
contract EncryptedStaking is SepoliaConfig {
    uint64 public constant SECONDS_PER_DAY = 86_400;
    uint64 public constant REWARD_PER_ETH_PER_DAY = 1_000_000_000; // 1000 ZCoin with 6 decimals
    uint64 public constant MAX_STAKE_UNITS = 1_000_000; // Max 1M ETH per user

    ERC7984Zcoin public immutable zcoin;

    mapping(address user => euint64 encryptedStake) private _encryptedStakes;
    mapping(address user => uint256 stakeUnits) private _stakeUnits;
    mapping(address user => euint64 encryptedRewards) private _encryptedRewards;
    mapping(address user => uint256 rewardPlain) private _rewardPlain;
    mapping(address user => uint256 lastAccrual) private _lastAccrual;

    event Staked(address indexed user, uint256 amountWei);
    event Withdrawn(address indexed user, uint256 amountWei);
    event RewardClaimed(address indexed user, uint256 rewardAmount);

    constructor(address zcoinAddress) {
        require(zcoinAddress != address(0), "Staking: invalid ZCoin");
        zcoin = ERC7984Zcoin(zcoinAddress);
    }

    receive() external payable {
        revert("Staking: use stake");
    }

    /// @notice Stake ETH (in whole ETH units) to start earning rewards
    function stake() external payable {
        require(msg.value > 0, "Staking: zero value");
        require(msg.value % 1 ether == 0, "Staking: stake whole ETH");

        uint256 units = msg.value / 1 ether;
        require(units <= type(uint64).max, "Staking: stake overflow");

        _accrue(msg.sender);

        uint256 newStakeUnits = _stakeUnits[msg.sender] + units;
        require(newStakeUnits <= MAX_STAKE_UNITS, "Staking: stake limit");
        _stakeUnits[msg.sender] = newStakeUnits;

        _increaseEncryptedStake(msg.sender, uint64(units));
        _lastAccrual[msg.sender] = block.timestamp;

        emit Staked(msg.sender, msg.value);
    }

    /// @notice Withdraw previously staked ETH (multiple of 1 ETH)
    /// @param amountWei Amount in wei to withdraw. Must be a whole ETH amount.
    function withdraw(uint256 amountWei) external {
        require(amountWei > 0, "Staking: zero withdraw");
        require(amountWei % 1 ether == 0, "Staking: withdraw whole ETH");

        uint256 units = amountWei / 1 ether;
        require(units <= type(uint64).max, "Staking: withdraw overflow");

        _accrue(msg.sender);

        uint256 currentStake = _stakeUnits[msg.sender];
        require(currentStake >= units, "Staking: insufficient stake");
        _stakeUnits[msg.sender] = currentStake - units;

        _decreaseEncryptedStake(msg.sender, uint64(units));
        _lastAccrual[msg.sender] = block.timestamp;

        (bool success, ) = msg.sender.call{value: amountWei}("");
        require(success, "Staking: withdraw failed");

        emit Withdrawn(msg.sender, amountWei);
    }

    /// @notice Claim all accumulated ZCoin rewards
    function claimRewards() external {
        _accrue(msg.sender);

        uint256 rewardAmount = _rewardPlain[msg.sender];
        require(rewardAmount > 0, "Staking: no rewards");
        require(rewardAmount <= type(uint64).max, "Staking: reward overflow");

        _rewardPlain[msg.sender] = 0;

        zcoin.mintPlain(msg.sender, uint64(rewardAmount));

        emit RewardClaimed(msg.sender, rewardAmount);

        _encryptedRewards[msg.sender] = _zeroCipherFor(msg.sender);
    }

    /// @notice Returns the encrypted stake amount for a user (in whole ETH units)
    function encryptedStakeOf(address user) external view returns (euint64) {
        return _encryptedStakes[user];
    }

    /// @notice Returns the encrypted pending reward snapshot for a user
    function encryptedRewardsOf(address user) external view returns (euint64) {
        return _encryptedRewards[user];
    }

    /// @notice Returns the timestamp of the last accrual update for a user
    function lastAccrualOf(address user) external view returns (uint256) {
        return _lastAccrual[user];
    }

    /// @notice Plain stake units helper (number of whole ETH staked)
    function stakeUnitsOf(address user) external view returns (uint256) {
        return _stakeUnits[user];
    }

    function _accrue(address user) internal {
        uint256 last = _lastAccrual[user];
        if (last == 0) {
            _lastAccrual[user] = block.timestamp;
            return;
        }

        if (block.timestamp <= last) {
            return;
        }

        uint256 stakedUnits = _stakeUnits[user];
        if (stakedUnits == 0) {
            _lastAccrual[user] = block.timestamp;
            return;
        }

        uint256 elapsed = block.timestamp - last;
        uint256 newReward = (stakedUnits * uint256(REWARD_PER_ETH_PER_DAY) * elapsed) / SECONDS_PER_DAY;
        if (newReward == 0) {
            _lastAccrual[user] = block.timestamp;
            return;
        }

        uint256 updatedReward = _rewardPlain[user] + newReward;
        require(updatedReward <= type(uint64).max, "Staking: reward limit");
        _rewardPlain[user] = updatedReward;

        euint64 increment = FHE.asEuint64(uint64(newReward));
        FHE.allowThis(increment);
        FHE.allow(increment, user);

        euint64 currentCipher = _encryptedRewards[user];
        euint64 updatedCipher = FHE.isInitialized(currentCipher) ? FHE.add(currentCipher, increment) : increment;
        FHE.allowThis(updatedCipher);
        FHE.allow(updatedCipher, user);
        _encryptedRewards[user] = updatedCipher;

        _lastAccrual[user] = block.timestamp;
    }

    function _increaseEncryptedStake(address user, uint64 amount) internal {
        euint64 increment = FHE.asEuint64(amount);
        FHE.allowThis(increment);
        FHE.allow(increment, user);

        euint64 currentCipher = _encryptedStakes[user];
        euint64 updatedCipher = FHE.isInitialized(currentCipher) ? FHE.add(currentCipher, increment) : increment;
        FHE.allowThis(updatedCipher);
        FHE.allow(updatedCipher, user);
        _encryptedStakes[user] = updatedCipher;
    }

    function _decreaseEncryptedStake(address user, uint64 amount) internal {
        euint64 decrement = FHE.asEuint64(amount);
        FHE.allowThis(decrement);
        FHE.allow(decrement, user);

        euint64 currentCipher = _encryptedStakes[user];
        euint64 updatedCipher = FHE.sub(currentCipher, decrement);
        FHE.allowThis(updatedCipher);
        FHE.allow(updatedCipher, user);
        _encryptedStakes[user] = updatedCipher;
    }

    function _zeroCipherFor(address user) internal returns (euint64) {
        euint64 zeroCipher = FHE.asEuint64(0);
        FHE.allowThis(zeroCipher);
        FHE.allow(zeroCipher, user);
        return zeroCipher;
    }
}
