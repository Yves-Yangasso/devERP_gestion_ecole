// src/components/TuteurForm.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input/InputField";
import Button from "../ui/Button/Button";
import { PlusCircle, Trash2 } from "lucide-react";
import NavigationButtons from "../ui/Button/NavigationButtons";
import { useFormContext } from "../../context/FormContext";
import { validateName, validateEmail, validateRequired } from "../../utils/validators";
import AlertService from "../../services/notifications/AlertService";
import SelectInput from "../ui/Input/SelectInput";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "../../css/layout.css";

// Options de relation pour le champ select
const RELATION_OPTIONS = [
    { value: "pere", label: "Père" },
    { value: "mere", label: "Mère" },
    { value: "grand-frere", label: "Grand Frère" },
    { value: "grand-soeur", label: "Grand Sœur" },
    { value: "entreprise", label: "Entreprise" },
];

const TuteurForm = () => {
    const { formState, updateTutors } = useFormContext();
    const navigate = useNavigate();

    const [tuteurs, setTuteurs] = React.useState(() => {
        return formState.tutors && formState.tutors.length > 0
            ? formState.tutors
            : [{ prenom: "", nom: "", adresse: "", telephone: "", email: "", relation: "" }];
    });

    const [ajoutPossible, setAjoutPossible] = React.useState(false);

    const isTuteurComplet = (tuteur) => {
        return Object.values(tuteur).every((val) => val.trim() !== "");
    };

    const handleTuteurChange = (index, field, value) => {
        const newTuteurs = [...tuteurs];
        newTuteurs[index] = { ...newTuteurs[index], [field]: value };

        // Vérification des doublons pour email et téléphone
        if (index === 1) {
            const premierTuteur = newTuteurs[0];
            if (field === "email" && value === premierTuteur.email) {
                AlertService.error("Les emails des deux tuteurs doivent être différents.");
                return;
            }
            if (field === "telephone" && value === premierTuteur.telephone) {
                AlertService.error("Les numéros de téléphone des deux tuteurs doivent être différents.");
                return;
            }
        }

        setTuteurs(newTuteurs);
        updateTutors(newTuteurs); // Cette fonction existe maintenant dans le contexte
        if (index === 0) {
            setAjoutPossible(isTuteurComplet(newTuteurs[0]));
        }
    };

    const ajouterTuteur = () => {
        if (!ajoutPossible) return;
        const newTuteurs = [...tuteurs, { prenom: "", nom: "", adresse: "", telephone: "", email: "", relation: "" }];
        setTuteurs(newTuteurs);
        updateTutors(newTuteurs);
    };

    const supprimerTuteur = (index) => {
        if (index === 1) {
            const newTuteurs = tuteurs.slice(0, 1);
            setTuteurs(newTuteurs);
            updateTutors(newTuteurs);
            setAjoutPossible(true);
        }
    };

    const handlePrevClick = () => {
        navigate("/StudentInfos");
    };

    const handleNextClick = (e) => {
        e.preventDefault();
        const errors = {};

        tuteurs.forEach((tuteur, index) => {
            if (!tuteur.prenom) errors[`prenom-${index}`] = "Le prénom est requis";
            if (!tuteur.nom) errors[`nom-${index}`] = "Le nom est requis";
            if (!tuteur.adresse) errors[`adresse-${index}`] = "L'adresse est requise";
            if (!tuteur.telephone) errors[`telephone-${index}`] = "Le téléphone est requis";
            if (!tuteur.email) errors[`email-${index}`] = "L'email est requis";
            if (!tuteur.relation) errors[`relation-${index}`] = "La relation est requise";
        });

        if (Object.keys(errors).length > 0) {
            AlertService.error("Veuillez remplir tous les champs", errors);
            updateTutors(tuteurs); // Mise à jour même en cas d'erreur si nécessaire
        } else {
            navigate("/DocAFournir");
        }
    };

    return (
        <div className="flex flex-col h-full">
            <h2 className="relative inline-block text-xl font-bold text-blue-600 mb-8 px-4 py-2 border-2 border-blue-600 rounded-tl-full rounded-br-full bg-white text-center">
                INFORMATION DU TUTEUR
            </h2>

            <form className="flex-1 flex flex-col">
                {tuteurs.map((tuteur, index) => (
                    <div key={index} className="border border-gray-300 rounded-lg p-4 mb-6 relative">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">Tuteur {index + 1}</h3>

                        {index === 1 && (
                            <button
                                type="button"
                                onClick={() => supprimerTuteur(index)}
                                className="absolute top-3 right-3 text-red-600 hover:text-red-800"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        )}

                        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                            <Input
                                label="Prénom"
                                name={`prenom-${index}`}
                                placeholder="Saisir le prénom"
                                value={tuteur.prenom}
                                onChange={(e) => handleTuteurChange(index, "prenom", e.target.value)}
                                validate={(value) => validateName(value, "Prénom")}
                            />
                            <Input
                                label="Nom"
                                name={`nom-${index}`}
                                placeholder="Saisir le nom"
                                value={tuteur.nom}
                                onChange={(e) => handleTuteurChange(index, "nom", e.target.value)}
                                validate={(value) => validateName(value, "Nom")}
                            />
                            <Input
                                label="Adresse"
                                name={`adresse-${index}`}
                                placeholder="Saisir l'adresse"
                                value={tuteur.adresse}
                                onChange={(e) => handleTuteurChange(index, "adresse", e.target.value)}
                                validate={(value) => validateRequired(value, "Adresse")}
                            />

                            <div className="mb-4">
                                <label htmlFor={`telephone-${index}`} className="block mb-2 text-[#333] text-sm">
                                    Téléphone <span className="text-red-500">*</span>
                                </label>
                                <PhoneInput
                                    international
                                    defaultCountry="FR"
                                    value={tuteur.telephone}
                                    onChange={(value) => handleTuteurChange(index, "telephone", value || "")}
                                    className="w-full p-3 border border-[#ddd] rounded-lg text-sm"
                                    name={`telephone-${index}`}
                                    id={`telephone-${index}`}
                                    placeholder="Entrez votre numéro de téléphone"
                                />
                            </div>

                            <Input
                                label="Email"
                                name={`email-${index}`}
                                placeholder="Saisir l'email"
                                value={tuteur.email}
                                onChange={(e) => handleTuteurChange(index, "email", e.target.value)}
                                validate={(value) => validateEmail(value, "Email")}
                            />
                            <SelectInput
                                label="Relation"
                                name={`relation-${index}`}
                                options={RELATION_OPTIONS}
                                value={tuteur.relation}
                                onChange={(e) => handleTuteurChange(index, "relation", e.target.value)}
                                validate={(value) => validateRequired(value, "Relation")}
                            />
                        </div>
                    </div>
                ))}

                {tuteurs.length < 2 && (
                    <div className="flex justify-end mb-6">
                        <Button
                            onClick={ajouterTuteur}
                            type="button"
                            className={`bg-blue-600 text-white flex items-center ${!ajoutPossible ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={!ajoutPossible}
                        >
                            <PlusCircle className="w-5 h-5 mr-2" />
                            Ajouter Tuteur
                        </Button>
                    </div>
                )}

                <NavigationButtons
                    onPrevClick={handlePrevClick}
                    onNextClick={handleNextClick}
                    prevText="Précédent"
                    nextText="Suivant"
                />
            </form>
        </div>
    );
};

export default TuteurForm;