import { WalletMultiButton } from "@solana/wallet-adapter-react-ui" 
import styled from "styled-components"
import { MAIN } from "../constants/colors"

const Navbar = styled('div')`
    position: absolute; 
    background-color: #333a;
    border-color: #ffffff33;
    border-radius: 30px;
    height: 60px;
    width: 85vw;
    max-width: 1200px;
    border-style: solid;
    margin-top: 10px;
    display: flex;
    color: white;
    backdrop-filter: blur(5px);
    align-self: center;
    align-items: center;
    justify-content: space-between;
`

const Title = styled('a')`
    font-weight: 900;
    font-size: min(40px, calc(80vw / 30));
    margin: 20px;
    color: white;
    text-decoration: none !important;

    &:hover {
        text-shadow: 0px 0px 8px #D278F0;   
    }
`

const Link = styled('a')`
    font-weight: 700;
    font-size: min(30px, calc(80vw / 35));
    margin-top: 20px;
    margin-bottom: 20px;
    text-decoration: none !important;
    color: #ddd;
`

const CustomSolanaWalletMultiButton = styled(WalletMultiButton)`
    border-radius: 30px;
    height: 60px;
    background-color: ${MAIN};
    font-size: min(20px, calc(80vw / 40));
    &:hover {
        background-color: #42f5a1;
    }
`

const FooterLayout = styled('div')`
    display: flex;
    position: absolute; 
    align-self: center;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    height: 60px;
    left: 0; 
    right: 0;
    bottom: 0;
    margin-left: auto; 
    margin-right: auto; 
`

const FooterLink = styled('a')`
    font-weight: 700;
    font-size: min(30px, calc(80vw / 35));
    margin-top: 20px;
    margin-bottom: 20px;
    text-decoration: none !important;
    color: #fff;
    text-shadow: 0px 0px 8px #000;   
`
const FooterText = styled('div')`
    font-weight: 700;
    font-size: min(30px, calc(80vw / 35));
    margin-top: 20px;
    margin-bottom: 20px;
    text-decoration: none !important;
    color: #fff;
    text-shadow: 0px 0px 8px #000;   
`

export const Layout: React.FC = () => {
    return (
        <>
            <Navbar>
                <Title href={process.env.PUBLIC_URL.concat("/#")}>Decentralized news</Title>
                <Link href={process.env.PUBLIC_URL.concat("/#/NewArticle")}>Create new article</Link>
                <CustomSolanaWalletMultiButton />
            </Navbar>
            <FooterLayout>
                <FooterText>Solana Testnet</FooterText>
                <FooterLink href="https://github.com/RostislavLitovkin/DecentralizedNews">Contribute</FooterLink>
            </FooterLayout>
        </>

    )
}