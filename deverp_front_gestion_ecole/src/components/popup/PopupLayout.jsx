import React, { useState } from 'react';
import Student from './Student';
import Tuteur_Documents from './Tuteur_Documents';
import Paiement from './Paiement';
import Recapitulatif from './Recapitulatif';
import NavigationButtons from '../ui/Button/NavigationButtons';
import NavigationTabs from '../ui/Button/NavigationTabs';

const PopupLayout = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState(1);
  
    const renderContent = () => {
      switch (activeTab) {
        case 1:
          return <Student />;
        case 2:
          // eslint-disable-next-line react/jsx-pascal-case
          return <Tuteur_Documents />;
        case 3:
          return <Paiement />;
        case 4:
          return <Recapitulatif />;
        default:
          return <Student />;
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 flex flex-col min-h-[600px]">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Ajouter une nouvelle inscription</h2>
            <button className="p-2 hover:bg-gray-100 rounded-full" onClick={onClose}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="flex-1">
            {renderContent()}
          </div>
  
          <NavigationButtons
            onPrevClick={() => setActiveTab(prev => Math.max(1, prev - 1))}
            onNextClick={() => setActiveTab(prev => Math.min(4, prev + 1))}
            prevText="Précédent"
            nextText="Suivant"
            buttonType="button"
          />
        </div>
      </div>
    );
  };
  
export default PopupLayout;