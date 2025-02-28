import React from 'react';

const NavigationTabs_Detail_inscription = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 1, label: 'Information étudiants' },
    { id: 2, label: 'Frais & mensualités' },
    { id: 3, label: 'Documents' },
    { id: 4, label: 'Paiements' }
  ]

  return (
    <div className="flex mt-4 ml-16">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={`px-6 py-3 w-[250px] text-center ${activeTab === tab.id ? 'bg-blue-100 text-blue-800 font-medium' : 'bg-gray-100'}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
  );
};

export default NavigationTabs_Detail_inscription;