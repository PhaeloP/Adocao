import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, PawPrint } from 'lucide-react';
import api from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    try {
      // Faz o login usando a nossa API centralizada
      const response = await api.post('/Usuario/login', {
        email: email,
        senha: senha
      });

      console.log('Login feito com sucesso:', response.data);
      alert('Login realizado com sucesso!');
      
      // Redireciona o usuário para a Home (Feed)
      navigate('/');
    } catch (err) {
      console.error('Erro no login:', err);
      setErro('E-mail ou senha inválidos.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Coluna da Esquerda: Formulário */}
      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        
        <div style={{ width: '100%', maxWidth: '380px' }}>
          
          {/* Logo / Título */}
          <div style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <PawPrint size={32} color="#ea580c" />
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
              Amigo<span style={{ color: '#ea580c' }}>Pet</span>
            </span>
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            Acessar sua conta
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '14px' }}>
            Encontre seu novo amigo e mude uma vida.
          </p>

          {/* Mensagem de Erro */}
          {erro && (
            <div style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', border: '1px solid #fecaca' }}>
              {erro}
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Campo E-mail */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                E-mail
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="seu.email@exemplo.com"
                  style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>
                Senha
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  placeholder="Sua senha"
                  style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Botão Entrar */}
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
              <LogIn size={18} />
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>

          </form>

          {/* Link para Cadastro */}
          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
            Ainda não tem conta?{' '}
            <Link to="/cadastro" style={{ color: '#ea580c', fontWeight: '600', textDecoration: 'none' }}>
              Cadastre-se
            </Link>
          </div>

        </div>
      </div>

      {/* Coluna da Direita: Imagem de Capa */}
      <div style={{ flex: 1, backgroundColor: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80"
          alt="Cachorro para adoção"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

    </div>
  );
}

export default Login;