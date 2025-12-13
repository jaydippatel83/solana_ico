import { Program, AnchorProvider, Idl } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useMemo, useState, useEffect } from 'react';
import { SolanaIco } from '@/target/types/solana_ico';

export const PROGRAM_ID = new PublicKey('HWcfFmawwMUaUngfNBpLa4Tfpk7B3bXbUvSMQvfW1sSv');

export const LAMPORTS_PER_TOKEN = 1_000_000;
export const TOKEN_DECIMALS = 1_000_000_000;

export function useProgram() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [program, setProgram] = useState<Program<SolanaIco> | null>(null);

  const provider = useMemo(() => {
    if (!wallet) return null;
    return new AnchorProvider(
      connection,
      wallet,
      { commitment: 'confirmed' }
    );
  }, [connection, wallet]);

  useEffect(() => {
    if (!provider) {
      setProgram(null);
      return;
    }

    // Load IDL dynamically to avoid import issues
    const loadProgram = async () => {
      try {
        // Import IDL dynamically
        const idlModule = await import('@/target/idl/solana_ico.json');
        const loadedIdl: Idl = (idlModule.default || idlModule) as Idl;
        
        // Program constructor: IDL contains the program address
        if (!provider) {
          setProgram(null);
          return;
        }
        
        // Anchor Program constructor: new Program(idl, provider)
        // The program ID is extracted from the IDL's address field
        const programInstance = new Program<SolanaIco>(
          loadedIdl,
          provider
        );
        
        setProgram(programInstance);
      } catch (error) {
        console.error('Error creating program:', error);
        setProgram(null);
      }
    };

    loadProgram();
  }, [provider]);

  return { program, provider };
}

