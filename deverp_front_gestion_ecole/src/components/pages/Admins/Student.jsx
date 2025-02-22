import React from "react";
import InputField from "../../ui/Input/InputField";
import SelectInput from "../../ui/Input/SelectInput";

const StudentForm = () => {
  const options = {
    niveau: [
      { value: "Licence 1", label: "Licence 1" },
      { value: "Licence 2", label: "Licence 2" },
      { value: "Licence 3", label: "Licence 3" },
      { value: "Master 1", label: "Master 1" },
      { value: "Master 2", label: "Master 2" },
      { value: "Baccalauréat", label: "Baccalauréat" },
    ],
    formation: [
      { value: "Formation 1", label: "Formation 1" },
      { value: "Formation 2", label: "Formation 2" },
    ],
    specialite: [
      { value: "Spécialité 1", label: "Spécialité 1" },
      { value: "Spécialité 2", label: "Spécialité 2" },
    ]
  };

  return (
    <div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
          <span className="text-blue-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          Informations Étudiant
        </h2>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <InputField 
            label="Prénom"
            name="prenom"
            type="text"
            placeholder="Prénom"
          />

          <InputField 
            label="Nom"
            name="nom"
            type="text"
            placeholder="Nom"
          />

          <InputField 
            label="Adresse"
            name="adresse"
            type="text"
            placeholder="Adresse complète"
          />

          <InputField 
            label="Téléphone"
            name="telephone"
            type="tel"
            placeholder="Téléphone"
          />

          <InputField 
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
          />

          <InputField 
            label="Nationalité"
            name="nationalite"
            type="text"
            placeholder="Nationalité"
          />

          <InputField 
            label="Date de Naissance"
            name="date_naissance"
            type="date"
            placeholder="Date de naissance"
          />

          <InputField 
            label="Lieu de Naissance"
            name="lieu_naissance"
            type="text"
            placeholder="Lieu de naissance"
          />

          <SelectInput
            label="Niveau"
            name="niveau"
            options={options.niveau}
          />

          <InputField 
            label="Dernier Établissement"
            name="dernier_etablissement"
            type="text"
            placeholder="Dernier établissement"
          />

          <SelectInput
            label="Formation"
            name="formation"
            options={options.formation}
          />

          <SelectInput
            label="Spécialité"
            name="specialite"
            options={options.specialite}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentForm;