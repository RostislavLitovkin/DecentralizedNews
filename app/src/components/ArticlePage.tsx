import { AnchorProvider, Program } from "@project-serum/anchor"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { ArticleDto } from "../dto/ArticleDto"
import { IDL } from "../idl/idl"
import { DecentralizedNews } from "../types/decentralized_news"
import * as anchor from "@project-serum/anchor";
import { useParams } from "react-router-dom"

const Layout = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
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
    font-size: 55px;
    font-weight: 900;
    color: white;
`

const Description = styled('div')`
    font-size: 35px;
    font-weight: 500;
    color: white;
`

export const ArticlePage: React.FC = () => {
    const [article, setArticle] = useState<ArticleDto>()
    const { connection } = useConnection();
    const { publicKey, connected, signAllTransactions, signTransaction } = useWallet();
    const params = useParams()
    const [program, setProgram] = useState<Program<DecentralizedNews>>();
    const [allArticlesArray, setAllArticlesArray] = useState<JSX.Element[]>();

    useEffect(() => {
        if (!(publicKey && signAllTransactions && signTransaction && process.env.REACT_APP_PROGRAM_ID)) {
            if (!publicKey) console.log("No pubkey")
            console.log("Failed")
            return
        }

        const provider = new AnchorProvider(
            connection, { publicKey: publicKey, signAllTransactions: signAllTransactions, signTransaction: signTransaction }, { preflightCommitment: 'recent' },
        )

        // IDK, Solana is just buggy mess, so this was the only workaround to get it working (basically does nothing, just parses it correctly)
        const a = JSON.stringify(IDL)
        const b = JSON.parse(a)
        setProgram(new Program<DecentralizedNews>(b, process.env.REACT_APP_PROGRAM_ID, provider));
    }, [publicKey, signAllTransactions, signTransaction, process.env.REACT_APP_PROGRAM_ID])
    

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
    }, [process.env.REACT_APP_PROGRAM_ID, program])

    useEffect(() => {
        loadArticle()
    }, [program])
    
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