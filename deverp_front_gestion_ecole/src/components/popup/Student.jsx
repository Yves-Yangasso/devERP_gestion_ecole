import React from "react";
import InputField from "../ui/Input/InputField";
import SelectInput from "../ui/Input/SelectInput";
import { useNavigate } from "react-router-dom";
import { useSpecialtySelection } from "../../utils/useSpecialtySelection";
import AlertService from "../../services/notifications/AlertService";
import { useFormContext } from "../../context/FormContext";

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
    { value: "Full Stack", label: "Full Stack" },
  ],
};

const StudentForm = () => {
  const { selectedSpecialties, handleSpecialtyChange, removeSpecialty } = useSpecialtySelection();
  const { updateStudent, formState } = useFormContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    updateStudent({ [e.target.name]: e.target.value });
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    const errors = {};
    updateStudent({ specialites: selectedSpecialties });

    // Validation des champs (même logique que précédemment)
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

    if (Object.keys(errors).length > 0) {
      AlertService.error("Veillez remplir tous les champs", errors);
      updateStudent({ errors });
    } else {
      navigate("/TuteurInfos");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
        <span className="text-blue-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </span>
        Informations de l'étudiant
      </h2>

      <div className="grid grid-cols-4 gap-3">
        <InputField label="Prenom" name="Prenom" type="text" placeholder="Prenom" />
        <InputField label="Nom" name="Nom" type="text" placeholder="Nom" />
        <InputField label="Téléphone" name="Téléphone" type="number" placeholder="Téléphone" />
        <InputField label="Email" name="Email" type="email" placeholder="Email" />
        <InputField label="Adresse" name="Adresse" type="text" placeholder="Adresse" />
        <InputField label="Nationalite" name="Nationalite" type="text" placeholder="Nationalité" />
        <InputField label="Date Naissance" name="Date_Naissance" type="date" />
        <InputField label="Lieu Naissance" name="Lieu_Naissance" type="text" placeholder="Lieu" />
        <InputField label="Dernier Etablissement" name="Dernier_Etablissement" type="text" placeholder="Etablissement" />
        <SelectInput label="Niveau" name="niveau" options={options.niveau} value={formState.student.niveau} onChange={handleChange} />
        <SelectInput label="Formation" name="formation" options={options.formation} value={formState.student.formation} onChange={handleChange} />
        <div>
          <SelectInput
            label="Spécialités"
            name="specialites"
            options={options.specialites}
            value={selectedSpecialties}
            onChange={(e) => {
              handleSpecialtyChange(e);
              updateStudent({ specialites: [...selectedSpecialties, e.target.value] });
            }}
          />
          {selectedSpecialties.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {selectedSpecialties.map((specialty, index) => (
                <span key={index} className="inline-flex items-center px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {specialty}
                  <button type="button" onClick={() => removeSpecialty(index)} className="ml-1">×</button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentForm;