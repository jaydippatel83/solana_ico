# Solana ICO - Next.js Frontend

A modern Next.js frontend for the Solana ICO token presale platform.

## Features

- 🎨 Beautiful, modern UI matching the design specifications
- 🔐 Solana wallet integration (Phantom, Solflare)
- 💰 Token purchase functionality
- 📊 Real-time ICO progress tracking
- 🎯 Responsive design

## Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Update configuration:
   - Open `components/BuyTokensCard.tsx`
   - Replace `ICO_MINT_ADDRESS` with your actual ICO mint address
   - Replace `ADMIN_ADDRESS` with your actual admin wallet address

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

Before using the app, make sure to:

1. **Set ICO Mint Address**: Update `ICO_MINT_ADDRESS` in `components/BuyTokensCard.tsx`
2. **Set Admin Address**: Update `ADMIN_ADDRESS` in `components/BuyTokensCard.tsx`
3. **Network Configuration**: The app is configured for Devnet by default. To change:
   - Edit `components/WalletProvider.tsx`
   - Change `WalletAdapterNetwork.Devnet` to your desired network

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with wallet provider
│   ├── page.tsx            # Main page
│   └── globals.css          # Global styles
├── components/
│   ├── WalletProvider.tsx   # Solana wallet context provider
│   ├── WalletButton.tsx     # Wallet connect button
│   ├── InfoSection.tsx      # Left side info section
│   └── BuyTokensCard.tsx    # Token purchase card
├── lib/
│   └── anchor.ts            # Anchor program utilities
└── target/
    ├── idl/
    │   └── solana_ico.json  # Program IDL
    └── types/
        └── solana_ico.ts    # TypeScript types
```

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **@solana/wallet-adapter** - Wallet integration
- **@coral-xyz/anchor** - Solana program interaction

## Notes

- The app connects to Solana Devnet by default
- Make sure your wallet is connected before purchasing tokens
- The ICO data fetching requires the program to be deployed and initialized

