use anchor_lang::prelude::*;

declare_id!("GKQz8VpfXHbj2hXeazQHq1YzN8XvZyQQM2rhpHYJfake");

#[program]
pub mod decentralized_news {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let state = &mut ctx.accounts.state;
        state.total_articles = 0;
        state.bump = *ctx.bumps.get("state").unwrap();

        Ok(())
    }

    pub fn publish_article(ctx: Context<PublishArticle>, title: String, description: String, image: String) -> Result<()> {
        let state = &mut ctx.accounts.state;
        state.total_articles = state.total_articles + 1;
        
        let article = &mut ctx.accounts.article;
        article.title = title;
        article.description = description;
        article.image = image;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + 16 + 8,
        seeds=[b"state"],
        bump
    )]
    pub state: Account<'info, State>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

fn seed_bytes(seed: &str) -> &[u8] {
    msg!("Seed: {}", seed);
    seed.as_bytes()
}

#[derive(Accounts)]
pub struct PublishArticle<'info> {
    #[account(init,
        payer = signer,
        space = 8 + 4 * (50 + 500 + 100),
        seeds=[seed_bytes(&state.total_articles.to_string()).as_ref()], 
        bump)]
    pub article: Account<'info, Article>,

    #[account(mut, seeds = [b"state"], bump = state.bump)]
    pub state: Account<'info, State>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct State {
    total_articles: u16,
    bump: u8,
}

#[account]
#[derive(Default)]
pub struct Article {
    title: String,
    description: String,
    image: String,
}