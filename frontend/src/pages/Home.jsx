import React, { useState, useEffect } from 'react';

export default function Home() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('Todos');
  const [selectedSize, setSelectedSize] = useState('Todos');

  useEffect(() => {
    document.title = "Lar Para Focinhos | Início";

    // Futura integração com o backend C#:
    // fetch('https://sua-api.com/api/pets')
    //   .then(res => res.json())
    //   .then(data => setPets(data))
    //   .finally(() => setLoading(false));

    setLoading(false);
  }, []);

  // Filtragem em cima dos dados reais da API
  const filteredPets = pets.filter(pet => {
    const matchesSearch = (pet.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (pet.breed || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (pet.location || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecies = selectedSpecies === 'Todos' || pet.species === selectedSpecies;
    const matchesSize = selectedSize === 'Todos' || pet.size === selectedSize;

    return matchesSearch && matchesSpecies && matchesSize;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      
      {/* Banner Inicial */}
      <section className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 text-white py-12 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto text-center md:text-left">
          <span className="bg-white/20 text-white text-xs font-semibold uppercase px-3 py-1 rounded-full">
            🐾 Adotar é um ato de amor
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-4 mb-2">
            Encontre o seu novo melhor amigo
          </h1>
          <p className="text-purple-100 max-w-xl">
            Conectando animais resgatados a novos lares.
          </p>
        </div>
      </section>

      {/* Estrutura de Filtros */}
      <section id="feed" className="max-w-6xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-500 mb-1">Pesquisar</label>
            <input
              type="text"
              placeholder="Nome, raça ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Espécie</label>
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
            >
              <option value="Todos">Todas as Espécies</option>
              <option value="Cão">Cão</option>
              <option value="Gato">Gato</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Porte</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
            >
              <option value="Todos">Todos os Portes</option>
              <option value="Pequeno">Pequeno</option>
              <option value="Médio">Médio</option>
              <option value="Grande">Grande</option>
            </select>
          </div>

        </div>
      </section>

      {/* Feed de Animais Reais */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Animais para Adoção</h2>

        {loading ? (
          <p className="text-center text-slate-500 py-10">Carregando...</p>
        ) : filteredPets.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-4xl mb-2 block">🐾</span>
            <h3 className="text-lg font-semibold text-slate-700">Nenhum animal cadastrado no momento</h3>
            <p className="text-slate-500 text-sm mt-1">Os animais cadastrados no backend aparecerão aqui automaticamente.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map((pet) => (
              <div key={pet.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                <img src={pet.imageUrl || 'https://via.placeholder.com/400x300?text=Sem+Foto'} alt={pet.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-slate-800">{pet.name}</h3>
                  <p className="text-sm text-slate-500">{pet.breed} • {pet.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}