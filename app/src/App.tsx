import React from 'react';
import { Router } from './router/Router';
import { Layout } from './components/Layout';
import styled from 'styled-components';
import { NavbarTopEmptySpace } from './styled/NavbarTopEmptySpace';
import { FooterBottomEmptySpace } from './styled/FooterBottomEmptySpace';
import { MAIN } from './constants/colors';
import { useWallet } from '@solana/wallet-adapter-react';
import { ErrorPage } from './components/ErrorPage';

const BackgroundLayout = styled('div')`
  display: flex;
  flex-direction: column;
  background-color: #111;
  height: 100vh;
  width: 100vw;
`

const ScrollLayout = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0.25rem;
  }
  ::-webkit-scrollbar-track{
    background-color: #222;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${MAIN};
  }
  
`

function App() {
  const { connected } = useWallet();
  return (
      <BackgroundLayout>
        <Layout />
        { connected ? <ScrollLayout>
          <NavbarTopEmptySpace />
          <Router />
          <FooterBottomEmptySpace />
        </ScrollLayout> : 
        <ErrorPage message='Please connect your wallet'/>}
      </BackgroundLayout>
  );
}

export default App;
