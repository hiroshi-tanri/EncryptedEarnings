import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { StakeForm } from './StakeForm';
import { RewardsPanel } from './RewardsPanel';
import '../styles/StakingApp.css';

export function StakingApp() {
  const { isConnected } = useAccount();
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="staking-app">
      <header className="staking-header">
        <div className="branding">
          <h1 className="branding-title">ZCoin Encrypted Staking</h1>
          <p className="branding-subtitle">
            Stake whole ETH amounts and earn 1000 ZCoin per ETH every day while keeping balances confidential.
          </p>
        </div>
        <ConnectButton chainStatus="icon" showBalance={false} />
      </header>

      <main className="staking-main">
        {isConnected ? (
          <>
            <StakeForm onActionComplete={triggerRefresh} />
            <RewardsPanel refreshKey={refreshKey} />
          </>
        ) : (
          <section className="connect-card">
            <h2 className="connect-title">Connect your wallet</h2>
            <p className="connect-description">
              Link a wallet to stake ETH and decrypt your encrypted staking statistics.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
