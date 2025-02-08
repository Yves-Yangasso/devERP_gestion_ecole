import { countries } from 'countries-list';

export const validateRequired = (value, fieldName) => {
    if (!value || value.trim() === "") return `${fieldName} est requis.`;
    return null;
};

export const validateName = (value, fieldName) => {
    if (!value) return `${fieldName} est requis.`;
    if (value.trim().length < 2) return `${fieldName} doit contenir au moins 2 lettres.`;
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/.test(value)) return `${fieldName} ne doit contenir que des lettres.`;
    return null;
};

export const validateEmail = (value) => {
    if (!value) return "L'email est requis.";
    if (!/^\S+@\S+\.\S+$/.test(value)) return "Format d'email invalide.";
    return null;
};

export const validatePassword = (value) => {
    if (!value) return "Le mot de passe est requis.";
    if (value.length < 8) return "Le mot de passe doit contenir au moins 8 caractères.";
    if (!/[A-Z]/.test(value)) return "Le mot de passe doit contenir au moins une majuscule.";
    if (!/[0-9]/.test(value)) return "Le mot de passe doit contenir au moins un chiffre.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return "Le mot de passe doit contenir au moins un caractère spécial.";
    return null;
};

export const validatePhone = (value) => {
    if (!value) return "Le numéro de téléphone est requis.";
    if (!/^\+?[0-9]{9,15}$/.test(value)) return "Numéro de téléphone invalide.";
    return null;
};

export const validateSelect = (value) => {
  if (!value) return "Veuillez sélectionner une option.";
  return null;
};

export const validateFile = (file) => {
    if (!file) return "Un fichier est requis.";
    const allowedTypes = ["application/pdf"];
    const maxSize = 5 * 1024 * 1024; // 5 Mo
    if (!allowedTypes.includes(file.type)) {
      return "Seuls les fichiers PDF sont acceptés.";
    }
    if (file.size > maxSize) {
      return "Le fichier ne doit pas dépasser 5 Mo.";
    }
    return null; // Le fichier est valide
  };
  

export const validateDate = (value) => {
    if (!value) return "La date est requise.";
    
    const selectedDate = new Date(value);
    const today = new Date();
    
    if (isNaN(selectedDate.getTime())) return "Format de date invalide.";
    if (selectedDate > today) return "La date ne peut pas être dans le futur.";

    return null;
};

export const validateNationality = (value) => {
  if (!value) return "La nationalité est requise.";

  // Convertir automatiquement la première lettre en majuscule
  const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

  const countriesNames = Object.values(countries).map(country => country.name);
  
  // Vérification de la validité de la nationalité
  if (!countriesNames.includes(capitalizedValue)) return "Nationalité invalide.";

  return null;
};
