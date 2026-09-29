import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setErro(null);
      // Alterado para a rota correta que vimos no seu Swagger
      const response = await axios.post('http://localhost:5184/api/Usuario/login', {
        email: email,
        senha: senha
      });
      
      alert('Login realizado com sucesso!');
      console.log(response.data);
    } catch (err) {
      setErro('E-mail ou senha inválidos.');
    }
  };


  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Acessar Painel</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>E-mail:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Senha:</label>
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#002bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>
      {erro && <p style={{ color: 'red', marginTop: '15px' }}>{erro}</p>}
    </div>
  );
}

export default Login;
