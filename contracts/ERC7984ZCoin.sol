// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity ^0.8.27;

import {ERC7984} from "@openzeppelin/confidential-contracts/token/ERC7984/ERC7984.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";
import {FHE, euint64} from "@fhevm/solidity/lib/FHE.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title Confidential ZCoin token
/// @notice ERC7984 token used for distributing staking rewards
contract ERC7984Zcoin is ERC7984, SepoliaConfig, Ownable {
    error UnauthorizedMinter(address caller);

    address public stakingContract;

    event StakingContractUpdated(address indexed stakingContract);

    constructor() ERC7984("ZCoin", "ZC", "") Ownable(msg.sender) {}

    /// @notice Sets the staking contract allowed to mint new tokens
    /// @param newStakingContract Address of the staking contract
    function setStakingContract(address newStakingContract) external onlyOwner {
        stakingContract = newStakingContract;
        emit StakingContractUpdated(newStakingContract);
    }

    /// @notice Mints encrypted tokens to a recipient. Callable only by the staking contract.
    /// @param to Recipient address
    /// @param amount Encrypted amount to mint
    function mintEncrypted(address to, euint64 amount) external {
        if (msg.sender != stakingContract) {
            revert UnauthorizedMinter(msg.sender);
        }

        _mint(to, amount);
    }

    /// @notice Helper to mint using a plain amount. Callable only by the staking contract.
    /// @param to Recipient address
    /// @param amountPlain Plain amount expressed in token base units
    function mintPlain(address to, uint64 amountPlain) external {
        if (msg.sender != stakingContract) {
            revert UnauthorizedMinter(msg.sender);
        }

        euint64 encryptedAmount = FHE.asEuint64(amountPlain);
        FHE.allowThis(encryptedAmount);
        FHE.allow(encryptedAmount, to);
        _mint(to, encryptedAmount);
    }
}
