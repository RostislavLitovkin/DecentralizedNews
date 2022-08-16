import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SystemProgram } from "@solana/web3.js"
import { DecentralizedNews } from "../target/types/decentralized_news";

describe("DecentralizedNews", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.DecentralizedNews as Program<DecentralizedNews>;
  const signer = (program.provider as anchor.AnchorProvider).wallet;

  it("Is initialized!", async () => {

    const [statePDA, _] = await anchor.web3.PublicKey
      .findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("state"),
        ],
        program.programId
      );
    // Add your test here.
    await program.methods.initialize().accounts({
      state: statePDA,
      signer: signer.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .signers([])
    .rpc();
  });

  it("Is written once", async () => {

    const [statePDA,] = await anchor.web3.PublicKey
      .findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("state"),
        ],
        program.programId
      );

    let programState = await program.account.state.fetch(statePDA);

    const [articlePDA, ] = await anchor.web3.PublicKey
      .findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode(programState.totalArticles.toString()),
        ],
        program.programId
      );
    // Add your test here.
    await program.methods.publishArticle("title", "description", "image").accounts({
      state: statePDA,
      signer: signer.publicKey,
      article: articlePDA,
      systemProgram: SystemProgram.programId,
    })
    .signers([])
    .rpc();
  });

  it("Is written twice", async () => {

    const [statePDA,] = await anchor.web3.PublicKey
      .findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("state"),
        ],
        program.programId
      );

    let programState = await program.account.state.fetch(statePDA);

    const [articlePDA, ] = await anchor.web3.PublicKey
        .findProgramAddress(
          [
            anchor.utils.bytes.utf8.encode(programState.totalArticles.toString()),
          ],
          program.programId
        );
    // Add your test here.
    await program.methods.publishArticle("title", "description", "image").accounts({
      state: statePDA,
      signer: signer.publicKey,
      article: articlePDA,
      systemProgram: SystemProgram.programId,
    })
    .signers([])
    .rpc();

    console.log(programState.totalArticles)
  });


  it("Is written twice", async () => {

    const [statePDA,] = await anchor.web3.PublicKey
      .findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("state"),
        ],
        program.programId
      );

    let programState = await program.account.state.fetch(statePDA);

    const [articlePDA, ] = await anchor.web3.PublicKey
        .findProgramAddress(
          [
            anchor.utils.bytes.utf8.encode(programState.totalArticles.toString()),
          ],
          program.programId
        );
    // Add your test here.
    await program.methods.publishArticle("title", "description", "image").accounts({
      state: statePDA,
      signer: signer.publicKey,
      article: articlePDA,
      systemProgram: SystemProgram.programId,
    })
    .signers([])
    .rpc();

    console.log(programState.totalArticles)
  });

  it("Is written twice", async () => {

    const [statePDA,] = await anchor.web3.PublicKey
      .findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("state"),
        ],
        program.programId
      );

    let programState = await program.account.state.fetch(statePDA);

    const [articlePDA, ] = await anchor.web3.PublicKey
        .findProgramAddress(
          [
            anchor.utils.bytes.utf8.encode(programState.totalArticles.toString()),
          ],
          program.programId
        );
    // Add your test here.
    await program.methods.publishArticle("title", "description", "image").accounts({
      state: statePDA,
      signer: signer.publicKey,
      article: articlePDA,
      systemProgram: SystemProgram.programId,
    })
    .signers([])
    .rpc();

    console.log(programState.totalArticles)
  });

  it("Is written twice", async () => {

    const [statePDA,] = await anchor.web3.PublicKey
      .findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("state"),
        ],
        program.programId
      );

    let programState = await program.account.state.fetch(statePDA);

    const [articlePDA, ] = await anchor.web3.PublicKey
        .findProgramAddress(
          [
            anchor.utils.bytes.utf8.encode(programState.totalArticles.toString()),
          ],
          program.programId
        );
    // Add your test here.
    await program.methods.publishArticle("title", "description", "image").accounts({
      state: statePDA,
      signer: signer.publicKey,
      article: articlePDA,
      systemProgram: SystemProgram.programId,
    })
    .signers([])
    .rpc();

    console.log(programState.totalArticles)
  });
});