import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PawPrint, LogIn, UserPlus, LogOut, Menu, X } from 'lucide-react';

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  // Em breve integraremos a lógica real de login. Para já, simulamos
  const usuarioLogado = false; 
  const navigate = useNavigate();

  const fecharMenu = () => setMenuAberto(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo com ícone PawPrint */}
          <Link to="/" className="flex items-center gap-2" onClick={fecharMenu}>
            <PawPrint className="w-8 h-8 text-orange-600" />
            <span className="text-xl font-bold text-gray-800">Amigo<span className="text-orange-600">Pet</span></span>
          </Link>

          {/* Links Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium">Feed</Link>
            
            {usuarioLogado ? (
              <>
                <Link to="/meus-pets" className="text-gray-700 hover:text-orange-600 font-medium">Meus Pets</Link>
                <button onClick={() => navigate('/login')} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-medium hover:bg-orange-200">
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/cadastro" className="text-gray-700 hover:text-orange-600 font-medium">Cadastrar</Link>
                <Link to="/login" className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-600 text-white font-medium hover:bg-orange-700">
                  <LogIn className="w-4 h-4" />
                  Entrar
                </Link>
              </>
            )}
          </div>

          {/* Menu Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuAberto(!menuAberto)} className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none">
              {menuAberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Exposto */}
      {menuAberto && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-3">
          <Link to="/" className="block text-gray-700 hover:text-orange-600 font-medium p-2" onClick={fecharMenu}>Feed</Link>
          {usuarioLogado ? (
            <>
              <Link to="/meus-pets" className="block text-gray-700 hover:text-orange-600 font-medium p-2" onClick={fecharMenu}>Meus Pets</Link>
              <button className="w-full flex items-center gap-2 p-2 rounded-md bg-orange-100 text-orange-700 font-medium" onClick={() => navigate('/login')}>
                <LogOut className="w-5 h-5" />
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/cadastro" className="block text-gray-700 hover:text-orange-600 font-medium p-2" onClick={fecharMenu}>Cadastrar</Link>
              <Link to="/login" className="w-full flex items-center gap-2 p-2 rounded-md bg-orange-600 text-white font-medium" onClick={fecharMenu}>
                <LogIn className="w-5 h-5" />
                Entrar
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;