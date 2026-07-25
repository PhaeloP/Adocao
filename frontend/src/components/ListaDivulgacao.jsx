import { useState } from 'react'
import axios from 'axios'

function ListaDivulgacao() {
  const [animais, setAnimais] = useState([])
  const [erro, setErro] = useState(null)

  const buscarAnimais = async () => {
    try {
      setErro(null)
      const resposta = await axios.get('http://localhost:5184/api/Divulgacao')
      setAnimais(resposta.data) // <--- Se seu backend retornar uma lista de divulgações
    } catch (err) {
      console.error(err)
      setErro('Erro ao buscar divulgações no banco.')
    }
  }

  return (
    <div style={{ marginTop: '30px' }}>
      <button 
        onClick={buscarAnimais}
        style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '16px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', width: '100%', marginBottom: '15px' }}
      >
        Buscar Animais para Adoção
      </button>

      {erro && <p style={{ color: 'red', fontWeight: 'bold' }}>{erro}</p>}

      <h3>Animais Divulgados:</h3>
      {animais.length === 0 ? (
        <p style={{ color: '#666' }}>Nenhum animal listado.</p>
      ) : (
        <ul style={{ background: '#f4f4f4', padding: '20px', borderRadius: '4px', listStyleType: 'none' }}>
          {animais.map((pet) => (
            <li key={pet.id} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
              <strong>Nome:</strong> {pet.nomeAnimal || 'Sem nome'} | <strong>Idade:</strong> {pet.idade} anos | <strong>Cidade:</strong> {pet.cidade}-{pet.estado}
              <br />
              <strong>Contato/Obs:</strong> {pet.observacao}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListaDivulgacao
