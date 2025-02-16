import React from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react"; // Importation des icônes
import Button from "./Button"; // Assurez-vous que le composant Button est importé correctement
import PropTypes from 'prop-types'; // Importation de PropTypes pour la validation

const NavigationButtons = ({ onPrevClick, onNextClick, prevText, nextText, buttonType = "button" }) => {
  return (
    <div className="flex flex-row-reverse justify-between items-center mt-auto py-4 px-8 border-t border-gray-300">
      {/* Bouton Suivant */}
      {onNextClick && (
        <Button type={buttonType} className="flex items-center text-blue-600" onClick={onNextClick}>
          {nextText || "Suivant"}
          <ArrowRightCircle className="w-6 h-6 ml-2" />
        </Button>
      )}

      {/* Bouton Précédent */}
      {onPrevClick && (
        <Button type={buttonType} className="flex items-center text-blue-600" onClick={onPrevClick}>
          <ArrowLeftCircle className="w-6 h-6 mr-2" />
          {prevText || "Précédent"}
        </Button>
      )}
    </div>
  );
};

// Validation des types des propriétés
NavigationButtons.propTypes = {
  onPrevClick: PropTypes.func, // Fonction pour le bouton Précédent
  onNextClick: PropTypes.func, // Fonction pour le bouton Suivant
  prevText: PropTypes.string, // Texte du bouton Précédent
  nextText: PropTypes.string, // Texte du bouton Suivant
  buttonType: PropTypes.oneOf(['button', 'submit', 'reset']) // Type du bouton, par défaut 'button'
};

export default NavigationButtons;
