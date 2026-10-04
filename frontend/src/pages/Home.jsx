import React, { useState } from 'react';

// Dados de exemplo para os animais
const PETS_DATA = [
  {
    id: 1,
    name: "Thor",
    species: "Cão",
    breed: "Golden Mix",
    age: "2 anos",
    gender: "Macho",
    size: "Médio",
    location: "São Paulo, SP",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600",
    urgent: false,
    tags: ["Vacinado", "Castrado", "Sociável"]
  },
  {
    id: 2,
    name: "Luna",
    species: "Gato",
    breed: "Siamês Mix",
    age: "8 meses",
    gender: "Fêmea",
    size: "Pequeno",
    location: "Campinas, SP",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600",
    urgent: true,
    tags: ["Desparasitado", "Castrada", "Brincalhona"]
  },
  {
    id: 3,
    name: "Bob",
    species: "Cão",
    breed: "Vira-lata (SRD)",
    age: "1 ano",
    gender: "Macho",
    size: "Grande",
    location: "Santos, SP",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600",
    urgent: false,
    tags: ["Vacinado", "Dócil"]
  },
  {
    id: 4,
    name: "Mimi",
    species: "Gato",
    breed: "Persa Mix",
    age: "3 anos",
    gender: "Fêmea",
    size: "Pequeno",
    location: "São Paulo, SP",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=600",
    urgent: false,
    tags: ["Calma", "Castrada"]
  },
  {
    id: 5,
    name: "Pipoca",
    species: "Cão",
    breed: "Poodle Mix",
    age: "5 meses",
    gender: "Fêmea",
    size: "Pequeno",
    location: "Guarulhos, SP",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600",
    urgent: true,
    tags: ["Filhote", "Vacinada"]
  },
  {
    id: 6,
    name: "Simba",
    species: "Gato",
    breed: "Laranja (SRD)",
    age: "2 anos",
    gender: "Macho",
    size: "Médio",
    location: "Osasco, SP",
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=600",
    urgent: false,
    tags: ["Sociável", "Castrado"]
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('Todos');
  const [selectedSize, setSelectedSize] = useState('Todos');
  const [favorites, setFavorites] = useState([]);

  // Alternar favorito
  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filtragem dinâmica dos animais
  const filteredPets = PETS_DATA.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pet.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecies = selectedSpecies === 'Todos' || pet.species === selectedSpecies;
    const matchesSize = selectedSize === 'Todos' || pet.size === selectedSize;

    return matchesSearch && matchesSpecies && matchesSize;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      
      {/* 1. HERO BANNER */}
      <section className="relative bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              🐾 Adotar é um ato de amor
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Encontre o seu novo melhor amigo
            </h1>
            <p className="text-lg text-purple-100 mb-8">
              Milhares de cães e gatos estão à espera de um lar cheio de carinho. Dê uma oportunidade a quem só quer dar amor!
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a href="#feed" className="bg-white text-purple-700 font-bold px-6 py-3 rounded-xl shadow-md hover:bg-purple-50 transition">
                Ver Animais
              </a>
              <a href="#como-funciona" className="border border-white/40 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition">
                Como Funciona
              </a>
            </div>
          </div>
          <div className="relative w-full max-w-sm">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur opacity-30"></div>
            <img 
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600" 
              alt="Cão e Gato" 
              className="relative rounded-3xl shadow-2xl object-cover w-full h-80"
            />
          </div>
        </div>
      </section>

      {/* 2. ÁREA DE PESQUISA E FILTROS */}
      <section id="feed" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Campo de Pesquisa */}
            <div className="sm:col-span-2 relative">
              <label className="block text-xs font-semibold text-slate-500 mb-1">Pesquisar</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nome, raça ou cidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
                <svg className="w-5 h-5 text-slate-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>

            {/* Filtro de Espécie */}
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

            {/* Filtro de Porte */}
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
        </div>
      </section>

      {/* 3. FEED DE PETS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Animais Disponíveis</h2>
            <p className="text-sm text-slate-500">A mostrar {filteredPets.length} resultados</p>
          </div>
        </div>

        {filteredPets.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
            <span className="text-4xl mb-3 block">🐶🐱</span>
            <h3 className="text-lg font-semibold text-slate-700 mb-1">Nenhum animal encontrado</h3>
            <p className="text-slate-500 text-sm">Tente ajustar os seus filtros de pesquisa.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map((pet) => (
              <div 
                key={pet.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col"
              >
                {/* Imagem + Badges */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={pet.image} 
                    alt={pet.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badge de Urgência */}
                  {pet.urgent && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md animate-pulse">
                      Urgente
                    </span>
                  )}

                  {/* Botão de Favorito */}
                  <button 
                    onClick={() => toggleFavorite(pet.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-md hover:bg-white transition"
                  >
                    <svg 
                      className={`w-5 h-5 ${favorites.includes(pet.id) ? 'text-red-500 fill-current' : 'text-slate-400'}`} 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      fill="none"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Conteúdo do Card */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-slate-800">{pet.name}</h3>
                      <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
                        {pet.gender} • {pet.age}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      </svg>
                      {pet.location}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {pet.tags.map((tag, idx) => (
                        <span key={idx} className="text-[11px] bg-purple-50 text-purple-700 font-medium px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-slate-900 hover:bg-purple-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm shadow-sm">
                    Conhecer {pet.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. BLOC DE IMPACTO */}
      <section className="bg-white border-t border-slate-100 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">O Nosso Impacto</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 rounded-2xl">
              <span className="text-4xl font-extrabold text-purple-600 block mb-1">+500</span>
              <span className="text-sm text-slate-600 font-medium">Animais Adotados</span>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl">
              <span className="text-4xl font-extrabold text-indigo-600 block mb-1">100%</span>
              <span className="text-sm text-slate-600 font-medium">Adoção Responsável</span>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl">
              <span className="text-4xl font-extrabold text-blue-600 block mb-1">+120</span>
              <span className="text-sm text-slate-600 font-medium">Parceiros e ONGs</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}