use anchor_lang::prelude::*;
use anchor_spl::token::{self,Mint,Token, TokenAccount};

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

    pub const ICO_MINT_ADDRESS: &str ="";
    pub const LAMPORTS_PER_TOKEN: u64 =1_000_000;
    pub const TOKEN_DECIMALS: u64 =1_000_000_000;
    use super::*;


    pub fn create_ico(ctx: Context<CreateIco>,ico_amount: u64)->Result<()>{
         msg!("Creating program to hold ICO tokens");
         let raw_ammount = ico_amount.checked_mul(TOKEN_DECIMALS).ok_or(ErrorCode::Overflow);
         let cpi_ctx= CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.admin.to_account_info(),
                to: ctx.accounts.ico_mint.to_account_info(),
                authority: ctx.accounts.admin.to_account_info(),
            },
        );
        token::transfer(cpi_ctx, raw_ammount)?;
        msg!("ICO mint created successfully",ico_amount); 

        let data = &mut ctx.accounts.data;
        data.admin = *ctx.accounts.admin.key;
        data.token_sold = 0;
        msg!("ICO created successfully");
        Ok(())
         
    }


    pub fn deposite_ico(ctx: Context<DepositIco>,amount: u64)->Result<()>{
        if ctx.accounts.data.admin != *ctx.accounts.admin.key{
            return Err(error!(ErrorCode::InvalidAdmin));
        }

        let raw_ammount = ico_amount.checked_mul(TOKEN_DECIMALS).ok_or(ErrorCode::Overflow);
         let cpi_ctx= CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.admin.to_account_info(),
                to: ctx.accounts.ico_mint.to_account_info(),
                authority: ctx.accounts.admin.to_account_info(),
            },
        ); 
        token::transfer(cpi_ctx, raw_ammount)?;

        let data = &mut ctx.accounts.data;
        data.total_tokens += ico_amount;
        msg!("Deposited ICO tokens successfully",ico_amount); 
        Ok(())

    }


    pub fn buy_tokens(){}

    #[derive(Accounts)]
    pub struct CreateIco<'info>{}

    #[derive(Accounts)]
    pub struct DepositIco<'info>{}

    #[derive(Accounts)]
    #[instruction(amount: u64)]
    pub struct BuyTokens<'info>{}

    #[account]
    pub struct Data{}


}

#[derive(Accounts)]
pub struct Initialize {}
