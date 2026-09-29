import { useState } from 'react';
import axios from 'axios';
import CadastroUsuario from './components/CadastroUsuario';
import ListaDivulgacao from './components/ListaDivulgacao';
import Login from './components/Login'; // 1. Importa o Login aqui

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState(null);

  const buscarUsuarios = async () => {
    try {
      setErro(null);
      const response = await axios.get('http://localhost:5184/api/Usuario');
      setUsuarios(response.data);
    } catch (err) {
      console.error(err);
      setErro('Não foi possível conectar à API. Verifique se o backend está rodando!');
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      {/* 2. Adiciona a tela de login aqui no topo */}
      <Login />
      
      <hr style={{ margin: '50px 0', border: '0', borderTop: '2px dashed #002bff' }} />

      <h1>Projeto Adoção - Painel Administrativo</h1>
      
      <CadastroUsuario />
      
      <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #ccc' }} />
      
      <button
        onClick={buscarUsuarios}
        style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '16px', background: '#002bff', color: '#fff', border: 'none', borderRadius: '4px', width: '100%' }}
      >
        Buscar Usuários do MySQL
      </button>

      {erro && (
        <p style={{ color: 'red', marginTop: '20px', fontWeight: 'bold' }}>{erro}</p>
      )}

      <div style={{ marginTop: '30px' }}>
        <h3>Lista de Usuários no Banco:</h3>
        <hr style={{ margin: '10px 0', border: '0', borderTop: '1px solid #ccc' }} />
        
        <ListaDivulgacao usuarios={usuarios} />
      </div>
    </div>
  );
}

export default App; // 3. Adicionado o export que faltava no seu código
