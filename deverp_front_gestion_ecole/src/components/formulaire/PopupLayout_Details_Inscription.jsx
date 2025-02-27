import React, { useState } from 'react';
import Informations_Etudiants from '../pages/Admins/Informations_Etudiants';
import Frais_et_mensualités from '../pages/Admins/Frais_et_mensualités';
import Documents from '../pages/Admins/Documents';
import Paiement_Detail_inscription from '../pages/Admins/Paiement_Detail_inscription';
import NavigationTabs_Detail_inscription from '../ui/Button/NavigationTabs_Detail_inscription';

const PopupLayout_Details_Inscription = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(1);

  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return <Informations_Etudiants />;
      case 2:
        // eslint-disable-next-line react/jsx-pascal-case
        return <Frais_et_mensualités />;
      case 3:
        return <Documents />;
      case 4:
        return <Paiement_Detail_inscription />;
      default:
        return <Informations_Etudiants />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 flex flex-col min-h-[600px]">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
            <h2 className="text-xl font-semibold">Details Inscription</h2>
          </div>
          <div className="flex items-center">
            <button className="flex items-center px-3 py-2 mr-3 text-sm bg-blue-900 text-white rounded hover:bg-green-600 transition-colors">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Télécharger
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full" onClick={onClose}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <NavigationTabs_Detail_inscription activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PopupLayout_Details_Inscription;