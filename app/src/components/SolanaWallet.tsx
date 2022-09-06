import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { createDefaultAddressSelector, createDefaultAuthorizationResultCache, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';
import * as anchor from "@project-serum/anchor"
import { PublicKey } from "@solana/web3.js"

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export class AnchorWallet implements anchor.Wallet {

    constructor(readonly payer: anchor.web3.Keypair) {
        this.payer = payer
    }

    async signTransaction(tx: anchor.web3.Transaction): Promise<anchor.web3.Transaction> {
        tx.partialSign(this.payer);
        return tx;
    }

    async signAllTransactions(txs: anchor.web3.Transaction[]): Promise<anchor.web3.Transaction[]> {
        return txs.map((t) => {
            t.partialSign(this.payer);
            return t;
        });
    }

    get publicKey(): PublicKey {
        return this.payer.publicKey;
    }
}

export const SolanaWallet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            /**
             * Select the wallets you wish to support, by instantiating wallet adapters here.
             *
             * Common adapters can be found in the npm package `@solana/wallet-adapter-wallets`.
             * That package supports tree shaking and lazy loading -- only the wallets you import
             * will be compiled into your application, and only the dependencies of wallets that
             * your users connect to will be loaded.
             */
            new SolanaMobileWalletAdapter({
                addressSelector: createDefaultAddressSelector(),
                appIdentity: {
                    name: 'Decentralized news',
                    uri: 'http://localhost:3000/',
                    icon: 'http://localhost:3000/',
                },
                authorizationResultCache: createDefaultAuthorizationResultCache(),
                cluster: 'devnet',
            }),
            
            new SolflareWalletAdapter(),
            new PhantomWalletAdapter(),

            
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    { /* Your app's components go here, nested within the context providers. */}
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};