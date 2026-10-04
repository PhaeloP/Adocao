import React from 'react';
import { Heart, Instagram, Facebook } from 'lucide-react';

function Footer() {
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200 text-gray-600 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <p className="text-sm">
            &copy; {new Date().getFullYear()} AmigoPet. Feito com <Heart className="inline w-4 h-4 text-red-500" /> para animais.
          </p>

          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-gray-900"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-gray-900"><Facebook className="w-5 h-5" /></a>
            <span className="text-sm">Parceiros</span>
            <span className="text-sm">Contato</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;