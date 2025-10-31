import type { ReactNode } from 'react';
import '../styles/EncryptedValueCard.css';

type EncryptedValueCardProps = {
  label: string;
  ciphertext?: string;
  decryptedValue?: string | null;
  isDecrypting: boolean;
  onDecrypt: () => void;
  extraContent?: ReactNode;
};

export function EncryptedValueCard({
  label,
  ciphertext,
  decryptedValue,
  isDecrypting,
  onDecrypt,
  extraContent,
}: EncryptedValueCardProps) {
  return (
    <div className="encrypted-card">
      <div className="encrypted-card-header">
        <span className="encrypted-card-label">{label}</span>
        <button className="ghost-button" onClick={onDecrypt} disabled={isDecrypting || !ciphertext}>
          {isDecrypting ? 'Decrypting...' : 'Decrypt'}
        </button>
      </div>
      <div className="encrypted-card-body">
        <div className="ciphertext-value">{ciphertext ?? '0x0'}</div>
        {decryptedValue && <div className="plaintext-value">{decryptedValue}</div>}
      </div>
      {extraContent}
    </div>
  );
}
