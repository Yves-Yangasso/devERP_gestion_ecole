export const validateEmail = (value) => {
    if (!value) return "L'email est requis.";
    if (!/^\S+@\S+\.\S+$/.test(value)) return "Format d'email invalide.";
    return null;
};

export const validatePassword = (value) => {
    if (!value) return "Le mot de passe est requis.";
    if (value.length < 6) return "Le mot de passe doit contenir au moins 6 caractères.";
    return null;
};
