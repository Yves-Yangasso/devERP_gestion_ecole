import React, { useState } from 'react';
import { useFormContext } from "../../context/FormContext";
import Student from './Student';
import Tuteur_Documents from './Tuteur_Documents';
import Paiement from './Paiement';
import Recapitulatif from './Recapitulatif';
import NavigationButtons from '../ui/Button/NavigationButtons';
import NavigationTabs from '../ui/Button/NavigationTabs';
import AlertService from '../../services/notifications/AlertService';

const PopupLayout = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState(1);
    const { formState, updateStudent, updateTuteur } = useFormContext();

    const validateStudent = () => {
        const errors = {};
        const student = formState.student;

        if (!student.prenom) errors.prenom = "Le prénom est requis";
        if (!student.nom) errors.nom = "Le nom est requis";
        if (!student.date) errors.date = "La date de naissance est requise";
        if (!student.lieu) errors.lieu = "Le lieu de naissance est requis";
        if (!student.adresse) errors.adresse = "L'adresse est requise";
        if (!student.email) errors.email = "L'email est requis";
        if (!student.telephone) errors.telephone = "Le téléphone est requis";
        if (!student.nationalite) errors.nationalite = "La nationalité est requise";
        if (!student.universite) errors.universite = "Le dernier établissement est requis";
        if (!student.niveau) errors.niveau = "Le niveau est requis";
        if (!student.formation) errors.formation = "La formation est requise";
        if (!student.specialites || student.specialites.length === 0) errors.specialites = "Les spécialités sont requises";

        updateStudent({ errors });

        return Object.keys(errors).length === 0;
    };

    const validateTuteur = () => {
      const errors = {};
      const tuteur = formState.tuteur || {};

      if (!tuteur.prenom) errors.prenom = "Le prénom est requis";
      if (!tuteur.nom) errors.nom = "Le nom est requis";
      if (!tuteur.adresse) errors.adresse = "L'adresse est requise";
      if (!tuteur.telephone) errors.telephone = "Le téléphone est requis";
      if (!tuteur.email) errors.email = "L'email est requis";
      if (!tuteur.relation) errors.relation = "La relation est requise";
      if (!tuteur.documents || tuteur.documents.length === 0) errors.documents = "Au moins un document est requis";

      updateTuteur({ errors });

      return Object.keys(errors).length === 0;
  };

    const handleNextClick = () => {
        if (activeTab === 1 && !validateStudent()) {
            AlertService.error("Veuillez remplir tous les champs")
            return;
        }
        if (activeTab === 2 && !validateTuteur()) {
          AlertService.error("Veuillez remplir tous les champs obligatoires pour le tuteur")
          return;
      }
        setActiveTab((prev) => Math.min(4, prev + 1));
    };

    const renderContent = () => {
        switch (activeTab) {
            case 1:
                return <Student />;
            case 2:
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
            <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl mx-4 flex flex-col min-h-[600px]">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold">Ajouter une nouvelle inscription</h2>
                    <button className="p-2 hover:bg-gray-100 rounded-full" onClick={onClose}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} validateStudent={validateStudent} validateTuteur={validateTuteur}/>

                <div className="flex-1">
                    {renderContent()}
                </div>

                <NavigationButtons
                    onPrevClick={() => setActiveTab(prev => Math.max(1, prev - 1))}
                    onNextClick={handleNextClick}
                    prevText="Précédent"
                    nextText="Suivant"
                    buttonType="button"
                />
            </div>
        </div>
    );
};

export default PopupLayout;