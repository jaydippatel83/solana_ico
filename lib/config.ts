import { PublicKey } from '@solana/web3.js';

/**
 * ICO Configuration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a token mint for your ICO token using SPL Token
 * 2. Deploy and initialize your ICO program using the create_ico instruction
 * 3. Set ICO_MINT_ADDRESS to your token mint address
 * 4. Set ADMIN_ADDRESS to the wallet that will receive SOL from purchases
 *    (This should be the same address used when calling create_ico)
 * 
 * You can also set these via environment variables:
 * - NEXT_PUBLIC_ICO_MINT_ADDRESS
 * - NEXT_PUBLIC_ADMIN_ADDRESS
 */

// Get addresses from environment variables or use placeholders
// For devnet testing, you can use: Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr (USDC Devnet)
const ICO_MINT = process.env.NEXT_PUBLIC_ICO_MINT_ADDRESS || 'YOUR_ICO_MINT_ADDRESS_HERE';
const ADMIN = process.env.NEXT_PUBLIC_ADMIN_ADDRESS || 'YOUR_ADMIN_ADDRESS_HERE';

// Validate addresses if they're not placeholders
function isValidAddress(address: string): boolean {
  if (address === 'YOUR_ICO_MINT_ADDRESS_HERE' || address === 'YOUR_ADMIN_ADDRESS_HERE') {
    return false;
  }
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

export const ICO_CONFIG = {
  // The mint address of your ICO token
  // Examples:
  //   Devnet: 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr' (USDC Devnet)
  //   Mainnet: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' (USDC Mainnet)
  ICO_MINT_ADDRESS: ICO_MINT,
  
  // The admin wallet address that receives SOL from purchases
  // This should be the wallet address that initialized the ICO
  ADMIN_ADDRESS: ADMIN,
  
  // Program ID (already set in anchor.ts)
  PROGRAM_ID: new PublicKey('HWcfFmawwMUaUngfNBpLa4Tfpk7B3bXbUvSMQvfW1sSv'),
  
  // Token price in USD (for display purposes)
  CURRENT_PRICE: 0.01,
  NEXT_STAGE_PRICE: 0.035,
  
  // Exchange rate: 1 token = 0.001 SOL
  SOL_PER_TOKEN: 0.001,
  
  // Helper to check if config is valid
  isConfigured(): boolean {
    return isValidAddress(this.ICO_MINT_ADDRESS) && isValidAddress(this.ADMIN_ADDRESS);
  },
  
  // Get PublicKey instances (throws if not configured)
  getIcoMint(): PublicKey {
    if (!isValidAddress(this.ICO_MINT_ADDRESS)) {
      throw new Error('ICO_MINT_ADDRESS is not configured. Please set it in lib/config.ts or via NEXT_PUBLIC_ICO_MINT_ADDRESS environment variable.');
    }
    return new PublicKey(this.ICO_MINT_ADDRESS);
  },
  
  getAdmin(): PublicKey {
    if (!isValidAddress(this.ADMIN_ADDRESS)) {
      throw new Error('ADMIN_ADDRESS is not configured. Please set it in lib/config.ts or via NEXT_PUBLIC_ADMIN_ADDRESS environment variable.');
    }
    return new PublicKey(this.ADMIN_ADDRESS);
  },
};

