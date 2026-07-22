import { useState } from 'react'
import axios from 'axios'

function CadastroUsuario() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    celular: ''
  })
  const [mensagem, setMensagem] = useState(null)
  const [sucesso, setSucesso] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensagem(null)
    setSucesso(false)

    try {
      // Ajuste a URL/porta se necessário
      await axios.post('http://localhost:5184/api/Usuario', formData)
      
      setSucesso(true)
      setMensagem('Usuário cadastrado com sucesso! Clique no botão de listar para ver.')
      setFormData({ nome: '', email: '', senha: '', celular: '' }) // Limpa o formulário
    } catch (err) {
      console.error(err)
      if (err.response && err.response.data && err.response.data.errors) {
        // Pega os erros de validação que o backend mandou
        const errosBackend = Object.values(err.response.data.errors).join(' ')
        setMensagem(errosBackend)
      } else {
        setMensagem('Erro ao conectar com a API.')
      }
    }
  }

  return (
    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #ddd' }}>
      <h2>Cadastrar Novo Usuário</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" name="nome" placeholder="Nome Completo" value={formData.nome} onChange={handleChange} required style={{ padding: '8px' }} />
        <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required style={{ padding: '8px' }} />
        <input type="password" name="senha" placeholder="Senha (mínimo 6 caracteres)" value={formData.senha} onChange={handleChange} required style={{ padding: '8px' }} />
        <input type="text" name="celular" placeholder="Celular (11 dígitos numéricos)" value={formData.celular} onChange={handleChange} required style={{ padding: '8px' }} />
        
        <button type="submit" style={{ padding: '10px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
          Salvar no Banco
        </button>
      </form>

      {mensagem && (
        <p style={{ color: sucesso ? 'green' : 'red', marginTop: '15px', fontWeight: 'bold' }}>{mensagem}</p>
      )}
    </div>
  )
}

export default CadastroUsuario