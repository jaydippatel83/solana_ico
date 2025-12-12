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
        Ok(())
    }


    pub fn deposite_ico(){}

    
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
