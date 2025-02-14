import React from 'react';

// Composant pour la barre de navigation
const NavigationTabs = ({ activeTab, tabs }) => {
    return (
      <div className="flex space-x-4 p-4 border-b shadow-md">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === index + 1
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  };

export default NavigationTabs; // Exporter le composant