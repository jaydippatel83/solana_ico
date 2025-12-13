import { Idl } from '@coral-xyz/anchor';

// Import the IDL JSON
// In Next.js, JSON imports work differently - we need to handle it properly
let idlData: any;
try {
  idlData = require('@/target/idl/solana_ico.json');
} catch {
  // Fallback for client-side
  idlData = null;
}

// Ensure IDL is properly formatted with all required fields
const idl: Idl = (idlData?.default || idlData || {}) as Idl;

// Export as properly typed IDL
export const IDL = idl;

