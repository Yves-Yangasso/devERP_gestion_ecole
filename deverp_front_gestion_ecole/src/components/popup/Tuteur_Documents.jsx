import React from "react";
import InputField from "../ui/Input/InputField";
import SelectInput from "../ui/Input/SelectInput";
import { useFormContext } from "../../context/FormContext";

export const options = {
  relation: [
    { value: "Père", label: "Père" },
    { value: "Mère", label: "Mère" },
    { value: "Frère", label: "Frère" },
    { value: "Sœur", label: "Sœur" },
    { value: "Ami", label: "Ami" },
    { value: "Autre", label: "Autre" },
  ]
};

const Tuteur_Documents = () => {
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

  const { updateTuteur, formState } = useFormContext();

  const handleChange = (e) => {
    updateTuteur({ [e.target.name]: e.target.value });
  };

  const handleDocumentChange = (e, document) => {
    const isChecked = e.target.checked;
    const currentDocs = Array.isArray(formState.tuteur.documents) ? [...formState.tuteur.documents] : [];

    if (isChecked && !currentDocs.includes(document)) {
      updateTuteur({ documents: [...currentDocs, document] });
    } else if (!isChecked && currentDocs.includes(document)) {
      updateTuteur({ documents: currentDocs.filter(doc => doc !== document) });
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg space-y-4">
      <h2 className="text-lg font-bold flex items-center gap-2 mb-3 ">
        <span className="text-blue-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </span>
        Informations Tuteur
      </h2>

      <div className="grid grid-cols-3 gap-3 shadow-md p-6 rounded-md">
        <InputField
          label="Prénom"
          name="prenom"
          type="text"
          placeholder="Prénom"
          value={formState.tuteur?.prenom || ""}
          onChange={handleChange}
          error={formState.errors?.tuteur?.prenom}
        />
        <InputField
          label="Nom"
          name="nom"
          type="text"
          placeholder="Nom"
          value={formState.tuteur?.nom || ""}
          onChange={handleChange}
          error={formState.errors?.tuteur?.nom}
        />
        <InputField
          label="Adresse"
          name="adresse"
          type="text"
          placeholder="Adresse"
          value={formState.tuteur?.adresse || ""}
          onChange={handleChange}
          error={formState.errors?.tuteur?.adresse}
        />
        <InputField
          label="Téléphone"
          name="telephone"
          type="number"
          placeholder="Téléphone"
          value={formState.tuteur?.telephone || ""}
          onChange={handleChange}
          error={formState.errors?.tuteur?.telephone}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          value={formState.tuteur?.email || ""}
          onChange={handleChange}
          error={formState.errors?.tuteur?.email}
        />
        <SelectInput
          label="Relation"
          name="relation"
          options={options.relation}
          value={formState.tuteur?.relation || ""}
          onChange={handleChange}
          error={formState.errors?.tuteur?.relation}
        />
      </div>

      <div className="bg-blue-50 rounded-lg p-2">
        <h4 className="font-medium text-blue-600 text-sm mb-2">📄 Documents Requis</h4>
        <div className="grid grid-cols-4 gap-2">
          {documents.map((doc, index) => (
            <label key={index} className="bg-white p-2 rounded flex items-center text-sm">
              <input
                type="checkbox"
                className="mr-2 w-4 h-4"
                checked={Array.isArray(formState.tuteur?.documents) && formState.tuteur.documents.includes(doc)}
                onChange={(e) => handleDocumentChange(e, doc)}
              />
              {doc}
            </label>
          ))}
        </div>
        {formState.errors?.tuteur?.documents && (
          <p className="text-red-500 text-xs mt-1">{formState.errors.tuteur.documents}</p>
        )}
      </div>
    </div>
  );
};

export default Tuteur_Documents;