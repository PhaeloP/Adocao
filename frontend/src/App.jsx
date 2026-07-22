import { useState } from 'react'
import axios from 'axios'
import CadastroUsuario from './components/CadastroUsuario' // <--- Importação aqui

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [erro, setErro] = useState(null)

  const buscarUsuarios = async () => {
    try {
      setErro(null)
      const response = await axios.get('http://localhost:5184/api/Usuario')
      setUsuarios(response.data)
    } catch (err) {
      console.error(err)
      setErro('Não foi possível conectar à API. Verifique se o backend está rodando!')
    }
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1>Projeto Adoção - Painel Administrativo</h1>
      
      {/* Renderiza o formulário de cadastro */}
      <CadastroUsuario /> 

      <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #ccc' }} />

      <button 
        onClick={buscarUsuarios}
        style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', width: '100%' }}
      >
        Buscar Usuários do MySQL
      </button>

      {erro && (
        <p style={{ color: 'red', marginTop: '20px', fontWeight: 'bold' }}>{erro}</p>
      )}

      <div style={{ marginTop: '30px' }}>
        <h3>Lista de Usuários no Banco:</h3>
        {usuarios.length === 0 ? (
          <p style={{ color: '#666' }}>Nenhum usuário carregado ainda.</p>
        ) : (
          <ul style={{ background: '#f4f4f4', padding: '20px', borderRadius: '4px', listStyleType: 'none' }}>
            {usuarios.map((usuario) => (
              <li key={usuario.id} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
                <strong>ID:</strong> {usuario.id} | <strong>Nome:</strong> {usuario.nome} | <strong>E-mail:</strong> {usuario.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App