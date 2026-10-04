import axios from 'axios';

const api = axios.create({
  // Utiliza a URL do Render em produção ou localhost em desenvolvimento
  baseURL: import.meta.env.VITE_API_URL || 'https://adocao-mayn.onrender.com/api'
});

export default api;