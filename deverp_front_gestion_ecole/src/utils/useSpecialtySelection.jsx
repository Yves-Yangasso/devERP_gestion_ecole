import { useState } from 'react';

export const useSpecialtySelection = (maxSpecialties = 3) => {
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [error, setError] = useState('');

  const handleSpecialtyChange = (event) => {
    const value = event.target.value;

    if (value && !selectedSpecialties.includes(value)) {
      if (selectedSpecialties.length < maxSpecialties) {
        setSelectedSpecialties([...selectedSpecialties, value]);
        setError(''); // Réinitialiser l'erreur si la sélection est valide
      } else {
        setError(`Vous ne pouvez choisir que ${maxSpecialties} spécialités.`);
      }
    }
  };

  const removeSpecialty = (index) => {
    const newSpecialties = [...selectedSpecialties];
    newSpecialties.splice(index, 1);
    setSelectedSpecialties(newSpecialties);
  };

  return { selectedSpecialties, handleSpecialtyChange, removeSpecialty, error };
};
