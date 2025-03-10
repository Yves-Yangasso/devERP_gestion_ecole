import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import PopupLayout from '../popup/PopupLayout';

const SearchBar = ({
    placeholder = "Rechercher...",  // 🔥 Placeholder dynamique par défaut
    buttonLabel = "Ajouter",        // 🔥 Label dynamique du bouton par défaut
    onButtonClick = () => {}        // 🔥 Action dynamique au clic par défaut
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <div className="flex items-center justify-between w-full">
            {/* Search and Filter */}
            <div className="flex gap-2 w-full max-w-md">
                <input
                    type="text"
                    placeholder={placeholder}  // 🔥 Utilisation du placeholder dynamique
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option>Filtrer par statut</option>
                </select>
            </div>
            
            {/* Bouton dynamique pour ouvrir le popup */}
            <button
                className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-800"
                onClick={() => {
                    setIsPopupOpen(true);
                    onButtonClick();  // 🔥 Appel de l'action dynamique
                }}
            >
                <Plus className="w-5 h-5" /> {buttonLabel}  {/* 🔥 Utilisation du label dynamique */}
            </button>
            
        </div>
    );
};

export default SearchBar;
