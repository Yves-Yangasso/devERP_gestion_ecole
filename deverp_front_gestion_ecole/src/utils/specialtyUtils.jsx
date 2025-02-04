import { useState } from 'react';

export const useSpecialtySelection = (maxSpecialties = 3) => {
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);

  const handleSpecialtyChange = (event) => {
    const value = event.target.value;

    if (value && !selectedSpecialties.includes(value)) {
      if (selectedSpecialties.length < maxSpecialties) {
        setSelectedSpecialties([...selectedSpecialties, value]);
      } else {
        alert(`Vous ne pouvez choisir que ${maxSpecialties} spécialités.`);
      }
    }
  };

  const removeSpecialty = (index) => {
    const newSpecialties = [...selectedSpecialties];
    newSpecialties.splice(index, 1);
    setSelectedSpecialties(newSpecialties);
  };

  return { selectedSpecialties, handleSpecialtyChange, removeSpecialty };
};
