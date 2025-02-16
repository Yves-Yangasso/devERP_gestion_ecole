import { useState, useEffect } from "react";

export const useSpecialtySelection = (maxSpecialties = 3) => {
  const [selectedSpecialties, setSelectedSpecialties] = useState(() => {
    // Charger les spécialités depuis localStorage si disponibles
    const savedSpecialties = localStorage.getItem("selectedSpecialties");
    return savedSpecialties ? JSON.parse(savedSpecialties) : [];
  });
  const [error, setError] = useState('');

  // Sauvegarder les spécialités dans localStorage à chaque changement
  useEffect(() => {
    if (selectedSpecialties.length > 0) {
      localStorage.setItem("selectedSpecialties", JSON.stringify(selectedSpecialties));
    }
  }, [selectedSpecialties]);

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

  // Ajouter la fonction clearSpecialties pour vider la liste des spécialités
  const clearSpecialties = () => {
    setSelectedSpecialties([]);
  };

  return { selectedSpecialties, handleSpecialtyChange, removeSpecialty, clearSpecialties, error };
};
