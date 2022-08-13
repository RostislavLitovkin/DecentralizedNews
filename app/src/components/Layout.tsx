import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import styled from "styled-components"

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

export const Layout: React.FC = () => {
    return (
        <Navbar>
            <Title>Decentralized news</Title>
            <CustomSolanaWalletMultiButton />
        </Navbar>
    )
}