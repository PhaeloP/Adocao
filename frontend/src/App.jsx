import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importação das telas da sua aplicação
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota raiz ('/'): Define que o Cadastro é a PRIMEIRA tela ao abrir o site */}
        <Route path="/" element={<Cadastro />} />

        {/* Rota de Login ('/login'): Fica pronta para quando o usuário clicar em "Já tenho conta" */}
        <Route path="/login" element={<Login />} />

        {/* Rota do Feed ('/home'): Onde o feed de pets vai ficar no futuro */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;