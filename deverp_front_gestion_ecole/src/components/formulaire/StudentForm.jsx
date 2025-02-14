import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input/InputField";
import SelectInput from "../ui/Input/SelectInput";
import { useSpecialtySelection } from "../../utils/useSpecialtySelection";
import NavigationButtons from "../ui/Button/NavigationButtons";
import { useFormContext } from "../../context/FormContext";
import { validateName, validateDate, validateEmail, validatePhone, validateSelect, validateRequired, validateNationality } from "../../utils/validators";
import AlertService from "../../services/notifications/AlertService";

const options = {
  niveau: ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2", "Baccalauréat"].map((value) => ({ value, label: value })),
  formation: ["Informatique", "Mathematics", "Biologie"].map((value) => ({ value, label: value })),
  specialites: {
    Informatique: ["Web", "Mobile", "Cloud", "Full Stack"],
    Mathematics: ["Statistiques", "Analyse", "Algèbre"],
    Biologie: ["Génétique", "Microbiologie", "Biochimie"],
  },
};

const StudentForm = () => {
  const { selectedSpecialties, handleSpecialtyChange, removeSpecialty, clearSpecialties } = useSpecialtySelection();
  const { updateStudent, formState, resetForm } = useFormContext();
  const navigate = useNavigate();
  const [filteredSpecialties, setFilteredSpecialties] = useState([]);

  useEffect(() => {
    if (formState.student.formation) {
      setFilteredSpecialties(options.specialites[formState.student.formation] || []);
      clearSpecialties();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.student.formation]);

  useEffect(() => {
    resetForm();
    localStorage.removeItem("selectedSpecialties");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    updateStudent({ [e.target.name]: e.target.value });
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    
    const errors = {};
    updateStudent({ specialites: selectedSpecialties });

    ["prenom", "nom", "date", "lieu", "adresse", "email", "telephone", "nationalite", "universite", "niveau", "formation"].forEach((field) => {
      if (!formState.student[field]) errors[field] = `${field} est requis`;
    });
    if (selectedSpecialties.length === 0) errors.specialites = "Les spécialités sont requises";

    if (Object.keys(errors).length > 0) {
      AlertService.error("Veuillez remplir tous les champs", errors);
      updateStudent({ errors });
    } else {
      navigate("/TuteurInfos");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">INFORMATION ÉTUDIANT</h2>
      <form className="flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 flex-1">
          <Input label="Prénom" name="prenom" value={formState.student.prenom} onChange={handleChange} validate={validateName} />
          <Input label="Nom" name="nom" value={formState.student.nom} onChange={handleChange} validate={validateName} />
          <Input label="Date Naissance" name="date" type="date" value={formState.student.date} onChange={handleChange} validate={validateDate} />
          <Input label="Lieu Naissance" name="lieu" value={formState.student.lieu} onChange={handleChange} validate={validateRequired} />
          <Input label="Adresse" name="adresse" value={formState.student.adresse} onChange={handleChange} validate={validateRequired} />
          <Input label="Email" name="email" type="email" value={formState.student.email} onChange={handleChange} validate={validateEmail} />
          <Input label="Téléphone" name="telephone" type="tel" value={formState.student.telephone} onChange={handleChange} validate={validatePhone} />
          <Input label="Nationalité" name="nationalite" value={formState.student.nationalite} onChange={handleChange} validate={validateNationality} />
          <Input label="Dernier Etablissement" name="universite" value={formState.student.universite} onChange={handleChange} validate={validateRequired} />
          <SelectInput label="Niveau" name="niveau" options={options.niveau} value={formState.student.niveau} onChange={handleChange} validate={validateSelect} />
          <SelectInput label="Formation Souhaitée" name="formation" options={options.formation} value={formState.student.formation} onChange={handleChange} validate={validateSelect} />
          <SelectInput label="Spécialités" name="specialites" options={filteredSpecialties.map((s) => ({ value: s, label: s }))} value={selectedSpecialties} onChange={handleSpecialtyChange} validate={validateSelect} error={formState.errors?.specialites} />
          {selectedSpecialties.length > 0 && (
            <div className="mt-2">
              <p className="text-gray-700 font-medium">Spécialités sélectionnées :</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedSpecialties.map((specialty, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {specialty}
                    <button type="button" onClick={() => removeSpecialty(index)} className="ml-2 text-blue-600 hover:text-blue-800">×</button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <NavigationButtons onNextClick={handleNextClick} nextText="Suivant" />
      </form>
    </div>
  );
};

export default StudentForm;
