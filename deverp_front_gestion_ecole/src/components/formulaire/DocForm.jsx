import React from 'react';
import Input from '../ui/Input/InputField';
import Button from '../ui/Button/SimpleButton';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';

  
const DocForm = () => {

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
        Document A fournir
      </h2>

      <form className="flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 flex-1">
          <Input label="CNI/passport" placeholder="Veuillez saisir le CNI passport" />
          <Input label="Dernier diplome" placeholder="Veuillez saisir le diplome" />
          <Input label="Certificat Scolarite" type="date" placeholder="Veuillez saisir le certificat de scolarite" />
          <Input label="Telephone" placeholder="Veuillez saisir le Telephone" />
          <Input label="Bulletins" placeholder="Veuillez saisir le bulletin" />
          <Input label="Certificat residence" type="email" placeholder="Veuillez saisir le certificat residence" />
          
        </div>
        <div className="flex justify-between items-center mt-auto py-4 px-8 border-t border-gray-300">
        {/* Bouton Précédent */}
        <Button type="button" className="flex items-center text-blue-600">
          <ArrowLeftCircle className="w-6 h-6 mr-2" />
          Précédent
        </Button>

        {/* Bouton Suivant */}
        <Button type="button" className="flex items-center text-blue-600">
          Suivant
          <ArrowRightCircle className="w-6 h-6 ml-2" />
        </Button>
      </div>
      </form>
    </div>
  );
};

export default DocForm;
