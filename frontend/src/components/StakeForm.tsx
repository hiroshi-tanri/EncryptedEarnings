import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Contract, ethers } from 'ethers';
import { useEthersSigner } from '../hooks/useEthersSigner';
import { STAKING_CONTRACT } from '../config/contracts';
import '../styles/StakeForm.css';

type StakeFormProps = {
  onActionComplete: () => void;
};

export function StakeForm({ onActionComplete }: StakeFormProps) {
  const { address } = useAccount();
  const signerPromise = useEthersSigner();

  const [stakeAmount, setStakeAmount] = useState('1');
  const [withdrawAmount, setWithdrawAmount] = useState('1');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isStaking, setIsStaking] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const resetStatus = () => setStatusMessage(null);

  const handleStake = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetStatus();

    if (!signerPromise || !address) {
      setStatusMessage('Connect a wallet to stake.');
      return;
    }

    try {
      const signer = await signerPromise;
      if (!signer) {
        throw new Error('Signer unavailable');
      }

      const value = ethers.parseEther(stakeAmount);
      if (value % ethers.parseEther('1') !== 0n) {
        setStatusMessage('Stake amount must be a whole ETH value.');
        return;
      }

      setIsStaking(true);

      const contract = new Contract(STAKING_CONTRACT.address, STAKING_CONTRACT.abi, signer);
      const tx = await contract.stake({ value });
      await tx.wait();

      setStatusMessage('Stake confirmed. Rewards are now accruing.');
      onActionComplete();
    } catch (error) {
      console.error('Stake failed:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      setStatusMessage(`Stake failed: ${message}`);
    } finally {
      setIsStaking(false);
    }
  };

  const handleWithdraw = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetStatus();

    if (!signerPromise || !address) {
      setStatusMessage('Connect a wallet to withdraw.');
      return;
    }

    try {
      const signer = await signerPromise;
      if (!signer) {
        throw new Error('Signer unavailable');
      }

      const value = ethers.parseEther(withdrawAmount);
      if (value % ethers.parseEther('1') !== 0n) {
        setStatusMessage('Withdraw amount must be a whole ETH value.');
        return;
      }

      setIsWithdrawing(true);

      const contract = new Contract(STAKING_CONTRACT.address, STAKING_CONTRACT.abi, signer);
      const tx = await contract.withdraw(value);
      await tx.wait();

      setStatusMessage('Withdraw completed.');
      onActionComplete();
    } catch (error) {
      console.error('Withdraw failed:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      setStatusMessage(`Withdraw failed: ${message}`);
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <section className="stake-card">
      <h2 className="card-title">Stake ETH</h2>
      <p className="card-description">
        Staking accepts whole ETH amounts. Each ETH earns 1000 ZCoin per day.
      </p>

      <form className="inline-form" onSubmit={handleStake}>
        <label className="field">
          <span className="field-label">Stake amount (ETH)</span>
          <input
            type="number"
            min="1"
            step="1"
            value={stakeAmount}
            onChange={(event) => setStakeAmount(event.target.value)}
            className="field-input"
            required
          />
        </label>
        <button type="submit" className="primary-button" disabled={isStaking}>
          {isStaking ? 'Staking...' : 'Stake'}
        </button>
      </form>

      <form className="inline-form" onSubmit={handleWithdraw}>
        <label className="field">
          <span className="field-label">Withdraw amount (ETH)</span>
          <input
            type="number"
            min="1"
            step="1"
            value={withdrawAmount}
            onChange={(event) => setWithdrawAmount(event.target.value)}
            className="field-input"
            required
          />
        </label>
        <button type="submit" className="secondary-button" disabled={isWithdrawing}>
          {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
        </button>
      </form>

      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </section>
  );
}
