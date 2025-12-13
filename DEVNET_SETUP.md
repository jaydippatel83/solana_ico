# Devnet Token Setup

## Option 1: Use Existing Devnet Token (For Testing)

You can use a well-known devnet token for testing:

**USDC Devnet:** `Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr`

Update your `.env.local` or `lib/config.ts`:
```bash
NEXT_PUBLIC_ICO_MINT_ADDRESS=Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr
```

## Option 2: Create Your Own Token on Devnet (Recommended for ICO)

### Step 1: Set Solana CLI to Devnet
```bash
solana config set --url devnet
```

### Step 2: Airdrop SOL (if needed)
```bash
solana airdrop 2
```

### Step 3: Create Token Mint
```bash
spl-token create-token
```

This will output a token mint address like:
```
Creating token Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr
```

### Step 4: Create Token Account
```bash
spl-token create-account <TOKEN_MINT_ADDRESS>
```

### Step 5: Mint Tokens to Your Account
```bash
spl-token mint <TOKEN_MINT_ADDRESS> 1000000
```

### Step 6: Update Config
Use the token mint address from Step 3 in your config:
```bash
NEXT_PUBLIC_ICO_MINT_ADDRESS=<YOUR_TOKEN_MINT_ADDRESS>
```

## Quick Setup Script

You can also use this script to create a token:

```bash
# Create token
TOKEN_MINT=$(spl-token create-token --decimals 9 | grep -o '[A-Za-z0-9]\{32,44\}')

# Create account
spl-token create-account $TOKEN_MINT

# Mint tokens
spl-token mint $TOKEN_MINT 1000000

echo "Token Mint Address: $TOKEN_MINT"
echo "Add this to your .env.local:"
echo "NEXT_PUBLIC_ICO_MINT_ADDRESS=$TOKEN_MINT"
```

## Verify Token on Devnet

Check your token on Solana Explorer:
```
https://explorer.solana.com/address/<TOKEN_MINT_ADDRESS>?cluster=devnet
```

