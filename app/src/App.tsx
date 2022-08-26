import React from 'react';
import './App.css';
import { Router } from './router/Router';
import { Layout } from './components/Layout';
import { SolanaWallet } from './components/SolanaWallet';
import styled from 'styled-components';

const MainLayout = styled('div')`
  display: flex;
  flex-direction: column;

  background-color: #111;
  height: 100vh;
  width: 100vw;
`

function App() {
  return (
    <SolanaWallet>
      <MainLayout>
        <Layout />
        <br />
        <Router />
      </MainLayout>
    </SolanaWallet>
  );
}

export default App;
