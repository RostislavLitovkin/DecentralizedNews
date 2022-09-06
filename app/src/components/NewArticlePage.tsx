import { AnchorProvider, Program } from "@project-serum/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Button } from "antd";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ArticleDto } from "../dto/ArticleDto";
import { IDL } from "../idl/idl";
import { DecentralizedNews } from "../types/decentralized_news";
import * as Yup from 'yup'
import { FormikInput } from "./FormikInput";
import * as anchor from "@project-serum/anchor";
import { SystemProgram, PublicKey } from "@solana/web3.js"
import { useNavigate } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";

const Layout = styled('div')`
    width: 100vw;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center
`

const Line = styled('hr')`
    color: white;
    width: 100%;
`

const Title = styled('div')`
    width: 100%;
    font-size: 30px;
    font-weight: 900;
    color: white;
`

const SubmitButton = styled(Button)`
    background-color: #42f5a1;
    height: 60px;
    border-radius: 60px;
    width: 320px;
    font-weight: 900;
    font-size: 30px;
`

const FormSchema = Yup.object({
    title: Yup.string().required().max(50),
    description: Yup.string().required().max(500),
    titleImage: Yup.string().required().max(100),
})

export const NewArticlePage: React.FC = () => {
    const { connection } = useConnection();
    const navigate = useNavigate()
    const { publicKey, signAllTransactions, signTransaction } = useWallet();
    const [program, setProgram] = useState<Program<DecentralizedNews>>();
    const { connected } = useWallet();

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
    }, [publicKey, signAllTransactions, signTransaction, connection])



    return (
        <>{ connected ? 
        <Layout>
            <Formik<ArticleDto>
                initialValues={{
                    title: "",
                    description: "",
                    titleImage: ""
                }}
                validationSchema={FormSchema}
                onSubmit={async (values) => {
                    if (!(program && publicKey)) return;

                    const [statePDA,] = await PublicKey
                        .findProgramAddress(
                            [
                                anchor.utils.bytes.utf8.encode("state"),
                            ],
                            program.programId
                        );

                    let programState = await program.account.state.fetch(statePDA);

                    const [articlePDA,] = await PublicKey
                        .findProgramAddress(
                            [
                                anchor.utils.bytes.utf8.encode(programState.totalArticles.toString()),
                            ],
                            program.programId
                        );
                    // Add your test here.
                    await program.methods.publishArticle(values.title, values.description, values.titleImage).accounts({
                        state: statePDA,
                        signer: publicKey,
                        article: articlePDA,
                        systemProgram: SystemProgram.programId,
                    })
                        .signers([])
                        .rpc();

                    navigate('/')
                }}>
                {({ errors, handleSubmit }) => (<form style={{ width: '100%' }} onSubmit={handleSubmit}>
                    <Title>Create new article</Title>
                    <Line />
                    <FormikInput name="title" label="Title" errorMessage={errors.title}></FormikInput>
                    <FormikInput name="titleImage" label="Image" errorMessage={errors.titleImage}></FormikInput>
                    <FormikInput name="description" label="Description" errorMessage={errors.description}></FormikInput>
                    <br></br>
                    <br></br>
                    <SubmitButton type="primary" htmlType="submit">Submit</SubmitButton>
                </form>)}
            </Formik>
        </Layout>
        : 
        <ErrorPage message='Please connect your wallet'/>}
        </>
    )
}