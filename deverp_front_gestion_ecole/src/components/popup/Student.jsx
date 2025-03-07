import React from "react";
import InputField from "../ui/Input/InputField";
import SelectInput from "../ui/Input/SelectInput";
import { useSpecialtySelection } from "../../utils/useSpecialtySelection";
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

  const handleChange = (e) => {
    updateStudent({ [e.target.name]: e.target.value });
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
              <InputField 
                  label="Prénom" 
                  name="prenom" 
                  type="text" 
                  placeholder="Prénom" 
                  value={formState.student.prenom || ""} 
                  onChange={handleChange} 
                  error={formState.errors?.prenom} 
              />
              <InputField 
                  label="Nom" 
                  name="nom" 
                  type="text" 
                  placeholder="Nom" 
                  value={formState.student.nom || ""} 
                  onChange={handleChange} 
                  error={formState.errors?.nom} 
              />
              <InputField 
                  label="Téléphone" 
                  name="telephone" 
                  type="number" 
                  placeholder="Téléphone" 
                  value={formState.student.telephone || ""} 
                  onChange={handleChange} 
                  error={formState.errors?.telephone} 
              />
              <InputField 
                  label="Email" 
                  name="email" 
                  type="email" 
                  placeholder="Email" 
                  value={formState.student.email || ""} 
                  onChange={handleChange} 
                  error={formState.errors?.email} 
              />
              <InputField 
                  label="Adresse" 
                  name="adresse" 
                  type="text" 
                  placeholder="Adresse" 
                  value={formState.student.adresse || ""} 
                  onChange={handleChange} 
                  error={formState.errors?.adresse} 
              />
              <InputField 
                  label="Nationalité" 
                  name="nationalite" 
                  type="text" 
                  placeholder="Nationalité" 
                  value={formState.student.nationalite || ""} 
                  onChange={handleChange} 
                  error={formState.errors?.nationalite} 
              />
              <InputField 
                  label="Date de naissance" 
                  name="date" 
                  type="date" 
                  value={formState.student.date || ""} 
                  onChange={handleChange} 
                  error={formState.errors?.date} 
              />
              <InputField 
                  label="Lieu de naissance" 
                  name="lieu" 
                  type="text" 
                  placeholder="Lieu" 
                  value={formState.student.lieu || ""} 
                  onChange={handleChange} 
                  error={formState.errors?.lieu} 
              />
              <InputField 
                  label="Dernier établissement" 
                  name="universite" 
                  type="text" 
                  placeholder="Établissement" 
                  value={formState.student.universite || ""} 
                  onChange={handleChange} 
                  error={formState.errors?.universite} 
              />
              <SelectInput 
                  label="Niveau" 
                  name="niveau" 
                  options={options.niveau} 
                  value={formState.student.niveau || ""} 
                  onChange={handleChange} 
                  error={formState.errors?.niveau} 
              />
              <SelectInput 
                  label="Formation" 
                  name="formation" 
                  options={options.formation} 
                  value={formState.student.formation || ""} 
                  onChange={handleChange} 
                  error={formState.errors?.formation} 
              />
              <div>
          <SelectInput
            label="Spécialités"
            name="specialites"
            options={options.specialites}
            value={formState.student.specialites || []}
            onChange={(e) => {
              const newSpecialites = Array.isArray(formState.student.specialites) ? [...formState.student.specialites, e.target.value] : [e.target.value];
              handleSpecialtyChange(e);
              updateStudent({ specialites: newSpecialites });
            }}
            error={formState.errors?.specialites}
          />
          {Array.isArray(formState.student.specialites) && formState.student.specialites.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {formState.student.specialites.map((specialty, index) => (
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
