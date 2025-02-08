import React from "react";
import { useNavigate } from "react-router-dom";

import Input from "../ui/Input/InputField";
import SelectInput from "../ui/Input/SelectInput";
import { useSpecialtySelection } from "../../utils/useSpecialtySelection";
import NavigationButtons from "../ui/Button/NavigationButtons"; // Importation du composant NavigationButtons
import { useFormContext } from "../../context/FormContext";
import { validateName, validateDate, validateEmail, validatePhone, validateSelect, validateRequired, validateNationality } from "../../utils/validators"; // Importation des validateurs
import AlertService from "../../services/notifications/AlertService";

// Options des sélecteurs
export const options = {
  niveau: [
    { value: "Licence 1", label: "Licence 1" },
    { value: "Licence 2", label: "Licence 2" },
    { value: "Licence 3", label: "Licence 3" },
    { value: "Master 1", label: "Master 1" },
    { value: "Master 2", label: "Master 2" },
    { value: "Baccalauréat", label: "Baccalauréat" },
  ],
  formation: [
    { value: "Informatique", label: "Informatique" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Biologie", label: "Biologie" },
  ],
  specialites: [
    { value: "Web", label: "Web" },
    { value: "Mobile", label: "Mobile" },
    { value: "Cloud", label: "Cloud" },
    { value: "full", label: "full" },
  ],
};

const StudentForm = () => {
  const { selectedSpecialties, handleSpecialtyChange, removeSpecialty } = useSpecialtySelection();
  const { updateStudent, formState } = useFormContext();

  // Fonction de gestion des changements
  const handleChange = (e) => {
    updateStudent({ [e.target.name]: e.target.value });
  };

  // Fonction qui est appelée lors du clic sur "Suivant"
  const navigate = useNavigate(); // Hook pour la navigation

  const handleNextClick = (e) => {
    e.preventDefault();

    const errors = {};
    // Validation des champs requis
    if (!formState.student.prenom) errors.prenom = "Le prénom est requis";
    if (!formState.student.nom) errors.nom = "Le nom est requis";
    if (!formState.student.date) errors.date = "La date de naissance est requise";
    if (!formState.student.lieu) errors.lieu = "Le lieu de naissance est requis";
    if (!formState.student.adresse) errors.adresse = "L'adresse est requise";
    if (!formState.student.email) errors.email = "L'email est requis";
    if (!formState.student.telephone) errors.telephone = "Le téléphone est requis";
    if (!formState.student.nationalite) errors.nationalite = "La nationalité est requise";
    if (!formState.student.universite) errors.universite = "Le dernier établissement est requis";
    if (!formState.student.niveau) errors.niveau = "Le niveau est requis";
    if (!formState.student.formation) errors.formation = "La formation est requise";
    if (selectedSpecialties.length === 0) errors.specialites = "Les spécialités sont requises";

    // Si des erreurs sont présentes, on les affiche et on bloque la navigation
    if (Object.keys(errors).length > 0) {
      AlertService.error("Veillez remplir tous les champs", errors);
      updateStudent({ errors });
    } else {
      // Si tout est validé, on peut rediriger
      navigate("/TuteurInfos");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
        INFORMATION ÉTUDIANT
      </h2>
      <form className="flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 flex-1">
          {/* Champs avec validations */}
          <Input
            label="Prénom"
            placeholder={"Veuillez saisir le prénom(s)"}
            name="prenom"
            value={formState.student.prenom}
            onChange={handleChange}
            validate={(value) => validateName(value, "Prénom")}
          />
          <Input
            label="Nom"
            placeholder={"Veuillez saisir le nom"}
            name="nom"
            value={formState.student.nom}
            onChange={handleChange}
            validate={(value) => validateName(value, "Nom")}
          />
          <Input
            label="Date Naissance"
            placeholder={"Veuillez saisir la date de naissance"}
            name="date"
            type="date"
            value={formState.student.date}
            onChange={handleChange}
            validate={(value) => validateDate(value)}
          />
          <Input
            label="Lieu Naissance"
            placeholder={"Veuillez saisir le lieu de naissance"}
            name="lieu"
            value={formState.student.lieu}
            onChange={handleChange}
            validate={(value) => validateRequired(value, "Lieu de naissance")}
          />
          <Input
            label="Adresse"
            placeholder={"Veuillez saisir l'adresse"}
            name="adresse"
            value={formState.student.adresse}
            onChange={handleChange}
            validate={(value) => validateRequired(value, "Adresse")}
          />
          <Input
            label="Email"
            placeholder={"Veuillez saisir l'email"}
            name="email"
            type="email"
            value={formState.student.email}
            onChange={handleChange}
            validate={(value) => validateEmail(value)}
          />
          <Input
            label="Téléphone"
            placeholder={"Veuillez saisir le Telephone"}
            name="telephone"
            type="tel"
            value={formState.student.telephone}
            onChange={handleChange}
            validate={(value) => validatePhone(value)}
          />
          <Input
            label="Nationalité"
            placeholder={"Veuillez saisir la nationalité"}
            name="nationalite"
            value={formState.student.nationalite}
            onChange={handleChange}
            validate={(value) => validateNationality(value, "Nationalité")}
          />
          <Input
            label="Dernier Etablissement"
            placeholder={"Veuillez saisir le dernier université fréquentée"}
            name="universite"
            value={formState.student.universite}
            onChange={handleChange}
            validate={(value) => validateRequired(value, "Dernier établissement")}
          />
          <SelectInput
            label="Niveau"
            name="niveau"
            options={options.niveau}
            value={formState.student.niveau}
            onChange={handleChange}
            validate={(value) => validateSelect(value, "Niveau")}
          />
          <SelectInput
            label="Formation Supérieure"
            name="formation"
            options={options.formation}
            value={formState.student.formation}
            onChange={handleChange}
            validate={(value) => validateSelect(value, "Formation")}
          />
          <div className="col-span-1">
            <SelectInput
              label="Spécialités"
              name="specialites"
              options={options.specialites}
              value={selectedSpecialties}
              onChange={handleSpecialtyChange}
              validate={() => validateSelect(selectedSpecialties.length > 0, "Spécialités")}
              error={formState.errors?.niveau}
            />
            <div className="mt-2">
              {selectedSpecialties.length > 0 && (
                <div className="mt-2">
                  <p className="text-gray-700 font-medium">Spécialités sélectionnées :</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedSpecialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {specialty}
                        <button
                          type="button"
                          onClick={() => removeSpecialty(index)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Boutons de navigation */}
        <NavigationButtons onNextClick={handleNextClick} nextText="Suivant"
        />
      </form>
    </div>
  );
};

export default StudentForm;
