import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import PopupLayout from '../popup/PopupLayout'; // Assurez-vous du bon chemin

const SearchBar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="flex items-center justify-between w-full">
      {/* Search and Filter */}
      <div className="flex gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Rechercher étudiants, matricules..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>Filtrer par statut</option>
        </select>
      </div>
      
      {/* Bouton pour ouvrir le popup */}
      <button
        className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-800"
        onClick={() => setIsPopupOpen(true)} // Ouvre la popup
      >
        <Plus className="w-5 h-5" /> Ajouter inscription
      </button>

      {/* Affichage du popup si `isPopupOpen` est vrai */}
      {isPopupOpen && <PopupLayout onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default SearchBar;
