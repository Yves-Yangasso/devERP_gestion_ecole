import React from 'react';

const NavigationTabs_Detail_inscription = ({ activeTab, onTabChange }) => {
  const tabs = [
    "Informations_Etudiants",
    "Frais & mensualités",
    "Documents",
    "Paiements"
  ];

  return (
    <div className="flex space-x-4 p-4 border-b">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabChange(index + 1)}
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

export default NavigationTabs_Detail_inscription;