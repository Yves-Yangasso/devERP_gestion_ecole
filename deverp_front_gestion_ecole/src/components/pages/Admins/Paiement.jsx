import React from 'react';
import PopupLayout from '../../formulaire/PopupLayout';
// Exemple d'utilisation
const Paiement = () => {
    const tabs = [
      "Etudiants",
      "Frais & mensualités",
      "Paiements",
      "Recettes constatés"
    ];
  
    return (
      <PopupLayout
        title="Ajouter une nouvelle inscription"
        activeTab={3}
        tabs={tabs}
        onClose={() => console.log('Fermer')}
        onPrevClick={() => console.log('Précédent')}
        onNextClick={() => console.log('Suivant')}
        prevText="Précédent"
        nextText="Suivant"
        buttonType="button"
      >
        {/* Contenu du popup */}
        <div>
          {/* Votre contenu spécifique ici */}
        </div>
      </PopupLayout>
    );
  };
  
  export default Paiement;