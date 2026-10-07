import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, UserPlus, PawPrint } from 'lucide-react';
import api from '../services/api';

  function Cadastro() {
  // 👇 Coloque AQUI (dentro da função, no topo)
  useEffect(() => {
    document.title = "Lar Para Focinhos | Cadastrar-se";
  }, []);

  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    celular: ''
  });

  // ... resto do seu código continua aqui

  const [mensagem, setMensagem] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem(null);
    setSucesso(false);
    setCarregando(true);

    try {
      await api.post('/Usuario', formData);
      setSucesso(true);
      setMensagem('Usuário cadastrado com sucesso! Redirecionando para o login...');
      
      // Limpa o formulário
      setFormData({ nome: '', sobrenome: '', email: '', senha: '', celular: '' });

      // Redireciona para a tela de Login após 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error(err);
      setSucesso(false);
      if (err.response && err.response.data && err.response.data.errors) {
        const errosBackend = Object.values(err.response.data.errors).join(' ');
        setMensagem(errosBackend);
      } else {
        setMensagem('Erro ao realizar cadastro. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Coluna da Esquerda: Formulário */}
      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        
        <div style={{ width: '100%', maxWidth: '420px' }}>
          
          {/* Logo / Título */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <PawPrint size={32} color="#ea580c" />
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
              Amigo<span style={{ color: '#ea580c' }}>Pet</span>
            </span>
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            Crie sua conta
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '14px' }}>
            Junte-se à nossa comunidade e ajude a transformar vidas.
          </p>

          {/* Mensagem de Erro / Sucesso */}
          {mensagem && (
            <div style={{
              backgroundColor: sucesso ? '#f0fdf4' : '#fef2f2',
              color: sucesso ? '#15803d' : '#dc2626',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px',
              border: `1px solid ${sucesso ? '#bbf7d0' : '#fecaca'}`
            }}>
              {mensagem}
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Nome e Sobrenome lado a lado */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                  Nome
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome"
                    style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                  Sobrenome
                </label>
                <input
                  type="text"
                  name="sobrenome"
                  value={formData.sobrenome}
                  onChange={handleChange}
                  required
                  placeholder="Sobrenome"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* E-mail */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                E-mail
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu.email@exemplo.com"
                  style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Celular */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                Celular
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="tel"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  required
                  placeholder="(11) 99999-9999"
                  style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                Senha
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  placeholder="Crie uma senha"
                  style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Botão Cadastrar */}
            <button
              type="submit"
              disabled={carregando}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '12px',
                backgroundColor: '#ea580c',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              <UserPlus size={18} />
              {carregando ? 'Cadastrando...' : 'Criar Conta'}
            </button>

          </form>

          {/* Link para Login */}
          <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
            Já tem uma conta?{' '}
            <Link to="/login" style={{ color: '#ea580c', fontWeight: '600', textDecoration: 'none' }}>
              Faça login
            </Link>
          </div>

        </div>
      </div>

      {/* Coluna da Direita: Imagem */}
      <div style={{ flex: 1, backgroundColor: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1000&q=80"
          alt="Gatinho e cachorrinho para adoção"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

    </div>
  );
}

export default Cadastro;