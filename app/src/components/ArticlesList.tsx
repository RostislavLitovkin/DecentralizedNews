import { AnchorProvider, Program } from "@project-serum/anchor"
import { useConnection } from "@solana/wallet-adapter-react"
import { useCallback, useEffect, useState } from "react"
import { IDL } from "../idl/idl"
import { DecentralizedNews } from "../types/decentralized_news"
import * as anchor from "@project-serum/anchor"
import { PublicKey } from "@solana/web3.js"
import { ArticleThumbnail } from "./ArticleThumbnail"
import styled from "styled-components"
import { AnchorWallet } from "./SolanaWallet"

const ListLayout = styled('div')`
    display: flex;
    align-items: center;
    flex-direction: column;
`

export const ArticlesList: React.FC = () => {
    const { connection } = useConnection();
    const [program, setProgram] = useState<Program<DecentralizedNews>>();
    const [allArticlesArray, setAllArticlesArray] = useState<JSX.Element[]>();

    
    useEffect(() => {
        if (!(process.env.REACT_APP_PROGRAM_ID)) {
            return
        }

        const provider = new AnchorProvider(
            connection, new AnchorWallet(anchor.web3.Keypair.generate()), { preflightCommitment: 'recent' },
        )

        // IDK, Solana is just buggy mess, so this was the only workaround to get it working (basically does nothing, just parses it correctly)
        const a = JSON.stringify(IDL)
        const b = JSON.parse(a)
        setProgram(new Program<DecentralizedNews>(b, process.env.REACT_APP_PROGRAM_ID, provider));
    }, [connection])


    const loadArticles = useCallback(async () => {
        if (!(process.env.REACT_APP_PROGRAM_ID && program)) {
            if (!program) console.log("no program")
            return;
        }

        const [statePDA,] = await PublicKey.findProgramAddress(
            [
                anchor.utils.bytes.utf8.encode("state"),
            ],
            new PublicKey(process.env.REACT_APP_PROGRAM_ID)
        );
        let programState = await program.account.state.fetch(statePDA);

        const totalArticles = programState.totalArticles
        let articles = []

        for (let i = 0; i < totalArticles; i++) {
            const [articlePDA,] = await anchor.web3.PublicKey
                .findProgramAddress(
                    [
                        anchor.utils.bytes.utf8.encode(i.toString()),
                    ],
                    program.programId
                );
            const articleData = await program.account.article.fetch(articlePDA);

            articles.push(<ArticleThumbnail key={i} title={articleData.title} image={articleData.image} index={i}></ArticleThumbnail>)
        }

        console.log(articles.length)
        if (articles) setAllArticlesArray(articles);


    }, [program])

    useEffect(() => {
        loadArticles()
    }, [program, loadArticles])

    return (
        <ListLayout>
            {allArticlesArray}
        </ListLayout>
    )
}