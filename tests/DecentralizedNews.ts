import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SystemProgram } from "@solana/web3.js"
import { DecentralizedNews } from "../target/types/decentralized_news";

describe("DecentralizedNews", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.DecentralizedNews as Program<DecentralizedNews>;
  const state = anchor.web3.Keypair.generate();
  const seller = (program.provider as anchor.AnchorProvider).wallet;

  it("Is initialized!", async () => {
    // Add your test here.
    await program.methods.initialize().accounts({
      state: state.publicKey,
      seller: seller.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .signers([state])
    .rpc();
  });
});