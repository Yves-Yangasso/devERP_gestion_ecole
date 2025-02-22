import React from "react";
import InputField from "../ui/Input/InputField";
import SelectInput from "../ui/Input/SelectInput";

export const options = {
  Relation: [
    { value: "Père", label: "Père" },
    { value: "Mère", label: "Mère" },
    { value: "Frère", label: "Frère" },
    { value: "Sœur", label: "Sœur" },
    { value: "Ami", label: "Ami" },
    { value: "Autre", label: "Autre" },
  ]
};

const Tuteur_Document = () => {
  const documents = [
    "Certificat de Résidence",
    "Copie CNI/Passeport Légalisée",
    "Dernier Diplôme",
    "Certificat de Scolarité",
    "Bulletins de notes",
    "2 Photos d'Identité",
    "Casier Judiciaire",
    "Documents",
    "Documents"
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg space-y-4">
      <h2 className="text-lg font-bold flex items-center gap-2 mb-3">
        <span className="text-blue-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </span>
        Informations Tuteur
      </h2>

      <div className="grid grid-cols-3 gap-3">
        <InputField
          label="Prenom"
          name="Prenom"
          type="text"
          placeholder="Prenom"
        />
        <InputField
          label="Nom"
          name="Nom"
          type="text"
          placeholder="Nom"
        />
        <InputField
          label="Adresse"
          name="Adresse"
          type="text"
          placeholder="Adresse"
        />
        <InputField
          label="Téléphone"
          name="Téléphone"
          type="number"
          placeholder="Téléphone"
        />
        <InputField
          label="Email"
          name="Email"
          type="email"
          placeholder="Email"
        />
        <SelectInput
          label="Relation"
          name="Relation"
          options={options.Relation}
        />
      </div>

      <div className="bg-blue-50 rounded-lg p-2">
        <h4 className="font-medium text-blue-600 text-sm mb-2">📄 Documents Requis</h4>
        <div className="grid grid-cols-4 gap-2">
          {documents.map((doc, index) => (
            <label key={index} className="bg-white p-2 rounded flex items-center text-sm">
              <input type="checkbox" className="mr-2 w-4 h-4"/>
              {doc}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tuteur_Document;