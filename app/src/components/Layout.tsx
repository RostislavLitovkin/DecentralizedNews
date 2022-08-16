import {
    Program,
    Provider,
    BN,
    web3,
    AnchorProvider,
} from "@project-serum/anchor"
import { SystemProgram, PublicKey } from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { IDL } from '../idl/idl'
import * as anchor from "@project-serum/anchor";
import { DecentralizedNews } from "../types/decentralized_news"
import { idlAddress } from "@project-serum/anchor/dist/cjs/idl"

const Navbar = styled('div')`
    background-color: #333a;
    border-color: #ffffff33;
    border-radius: 30px;
    height: 60px;
    width: 80vw;
    max-width: 1200px;
    border-style: solid;
    margin-top: 10px;

    display: flex;
    color: white;

    align-self: center;
    align-items: center;
    justify-content: space-between;
`

const Title = styled('div')`
    font-weight: 900;
    font-size: 40px;
    margin: 20px;
`

const CustomSolanaWalletMultiButton = styled(WalletMultiButton)`
    border-radius: 30px;
    height: 60px;
    background-color: #42f5a1;

    &:hover {
        background-color: #42f5a1;
    }
`

const opts = {
    preflightCommitment: "recent",
};

export const Layout: React.FC = () => {
    const { connection } = useConnection();
    const { publicKey, connected, signAllTransactions, signTransaction } = useWallet();

    const [balance, setBalance] = useState(0)
    const [state, setState] = useState(-2);
    const [program, setProgram] = useState<Program<DecentralizedNews>>();

    const getBalance = useCallback(async () => {
        if (publicKey) setBalance(await connection.getBalance(publicKey))
        console.log(balance)
        console.log(publicKey)
    }, [setBalance, publicKey])


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

    const inizializeState = useCallback(async () => {

        if (!(process.env.REACT_APP_PROGRAM_ID && program && publicKey)) return;
        const [statePDA,] = await PublicKey.findProgramAddress(
            [
                anchor.utils.bytes.utf8.encode("state"),
            ],
            new PublicKey(process.env.REACT_APP_PROGRAM_ID)
        );

        await program.methods.initialize().accounts({
            state: statePDA,
            signer: publicKey,
            systemProgram: SystemProgram.programId,
        }).signers([]).rpc();

        console.log("Došlo to sem")

        let programState = await program.account.state.fetch(statePDA);

        setState(programState.totalArticles)
    }, [publicKey])

    const getState = useCallback(async () => {

        if (!(process.env.REACT_APP_PROGRAM_ID && program)) {
            if (!program) console.log("No program")
            console.log("ENDED")
            return;
        }
        console.log("continues")
        const [statePDA,] = await PublicKey.findProgramAddress(
            [
                anchor.utils.bytes.utf8.encode("state"),
            ],
            new PublicKey(process.env.REACT_APP_PROGRAM_ID)
        );

        let programState = await program.account.state.fetch(statePDA);

        setState(programState.totalArticles)
    }, [publicKey, process.env.REACT_APP_PROGRAM_ID, program])

    useEffect(() => {
        getBalance()
    }, [publicKey])

    return (
        <Navbar>
            <Title>Decentralized news</Title>
            {connected && <button onClick={async () => {
                await getState();

            }}>Balance: {state}</button>}
            <CustomSolanaWalletMultiButton />
        </Navbar>
    )
}