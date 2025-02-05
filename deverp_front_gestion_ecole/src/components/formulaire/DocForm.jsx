import React from 'react';
import Input from '../ui/Input/InputField';
import Button from '../ui/Button/SimpleButton';
import { ArrowLeftCircle, ArrowRightCircle} from 'lucide-react';
import { Link } from 'react-router-dom';


const DocForm = () => {

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
        Document A fournir
      </h2>

      <form className="flex flex-col">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 py-6">
          <Input label="CNI/passport" type='file' placeholder="Veuillez saisir le CNI passport" />
          <Input label="Dernier diplome" type='file' placeholder="Veuillez saisir le diplome" />
          <Input label="Certificat Scolarite" type='file' placeholder="Veuillez saisir le certificat de scolarite" />
          <Input label="Telephone" type='file' placeholder="Veuillez saisir le Telephone" />
          <Input label="Bulletins" type='file' placeholder="Veuillez saisir le bulletin" />
          <Input label="Certificat residence" type='file' placeholder="Veuillez saisir le certificat residence" />

        </div>
        <div className="flex justify-between items-center mt-auto py-4 px-8 border-t border-gray-300">
          {/* Bouton Précédent */}
          <Link to="/TuteurInfos">
            <Button type="button" className="flex items-center text-blue-600">
              <ArrowLeftCircle className="w-6 h-6 mr-2" />
              Précédent
            </Button>
          </Link>

          {/* Bouton Suivant */}
          <Link to="/RecapEtudiant">
            <Button type="button" className="flex items-center text-blue-600">
              Suivant
              <ArrowRightCircle className="w-6 h-6 ml-2" />
            </Button>
          </Link>

        </div>
      </form>
    </div>
  );
};

export default DocForm;
