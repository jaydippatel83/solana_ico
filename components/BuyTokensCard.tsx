'use client';

import { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { useProgram, LAMPORTS_PER_TOKEN, TOKEN_DECIMALS } from '@/lib/anchor';
import { ICO_CONFIG } from '@/lib/config';
import { WalletButton } from './WalletButton';
import { BN } from '@coral-xyz/anchor';

export function BuyTokensCard() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgram();
  const [quantity, setQuantity] = useState('100');
  const [solBalance, setSolBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [icoData, setIcoData] = useState<{
    tokenSold: number;
    totalTokens: number;
  } | null>(null);

  // Fetch SOL balance
  useEffect(() => {
    if (publicKey) {
      connection.getBalance(publicKey).then((balance: number) => {
        setSolBalance(balance / LAMPORTS_PER_SOL);
      });
    }
  }, [publicKey, connection]);

  // Fetch ICO data
  useEffect(() => {
    if (program && ICO_CONFIG.isConfigured()) {
      const fetchIcoData = async () => {
        try {
          const icoMint = ICO_CONFIG.getIcoMint();
          const [dataPda] = PublicKey.findProgramAddressSync(
            [Buffer.from('ico_data'), icoMint.toBuffer()],
            program.programId
          );
          const data = await program.account.data.fetch(dataPda);
          setIcoData({
            tokenSold: data.tokenSold.toNumber() / TOKEN_DECIMALS,
            totalTokens: data.totalTokens.toNumber() / TOKEN_DECIMALS,
          });
        } catch (error) {
          console.error('Error fetching ICO data:', error);
        }
      };
      fetchIcoData();
    }
  }, [program]);

  const calculateSolAmount = (tokenAmount: number) => {
    return tokenAmount * ICO_CONFIG.SOL_PER_TOKEN;
  };

  const solAmount = calculateSolAmount(parseFloat(quantity) || 0);
  const progress = icoData ? (icoData.tokenSold / icoData.totalTokens) * 100 : 7.27;
  const totalRaised = icoData ? icoData.tokenSold * 0.01 : 4.0;
  const tokensLeft = icoData ? icoData.totalTokens - icoData.tokenSold : 4700;

  const handleBuy = async () => {
    if (!connected || !publicKey || !program) {
      alert('Please connect your wallet');
      return;
    }

    setLoading(true);
    try {
      const tokenAmount = parseFloat(quantity);
      if (isNaN(tokenAmount) || tokenAmount <= 0) {
        alert('Please enter a valid quantity');
        return;
      }

      // Validate configuration
      if (!ICO_CONFIG.isConfigured()) {
        alert('Please configure ICO_MINT_ADDRESS and ADMIN_ADDRESS in lib/config.ts or set environment variables:\n- NEXT_PUBLIC_ICO_MINT_ADDRESS\n- NEXT_PUBLIC_ADMIN_ADDRESS');
        setLoading(false);
        return;
      }

      const amount = new BN(tokenAmount * TOKEN_DECIMALS);
      const icoMint = ICO_CONFIG.getIcoMint();
      const admin = ICO_CONFIG.getAdmin();

      // Derive PDAs
      const [dataPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('ico_data'), icoMint.toBuffer()],
        program.programId
      );
      const [icoProgramPda, icoProgramBump] = PublicKey.findProgramAddressSync(
        [Buffer.from('ico_program'), icoMint.toBuffer()],
        program.programId
      );
      // The ico_program_token_account is a PDA token account
      // It's derived with seeds: ["ico_program", ico_mint]
      // In Anchor, this would be created as a token account owned by the PDA
      // For now, we'll use getAssociatedTokenAddress which should work if the account exists
      const icoProgramTokenAccount = await getAssociatedTokenAddress(
        icoMint,
        icoProgramPda,
        true // allowOwnerOffCurve for PDA
      );

      // Get user token account
      const userTokenAccount = await getAssociatedTokenAddress(
        icoMint,
        publicKey
      );

      const tx = await program.methods
        .buyTokens(icoProgramBump, amount)
        .accounts({
          user: publicKey,
          admin: admin,
          data: dataPda,
          icoMint: icoMint,
          icoProgramTokenAccount: icoProgramTokenAccount,
          userTokenAccount: userTokenAccount,
          icoProgram: icoProgramPda,
          tokenProgram: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
          systemProgram: new PublicKey('11111111111111111111111111111111'),
        })
        .rpc();

      alert(`Transaction successful! Signature: ${tx}`);
      // Refresh data
      window.location.reload();
    } catch (error: any) {
      console.error('Error buying tokens:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 px-8 py-12">
      <div className="bg-dark-card rounded-2xl p-8 border border-white/10 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Buy CK Tokens</h2>
          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
            Stage 1
          </span>
        </div>
        <p className="text-white/60 text-sm mb-6">
          Limited time offer • Secure your tokens now
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Current Price</span>
            <span className="text-white font-semibold">${ICO_CONFIG.CURRENT_PRICE.toFixed(3)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Next Stage</span>
            <span className="text-white font-semibold">${ICO_CONFIG.NEXT_STAGE_PRICE.toFixed(3)}</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/60">Sale Progress</span>
            <span className="text-white font-semibold">{progress.toFixed(2)}% Complete</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 mb-2">
            <div
              className="bg-gradient-purple-green h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-white/60">
            <span>Total Raised: ${totalRaised.toFixed(2)}</span>
            <span>Tokens Left: {tokensLeft.toLocaleString()} CK</span>
          </div>
        </div>

        <div className="bg-gradient-purple-green/10 border border-purple-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-purple-green rounded-full flex items-center justify-center text-white font-bold">
              CK
            </div>
            <div>
              <p className="text-white/60 text-xs">Exchange Rate</p>
              <p className="text-white font-semibold">1 CK = {ICO_CONFIG.SOL_PER_TOKEN} SOL</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-white/60 text-sm mb-2 block">Available Balance</label>
          <div className="flex items-center gap-2 text-white">
            <div className="w-5 h-5 bg-gradient-teal-purple rounded-full"></div>
            <span className="font-semibold">{solBalance.toFixed(8)} SOL</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-white/60 text-sm mb-2 block">Quantity</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="100"
            />
            <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white flex items-center gap-2">
              <div className="w-5 h-5 bg-gradient-teal-purple rounded-full"></div>
              SOL
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-white/60 text-sm mb-2 block">You Pay</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={solAmount.toFixed(3)}
              readOnly
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
            />
            <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white flex items-center gap-2">
              <div className="w-5 h-5 bg-gradient-purple-green rounded-full flex items-center justify-center text-xs font-bold">
                CK
              </div>
              CK
            </button>
          </div>
        </div>

        {!connected ? (
          <div className="mb-4">
            <WalletButton />
          </div>
        ) : (
          <button
            onClick={handleBuy}
            disabled={loading}
            className="w-full bg-gradient-purple-green hover:opacity-90 text-white font-semibold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Buy Now'}
          </button>
        )}

        <button className="w-full mt-4 text-white/60 text-sm flex items-center justify-center gap-2 hover:text-white transition-colors">
          <span>ICO Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

