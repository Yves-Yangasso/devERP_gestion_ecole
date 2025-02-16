import React from 'react';
import PropTypes from 'prop-types'; // Importation de PropTypes pour la validation

const Button = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  onClick, // Ajout de l'action onClick
  ...props 
}) => {
  const baseStyles = "px-8 py-3 rounded-full font-semibold transition-all duration-200 flex items-center gap-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
  };

  // Fonction pour gérer le clic
  const handleClick = (event) => {
    if (onClick) {
      onClick(event); // Si une fonction onClick est définie, on l'appelle
    }
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={handleClick} // Ajout de l'événement onClick
      {...props}
    >
      {children}
    </button>
  );
};

// Validation des types des propriétés
Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']), // Validation des variantes
  children: PropTypes.node.isRequired, // Vérifie que des enfants sont fournis
  className: PropTypes.string, // Validation pour className
  onClick: PropTypes.func // Validation pour l'action onClick
};

export default Button;
