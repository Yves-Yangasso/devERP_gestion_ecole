import React from 'react';

// Composant pour la barre de navigation
const NavigationTabs = ({ activeTab, tabs, onTabClick }) => {
  return (
    <div className="flex w-full p-2 bg-white rounded-lg shadow-md">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabClick(index + 1)}
          className={`flex-1 px-6 py-3 text-sm font-medium rounded-md transition-colors border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
            ${activeTab === index + 1
              ? 'bg-[#7B8EC4] text-white shadow-md font-semibold' // Couleur bleue personnalisée pour l'onglet actif
              : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300' // Onglets inactifs
            }`
          }
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;
