use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};

declare_id!("HWcfFmawwMUaUngfNBpLa4Tfpk7B3bXbUvSMQvfW1sSv");

#[error_code]
pub enum ErrorCode {
    #[msg("Arithmetic overflow")]
    Overflow,
    #[msg("Invalid Admin")]
    InvalidAdmin,
}

#[program]
pub mod solana_ico { 

    pub const LAMPORTS_PER_TOKEN: u64 = 1_000_000;
    pub const TOKEN_DECIMALS: u64 = 1_000_000_000;
    use super::*;

    pub fn create_ico(ctx: Context<CreateIco>, ico_amount: u64) -> Result<()> {
        msg!("Creating program to hold ICO tokens");
        
        let raw_amount = ico_amount
            .checked_mul(TOKEN_DECIMALS)
            .ok_or(ErrorCode::Overflow)?;
        
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.ico_admin_token_account.to_account_info(),
                to: ctx.accounts.ico_program_token_account.to_account_info(),
                authority: ctx.accounts.ico_admin.to_account_info(),
            },
        );
        token::transfer(cpi_ctx, raw_amount)?;
        msg!("ICO mint created successfully: {}", ico_amount); 

        let data = &mut ctx.accounts.data;
        data.admin = *ctx.accounts.ico_admin.key;
        data.token_sold = 0;
        data.total_tokens = ico_amount;
        msg!("ICO created successfully");
        Ok(())
    }

    pub fn deposite_ico(ctx: Context<DepositIco>, amount: u64) -> Result<()> {
        if ctx.accounts.data.admin != *ctx.accounts.ico_admin.key {
            return Err(error!(ErrorCode::InvalidAdmin));
        }

        let raw_amount = amount
            .checked_mul(TOKEN_DECIMALS)
            .ok_or(ErrorCode::Overflow)?;
        
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.ico_admin_token_account.to_account_info(),
                to: ctx.accounts.ico_program_token_account.to_account_info(),
                authority: ctx.accounts.ico_admin.to_account_info(),
            },
        ); 
        token::transfer(cpi_ctx, raw_amount)?;

        let data = &mut ctx.accounts.data;
        data.total_tokens = data.total_tokens
            .checked_add(amount)
            .ok_or(ErrorCode::Overflow)?;
        msg!("Deposited ICO tokens successfully: {}", amount); 
        Ok(())
    }

    pub fn buy_tokens(ctx: Context<BuyTokens>, ico_program_bump: u8, amount: u64) -> Result<()> {
        let raw_amount = amount
            .checked_mul(TOKEN_DECIMALS)
            .ok_or(ErrorCode::Overflow)?;
        let sol_amount = amount
            .checked_mul(LAMPORTS_PER_TOKEN)
            .ok_or(ErrorCode::Overflow)?;

        let tx = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.user.key(),
            &ctx.accounts.admin.key(),
            sol_amount,
        );
        anchor_lang::solana_program::program::invoke(
            &tx,
            &[
                ctx.accounts.user.to_account_info(),
                ctx.accounts.admin.to_account_info(), 
            ],
        )?;

        msg!("Transferred {} lamports to admin", sol_amount);

        let ico_mint_address = ctx.accounts.ico_mint.key();
        let seeds = &[
            b"ico_program",
            ico_mint_address.as_ref(),
            &[ico_program_bump],
        ];
        let signer = &[&seeds[..]];

        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.ico_program_token_account.to_account_info(),
                to: ctx.accounts.user_token_account.to_account_info(),
                authority: ctx.accounts.ico_program.to_account_info(),
            },
            signer,
        );
        token::transfer(cpi_ctx, raw_amount)?;

        msg!("Transferred {} tokens to user", raw_amount);

        let data = &mut ctx.accounts.data;
        data.token_sold = data.token_sold
            .checked_add(amount)
            .ok_or(ErrorCode::Overflow)?;
        msg!("Bought tokens successfully: {}", amount);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateIco<'info> {
    #[account(mut)]
    pub ico_admin: Signer<'info>,
    
    #[account(
        init,
        payer = ico_admin,
        space = 8 + Data::LEN,
        seeds = [b"ico_data", ico_mint.key().as_ref()],
        bump
    )]
    pub data: Account<'info, Data>,
    
    pub ico_mint: Account<'info, Mint>,
    
    #[account(mut)]
    pub ico_admin_token_account: Account<'info, TokenAccount>,
    
    #[account(
        init,
        payer = ico_admin,
        token::mint = ico_mint,
        token::authority = ico_program,
        seeds = [b"ico_program", ico_mint.key().as_ref()],
        bump
    )]
    pub ico_program_token_account: Account<'info, TokenAccount>,
    
    /// CHECK: PDA account for ICO program
    #[account(
        seeds = [b"ico_program", ico_mint.key().as_ref()],
        bump
    )]
    pub ico_program: UncheckedAccount<'info>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct DepositIco<'info> {
    #[account(mut)]
    pub ico_admin: Signer<'info>,
    
    #[account(
        mut,
        seeds = [b"ico_data", ico_mint.key().as_ref()],
        bump
    )]
    pub data: Account<'info, Data>,
    
    pub ico_mint: Account<'info, Mint>,
    
    #[account(mut)]
    pub ico_admin_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        token::mint = ico_mint,
        token::authority = ico_program,
        seeds = [b"ico_program", ico_mint.key().as_ref()],
        bump
    )]
    pub ico_program_token_account: Account<'info, TokenAccount>,
    
    /// CHECK: PDA account for ICO program
    #[account(
        seeds = [b"ico_program", ico_mint.key().as_ref()],
        bump
    )]
    pub ico_program: UncheckedAccount<'info>,
    
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
#[instruction(amount: u64)]
pub struct BuyTokens<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    
    /// CHECK: Admin account to receive SOL
    #[account(mut)]
    pub admin: UncheckedAccount<'info>,
    
    #[account(
        mut,
        seeds = [b"ico_data", ico_mint.key().as_ref()],
        bump
    )]
    pub data: Account<'info, Data>,
    
    pub ico_mint: Account<'info, Mint>,
    
    #[account(
        mut,
        token::mint = ico_mint,
        token::authority = ico_program,
        seeds = [b"ico_program", ico_mint.key().as_ref()],
        bump
    )]
    pub ico_program_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        token::mint = ico_mint,
        token::authority = user
    )]
    pub user_token_account: Account<'info, TokenAccount>,
    
    /// CHECK: PDA account for ICO program
    #[account(
        seeds = [b"ico_program", ico_mint.key().as_ref()],
        bump
    )]
    pub ico_program: UncheckedAccount<'info>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Data {
    pub admin: Pubkey,
    pub token_sold: u64,
    pub total_tokens: u64,
}

impl Data {
    pub const LEN: usize = 32 + 8 + 8; // admin (32) + token_sold (8) + total_tokens (8)
}

#[derive(Accounts)]
pub struct Initialize {}
