use anchor_lang::prelude::*;

declare_id!("HWcfFmawwMUaUngfNBpLa4Tfpk7B3bXbUvSMQvfW1sSv");

#[program]
pub mod solana_ico {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
