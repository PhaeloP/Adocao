import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, PawPrint, Heart, MapPin, RefreshCw } from 'lucide-react';
import api from '../services/api';

export default function Home() {
  const [pets, setPets] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [especie, setEspecie] = useState('Todos');
  const [porte, setPorte] = useState('Todos');

  useEffect(() => {
    document.title = "Lar Para Focinhos | Início";
    carregarPets();
  }, []);

  const carregarPets = async () => {
    setCarregando(true);
    try {
      const response = await api.get('/Pet');
      setPets(response.data || []);
    } catch (erro) {
      console.error('Erro ao carregar pets da API:', erro);
      setPets([]);
    } finally {
      setCarregando(false);
    }
  };

  // Filtragem dinâmica dos dados reais
  const petsFiltrados = pets.filter(pet => {
    const combinaBusca = (pet.nome || '').toLowerCase().includes(busca.toLowerCase()) || 
                          (pet.cidade || '').toLowerCase().includes(busca.toLowerCase());
    const combinaEspecie = especie === 'Todos' || (pet.especie || '').toLowerCase() === especie.toLowerCase();
    const combinaPorte = porte === 'Todos' || (pet.porte || '').toLowerCase() === porte.toLowerCase();

    return combinaBusca && combinaEspecie && combinaPorte;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Topo: Busca e Filtros */}
        <section style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', marginBottom: '32px' }}>
          
          {/* Barra de Busca */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <Search size={20} color="#9ca3af" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Buscar por nome do pet ou cidade..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 44px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {/* Linha de Botões de Filtro */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Filtro Espécie */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151', minWidth: '70px' }}>Espécie:</span>
              {['Todos', 'Cão', 'Gato'].map((item) => (
                <button
                  key={item}
                  onClick={() => setEspecie(item)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: '1px solid',
                    borderColor: especie === item ? '#ea580c' : '#d1d5db',
                    backgroundColor: especie === item ? '#ea580c' : '#ffffff',
                    color: especie === item ? '#ffffff' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Filtro Porte */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151', minWidth: '70px' }}>Porte:</span>
              {['Todos', 'Pequeno', 'Médio', 'Grande'].map((item) => (
                <button
                  key={item}
                  onClick={() => setPorte(item)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: '1px solid',
                    borderColor: porte === item ? '#ea580c' : '#d1d5db',
                    backgroundColor: porte === item ? '#ea580c' : '#ffffff',
                    color: porte === item ? '#ffffff' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* Área do Feed de Pets */}
        <main>
          {carregando ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
              <RefreshCw size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: '12px', color: '#ea580c' }} />
              <p style={{ fontSize: '15px' }}>Carregando dados da API...</p>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          ) : petsFiltrados.length === 0 ? (
            /* Tela Vazia */
            <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
              <PawPrint size={48} color="#d1d5db" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>
                Nenhum pet cadastrado ou encontrado
              </h3>
              <p style={{ color: '#6b7280', fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
                Assim que houverem cadastros,  os bichinhos aparecerão aqui.
              </p>
            </div>
          ) : (
            /* Cards de Pets Reais */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {petsFiltrados.map((pet) => (
                <div key={pet.id} style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
                  
                  {pet.imagemUrl && (
                    <div style={{ height: '200px', width: '100%', backgroundColor: '#f3f4f6' }}>
                      <img src={pet.imagemUrl} alt={pet.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}

                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827' }}>{pet.nome}</h2>
                        <span style={{ fontSize: '12px', backgroundColor: '#fff7ed', color: '#ea580c', padding: '4px 8px', borderRadius: '6px', fontWeight: '600' }}>
                          {pet.especie}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280', fontSize: '13px', marginBottom: '12px' }}>
                        <MapPin size={14} color="#ea580c" />
                        <span>{pet.cidade || 'Local não informado'}</span>
                      </div>

                      <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.5', marginBottom: '16px' }}>
                        {pet.descricao}
                      </p>
                    </div>

                    <Link
                      to={`/pet/${pet.id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '10px',
                        backgroundColor: '#ea580c',
                        color: '#ffffff',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '14px',
                        textAlign: 'center'
                      }}
                    >
                      <Heart size={16} /> Ver Detalhes
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}