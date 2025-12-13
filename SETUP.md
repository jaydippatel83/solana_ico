# ICO Configuration Setup

## Quick Setup

To configure your ICO addresses, you have two options:

### Option 1: Environment Variables (Recommended)

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_ICO_MINT_ADDRESS=YourTokenMintAddressHere
NEXT_PUBLIC_ADMIN_ADDRESS=YourAdminWalletAddressHere
```

### Option 2: Direct Configuration

Edit `lib/config.ts` and replace the placeholder values:

```typescript
ICO_MINT_ADDRESS: 'YourTokenMintAddressHere',
ADMIN_ADDRESS: 'YourAdminWalletAddressHere',
```

## Step-by-Step Setup

### 1. Create Your Token Mint

First, you need to create an SPL token for your ICO:

```bash
# Using Solana CLI
spl-token create-token

# Or use a tool like @solana/spl-token
```

Save the token mint address - this will be your `ICO_MINT_ADDRESS`.

### 2. Initialize Your ICO

Deploy your program and call the `create_ico` instruction with:
- Your token mint address
- The amount of tokens to sell
- Your admin wallet (this will be your `ADMIN_ADDRESS`)

### 3. Configure the Frontend

Set both addresses in `lib/config.ts` or via environment variables.

### 4. Verify Configuration

The app will check if addresses are configured. If you see the error message, make sure:
- Both addresses are valid Solana public keys
- The addresses are not the placeholder values
- Environment variables are loaded (restart dev server after adding them)

## Example Configuration

```typescript
// lib/config.ts
export const ICO_CONFIG = {
  ICO_MINT_ADDRESS: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // Example token
  ADMIN_ADDRESS: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',     // Example wallet
  // ... rest of config
};
```

## Troubleshooting

- **"Please configure ICO_MINT_ADDRESS and ADMIN_ADDRESS"**: Set both addresses in config or env vars
- **Invalid address error**: Ensure addresses are valid Solana public keys (base58 encoded, 32-44 characters)
- **Environment variables not working**: Restart your Next.js dev server after adding `.env.local`

