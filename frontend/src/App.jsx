import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importação das páginas da aplicação
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Tela Inicial: Quem abre o site cai direto no Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* 2. Tela de Cadastro: Mapeada para resolver o ecrã em branco */}
        <Route path="/cadastro" element={<Cadastro />} />

        {/* 3. Feed de Pets */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;