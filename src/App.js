import React from 'react';
import './App.css';
import Game from './components/Game/Game';
import Layout from './components/hoc/Layout';

function App() {
  return (
    <Layout>
      <Game />
    </Layout>
  );
}

export default App;
