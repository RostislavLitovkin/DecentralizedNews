import React from 'react';
import './App.css';
import { Router } from './router/Router';
import { Layout } from './components/Layout';
import { FlexLayout } from './styled/FlexLayout';
import { SolanaWallet } from './components/SolanaWallet';

function App() {
  return (
    <SolanaWallet>
      <FlexLayout>
        <Layout />
        <br />
        <Router />
      </FlexLayout>
    </SolanaWallet>
  );
}

export default App;
