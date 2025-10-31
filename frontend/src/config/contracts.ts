export const STAKING_CONTRACT = {
  address: '0x0000000000000000000000000000000000000000',
  abi: [
    {
      inputs: [{ internalType: 'address', name: 'zcoinAddress', type: 'address' }],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'user', type: 'address' },
        { indexed: false, internalType: 'uint256', name: 'rewardAmount', type: 'uint256' },
      ],
      name: 'RewardClaimed',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'user', type: 'address' },
        { indexed: false, internalType: 'uint256', name: 'amountWei', type: 'uint256' },
      ],
      name: 'Staked',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'user', type: 'address' },
        { indexed: false, internalType: 'uint256', name: 'amountWei', type: 'uint256' },
      ],
      name: 'Withdrawn',
      type: 'event',
    },
    {
      inputs: [],
      name: 'claimRewards',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
      name: 'encryptedRewardsOf',
      outputs: [{ internalType: 'euint64', name: '', type: 'bytes32' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
      name: 'encryptedStakeOf',
      outputs: [{ internalType: 'euint64', name: '', type: 'bytes32' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
      name: 'lastAccrualOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'stake',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
      name: 'stakeUnitsOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: 'amountWei', type: 'uint256' }],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      stateMutability: 'payable',
      type: 'receive',
    },
  ],
} as const;

export const ZCOIN_CONTRACT = {
  address: '0x0000000000000000000000000000000000000000',
  abi: [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'confidentialBalanceOf',
      outputs: [{ internalType: 'euint64', name: '', type: 'bytes32' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'newStakingContract', type: 'address' }],
      name: 'setStakingContract',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'stakingContract',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint64', name: 'amountPlain', type: 'uint64' },
      ],
      name: 'mintPlain',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
} as const;
