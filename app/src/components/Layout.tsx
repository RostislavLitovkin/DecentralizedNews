import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export const Layout: React.FC = () => {
    return (
        <>
            This is supposed to show a layout that will be shown on every page
            <WalletMultiButton />
            <WalletDisconnectButton />
        </>
    )
}