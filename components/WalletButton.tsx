'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function WalletButton() {
  const { connected } = useWallet();
  
  return (
    <div className="flex items-center gap-4">
      <WalletMultiButton className="!bg-gradient-purple-green hover:!opacity-90 !rounded-lg !h-10 !px-4" />
    </div>
  );
}

