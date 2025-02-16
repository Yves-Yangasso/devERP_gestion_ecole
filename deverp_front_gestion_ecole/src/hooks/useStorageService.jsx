export const useStorageService = () => {
    // Fonction pour sauvegarder les données dans le localStorage
    const saveData = (data) => {
      try {
        localStorage.setItem('formData', JSON.stringify(data)); // Sauvegarder les données
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des données dans localStorage:', error);
      }
    };
  
    // Fonction pour récupérer les données depuis le localStorage
    const getData = () => {
      try {
        const data = localStorage.getItem('formData');
        return data ? JSON.parse(data) : null;
      } catch (error) {
        console.error('Erreur lors de la récupération des données du localStorage:', error);
        return null;
      }
    };
  
    return { saveData, getData };
  };
  
