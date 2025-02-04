import React from 'react';
import Input from '../ui/Input/InputField';
import SelectInput from '../ui/Input/SelectInput';
import Button from '../ui/Button/SimpleButton';
import { ArrowRight } from 'lucide-react';
import { useSpecialtySelection } from '../../utils/specialtyUtils';

export const options = {
    niveau: [],
    formation: [],
    specialites: [],
  };
  
const StudentForm = () => {
  const { selectedSpecialties, handleSpecialtyChange, removeSpecialty } = useSpecialtySelection();

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
        INFORMATION ÉTUDIANT
      </h2>

      <form className="flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 flex-1">
          <Input label="Prénom" placeholder="Veuillez saisir le prénom(s)" />
          <Input label="Nom" placeholder="Veuillez saisir le nom(s)" />
          <Input label="Date Naissance" type="date" placeholder="Veuillez saisir la date de naissance" />
          <Input label="Lieu Naissance" placeholder="Veuillez saisir le lieu de naissance" />
          <Input label="Addresse" placeholder="Veuillez saisir l'adresse" />
          <Input label="Email" type="email" placeholder="Veuillez saisir l'email" />
          <Input label="Téléphone" type="tel" placeholder="Veuillez saisir le téléphone" />
          <Input label="Nationalité" placeholder="Veuillez saisir la nationalité" />
          <SelectInput label="Niveau" name="niveau" options={options.niveau} />
          <SelectInput label="Formation Supérieure" name="formation" options={options.formation} />
          <div className="col-span-2">
            <SelectInput label="Spécialités" name="specialites" options={options.specialites} onChange={handleSpecialtyChange} />
            <div className="mt-4">
              {selectedSpecialties.length > 0 && (
                <div>
                  <p className="text-gray-700 font-medium">Spécialités sélectionnées :</p>
                  <ul className="mt-2">
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
        <div className="flex justify-end mt-auto pt-8">
          <Button>
            Suivant
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
