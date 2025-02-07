import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input/InputField';
import SelectInput from '../ui/Input/SelectInput';
import { useSpecialtySelection } from '../../utils/specialtyUtils';
import NavigationButtons from '../ui/Button/NavigationButtons';
import { useFormContext } from '../../context/FormContext';

export const options = {
  niveau: [
    { value: 'L1', label: 'L1' },
    { value: 'L2', label: 'L2' },
    { value: 'L3', label: 'L3' },
  ],
  formation: [
    { value: 'Informatique', label: 'Informatique' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Biologie', label: 'Biologie' },
  ],
  specialites: [
    { value: 'Web', label: 'Web' },
    { value: 'Mobile', label: 'Mobile' },
    { value: 'Cloud', label: 'Cloud' },
  ],
};

const StudentForm = () => {
  const { selectedSpecialties, handleSpecialtyChange, removeSpecialty } = useSpecialtySelection();

  const { updateStudent, formState } = useFormContext();
  
  const handleChange = (e) => {
    updateStudent({ [e.target.name]: e.target.value });
  };
  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
        INFORMATION ÉTUDIANT
      </h2>

      <form className="flex-1 flex flex-col" >
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 flex-1">
          <Input label="Prénom" placeholder={"Veuillez saisir le prénom(s)"} name="prenom" value={formState.student.prenom} onChange={handleChange} />
          <Input label="Nom" placeholder={"Veuillez saisir le nom"} name="nom" value={formState.student.nom} onChange={handleChange} />
          <Input label="Date Naissance" placeholder={"Veuillez saisir la date de naissance"} name="date" type="date" value={formState.student.date} onChange={handleChange} />
          <Input label="Lieu Naissance" placeholder={"Veuillez saisir le lieu de naissance"} name="lieu" value={formState.student.lieu} onChange={handleChange} />
          <Input label="Adresse" placeholder={"Veuillez saisir l'adresse"} name="adresse" value={formState.student.adresse} onChange={handleChange} />
          <Input label="Email" placeholder={"Veuillez saisir l'email"} name="email" type="email" value={formState.student.email} onChange={handleChange} />
          <Input label="Téléphone" placeholder={"Veuillez saisir le Telephone"} name="telephone" type="tel" value={formState.student.telephone} onChange={handleChange} />
          <Input label="Nationalité" placeholder={"Veuillez saisir la nationalité"} name="nationalite" value={formState.student.nationalite} onChange={handleChange} />
          <Input label="Dernier Etablissement" placeholder={"Veuillez saisir la dernier université fréquenté"} name="universite" value={formState.student.universite} onChange={handleChange} />
          <SelectInput label="Niveau" name="niveau" options={options.niveau} value={formState.student.niveau} onChange={handleChange} />
          <SelectInput label="Formation Supérieure" name="formation" options={options.formation} value={formState.student.formation} onChange={handleChange} />
          <div className="col-span-1">
            <SelectInput label="Spécialités" name="specialites" options={options.specialites} value={formState.student.specialites} onChange={handleSpecialtyChange} />
            <div className="mt-4">
              {selectedSpecialties.length > 0 && (
                <div>
                  <p className="text-gray-700 font-medium">Spécialités sélectionnées :</p>
                  <ul className="flex gap-2">
                    {selectedSpecialties.map((specialty, index) => (
                      <li key={index} className="flex justify-between bg-gray-200 p-2 rounded-lg mt-2">
                        {specialty}
                        <button
                          type="button"
                          onClick={() => removeSpecialty(index)}
                          className="text-red-500 font-bold ml-4"
                        >
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <NavigationButtons buttonType="submit" nextLink="/TuteurInfos" nextText="Suivant" />
      </form>
    </div>
  );
};

export default StudentForm;