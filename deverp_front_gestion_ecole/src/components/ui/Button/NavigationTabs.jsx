import React from 'react';
import AlertService from '../../../services/notifications/AlertService';
import { useFormContext } from '../../../context/FormContext';

const NavigationTabs = ({ activeTab, onTabChange, validateStudent, validateTuteur }) => {
  const { formState } = useFormContext();
  
  const tabs = [
    "Etudiants",
    "Tuteur & Documents",
    "Paiements",
    "Récapitulatif"
  ];

  const validatePayment = () => {
    const payment = formState.payment;
    if (!payment || Object.keys(payment).length === 0) {
      return false;
    }
    
    // Vérifie si au moins un mode de paiement est sélectionné
    if (!payment.modePaiement) {
      return false;
    }
    
    // Vérifie si au moins un paiement est effectué
    const paiementsEffectues = payment.detailsPaiements?.some(p => p.payé);
    const fraisPayes = payment.detailsFrais?.some(f => f.payé);
    
    return paiementsEffectues || fraisPayes;
  };

  const handleTabClick = (index) => {

    // Validation pour l'onglet étudiant
    if (activeTab === 1 && !validateStudent()) {
      AlertService.error("Veuillez remplir tous les champs de l'etudiant avant de continuer.");
      return;
    }

    // Validation pour l'onglet tuteur
    if (activeTab === 2 && !validateTuteur()) {
      AlertService.error("Veuillez remplir tous les champs obligatoires du tuteur avant de continuer.");
      return;
    }

    // Validation pour l'onglet paiement
    if (activeTab === 3 && !validatePayment() && index + 1 === 4) {
      AlertService.error("Veuillez sélectionner au moins un mode de paiement et effectuer au moins un paiement.");
      return;
    }

    onTabChange(index + 1);
  };

  return (
    <div className="flex space-x-4 p-4 border-b">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => handleTabClick(index)}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === index + 1
              ? 'bg-blue-100 text-blue-600'
              : activeTab === 4 && index + 1 !== 4
              ? 'text-gray-400'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;