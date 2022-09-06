import { AnchorProvider, Program } from "@project-serum/anchor"
import { useConnection } from "@solana/wallet-adapter-react"
import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { ArticleDto } from "../dto/ArticleDto"
import { IDL } from "../idl/idl"
import { DecentralizedNews } from "../types/decentralized_news"
import * as anchor from "@project-serum/anchor";
import { useParams } from "react-router-dom"
import { AnchorWallet } from "./SolanaWallet"

const Layout = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TitleImage = styled('img')`
    object-fit: cover;
    width: 100%;
    max-width: 100vw;
    height: 33vw;
`

const Line = styled('hr')`
    color: white;
    width: 90vw;
`

const Title = styled('div')`
    font-size: min(55px, calc(80vw / (1200 / 55)));
    font-weight: 900;
    color: white;
`

const Description = styled('div')`
    font-size: min(35px, calc(80vw / (1200 / 35)));
    width: 85vw;
    max-width: 1200px;
    font-weight: 500;
    color: white;
`

export const ArticlePage: React.FC = () => {
    const [article, setArticle] = useState<ArticleDto>()
    const { connection } = useConnection();
    const params = useParams()
    const [program, setProgram] = useState<Program<DecentralizedNews>>();

    useEffect(() => {
        if (!(process.env.REACT_APP_PROGRAM_ID)) {
            console.log("Failed")
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
    

    const loadArticle = useCallback(async () => {
        if (!params.index) return;

        if (!(process.env.REACT_APP_PROGRAM_ID && program)) {
            if (!program) console.log("no program")
            return;
        }

        const [articlePDA,] = await anchor.web3.PublicKey
                .findProgramAddress(
                    [
                        anchor.utils.bytes.utf8.encode(params.index.toString()),
                    ],
                    program.programId
                );
        let articleData = await program.account.article.fetch(articlePDA);

        setArticle({title: articleData.title, description: articleData.description, titleImage: articleData.image })
    }, [program, params.index])

    useEffect(() => {
        loadArticle()
    }, [program, loadArticle])
    
    return (
        <Layout>
            <TitleImage src={article?.titleImage} />
            <Title>{article?.title}</Title>
            <Line />
            <Description>{article?.description}</Description>
            <br></br>
            <br></br>
            <br></br>
        </Layout>
    )
}