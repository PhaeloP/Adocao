import { useState } from 'react'
import axios from 'axios'

function CadastroUsuario() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '', // 1. Adicionado o sobrenome no estado inicial
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
      await axios.post('http://localhost:5184/api/Usuario', formData)
      
      setSucesso(true)
      setMensagem('Usuário cadastrado com sucesso! Use os dados acima para logar.')
      setFormData({ nome: '', sobrenome: '', email: '', senha: '', celular: '' }) // Limpa tudo
    } catch (err) {
      console.error(err)
      if (err.response && err.response.data && err.response.data.errors) {
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
        <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required style={{ padding: '8px' }} />
        
        {/* 2. Corrigido o value para puxar do estado correto do sobrenome */}
        <input type="text" name="sobrenome" placeholder="Sobrenome" value={formData.sobrenome} onChange={handleChange} required style={{ padding: '8px' }} />
        
        <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} required style={{ padding: '8px' }} />
        
        {/* 3. Devolvidos os campos obrigatórios que tinham sumido */}
        <input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} required style={{ padding: '8px' }} />
        <input type="text" name="celular" placeholder="Celular" value={formData.celular} onChange={handleChange} required style={{ padding: '8px' }} />

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
