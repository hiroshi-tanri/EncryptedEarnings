import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { Contract } from 'ethers';
import { useEthersSigner } from '../hooks/useEthersSigner';
import { useZamaInstance } from '../hooks/useZamaInstance';
import { STAKING_CONTRACT } from '../config/contracts';
import { EncryptedValueCard } from './EncryptedValueCard';
import '../styles/RewardsPanel.css';

type RewardsPanelProps = {
  refreshKey: number;
};

const ZCOIN_DECIMALS = 6;

export function RewardsPanel({ refreshKey }: RewardsPanelProps) {
  const { address } = useAccount();
  const signerPromise = useEthersSigner();
  const { instance, isLoading: zamaLoading } = useZamaInstance();

  const [stakeDecrypted, setStakeDecrypted] = useState<string | null>(null);
  const [rewardDecrypted, setRewardDecrypted] = useState<string | null>(null);
  const [stakeDecrypting, setStakeDecrypting] = useState(false);
  const [rewardDecrypting, setRewardDecrypting] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const stakeQuery = useReadContract({
    address: STAKING_CONTRACT.address,
    abi: STAKING_CONTRACT.abi,
    functionName: 'encryptedStakeOf',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
      staleTime: 0,
    },
  });

  const rewardQuery = useReadContract({
    address: STAKING_CONTRACT.address,
    abi: STAKING_CONTRACT.abi,
    functionName: 'encryptedRewardsOf',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
      staleTime: 0,
    },
  });

  const lastAccrualQuery = useReadContract({
    address: STAKING_CONTRACT.address,
    abi: STAKING_CONTRACT.abi,
    functionName: 'lastAccrualOf',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
      staleTime: 0,
    },
  });

  const lastAccrualText = useMemo(() => {
    const timestamp = lastAccrualQuery.data as bigint | undefined;
    if (!timestamp || timestamp === 0n) {
      return 'Not accrued yet';
    }
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleString();
  }, [lastAccrualQuery.data]);

  const decryptCiphertext = useCallback(
    async (ciphertext: string, mode: 'stake' | 'reward') => {
      if (!instance || !address || !signerPromise) {
        throw new Error('Encryption tools unavailable');
      }

      const signer = await signerPromise;
      if (!signer) {
        throw new Error('Signer unavailable');
      }

      const keypair = instance.generateKeypair();
      const contractAddresses = [STAKING_CONTRACT.address];
      const startTimeStamp = Math.floor(Date.now() / 1000).toString();
      const durationDays = '7';

      const eip712 = instance.createEIP712(keypair.publicKey, contractAddresses, startTimeStamp, durationDays);

      const signature = await signer.signTypedData(
        eip712.domain,
        { UserDecryptRequestVerification: eip712.types.UserDecryptRequestVerification },
        eip712.message
      );

      const decryptionResult = await instance.userDecrypt(
        [
          {
            handle: ciphertext,
            contractAddress: STAKING_CONTRACT.address,
          },
        ],
        keypair.privateKey,
        keypair.publicKey,
        signature.replace('0x', ''),
        contractAddresses,
        address,
        startTimeStamp,
        durationDays
      );

      const decryptedRaw = decryptionResult[ciphertext];
      if (!decryptedRaw) {
        throw new Error('Decryption failed');
      }

      const value = BigInt(decryptedRaw);
      if (mode === 'stake') {
        return `${value.toString()} ETH`;
      }

      const divisor = BigInt(10 ** ZCOIN_DECIMALS);
      const whole = value / divisor;
      const fraction = value % divisor;
      const formattedFraction = fraction.toString().padStart(ZCOIN_DECIMALS, '0').replace(/0+$/, '');
      return formattedFraction.length > 0 ? `${whole.toString()}.${formattedFraction} ZC` : `${whole.toString()} ZC`;
    },
    [address, instance, signerPromise]
  );

  const handleDecryptStake = useCallback(async () => {
    if (!stakeQuery.data) {
      return;
    }
    try {
      setStakeDecrypting(true);
      const decrypted = await decryptCiphertext(stakeQuery.data as string, 'stake');
      setStakeDecrypted(decrypted);
    } catch (error) {
      console.error('Stake decryption failed:', error);
      setStakeDecrypted('Unable to decrypt');
    } finally {
      setStakeDecrypting(false);
    }
  }, [decryptCiphertext, stakeQuery.data]);

  const handleDecryptReward = useCallback(async () => {
    if (!rewardQuery.data) {
      return;
    }
    try {
      setRewardDecrypting(true);
      const decrypted = await decryptCiphertext(rewardQuery.data as string, 'reward');
      setRewardDecrypted(decrypted);
    } catch (error) {
      console.error('Reward decryption failed:', error);
      setRewardDecrypted('Unable to decrypt');
    } finally {
      setRewardDecrypting(false);
    }
  }, [decryptCiphertext, rewardQuery.data]);

  const refetchAll = useCallback(async () => {
    await Promise.all([stakeQuery.refetch?.(), rewardQuery.refetch?.(), lastAccrualQuery.refetch?.()]);
  }, [lastAccrualQuery.refetch, rewardQuery.refetch, stakeQuery.refetch]);

  useEffect(() => {
    if (refreshKey > 0) {
      void refetchAll();
    }
  }, [refreshKey, refetchAll]);

  const handleClaim = useCallback(async () => {
    if (!signerPromise || !address) {
      setStatusMessage('Connect a wallet to claim rewards.');
      return;
    }

    try {
      setClaiming(true);
      setStatusMessage(null);

      const signer = await signerPromise;
      if (!signer) {
        throw new Error('Signer unavailable');
      }

      const contract = new Contract(STAKING_CONTRACT.address, STAKING_CONTRACT.abi, signer);
      const tx = await contract.claimRewards();
      await tx.wait();

      setStatusMessage('Rewards claimed.');
      setStakeDecrypted(null);
      setRewardDecrypted(null);
      await refetchAll();
    } catch (error) {
      console.error('Claim failed:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      setStatusMessage(`Claim failed: ${message}`);
    } finally {
      setClaiming(false);
    }
  }, [address, refetchAll, signerPromise]);

  const encryptedStakeValue = (stakeQuery.data as string | undefined) ?? undefined;
  const encryptedRewardValue = (rewardQuery.data as string | undefined) ?? undefined;

  return (
    <section className="rewards-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Encrypted Balances</h2>
          <p className="card-subtitle">Balances update whenever you stake, withdraw, or claim rewards.</p>
        </div>
        <button className="ghost-button" onClick={refetchAll} disabled={zamaLoading}>
          Refresh
        </button>
      </div>

      <div className="encrypted-grid">
        <EncryptedValueCard
          label="Encrypted staked ETH"
          ciphertext={encryptedStakeValue}
          decryptedValue={stakeDecrypted}
          isDecrypting={stakeDecrypting || zamaLoading}
          onDecrypt={handleDecryptStake}
        />
        <EncryptedValueCard
          label="Encrypted rewards"
          ciphertext={encryptedRewardValue}
          decryptedValue={rewardDecrypted}
          isDecrypting={rewardDecrypting || zamaLoading}
          onDecrypt={handleDecryptReward}
        />
      </div>

      <div className="rewards-footer">
        <div>
          <span className="footer-label">Last accrual</span>
          <span className="footer-value">{lastAccrualText}</span>
        </div>
        <button className="primary-button" onClick={handleClaim} disabled={claiming}>
          {claiming ? 'Claiming...' : 'Claim rewards'}
        </button>
      </div>

      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </section>
  );
}
