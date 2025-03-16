import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationButtons from '../ui/Button/NavigationButtons';
import { useFormContext } from '../../context/FormContext';
import FileInput from '../ui/Input/InputField';
import AlertService from '../../services/notifications/AlertService';

const DocForm = () => {
  const { formState, updateDocuments } = useFormContext();
  const navigate = useNavigate();

  // ✅ Assurer que `documents` est défini avant d'y accéder
  const documents = formState.documents || {};

  const handleFileUpload = (name, files) => {
    if (files && files[0]) {
      const file = files[0];
      updateDocuments({ [name]: file });
    }
  };

  // ✅ Correction de la vérification des fichiers
  const areAllFilesProvided = () => {
    const requiredFiles = [
      'cni/passeport', 'diplome', 'bulletin notes',  'extrait de naissance' , 'photo identite'
    ];
    return requiredFiles.every(file => documents[file]);
  };

  const handlePrevClick = (e) => {
    e.preventDefault();
    navigate('/TuteurInfos');
  };

  const handleNextClick = (e) => {
    e.preventDefault();

    if (!areAllFilesProvided()) {
      AlertService.error('Veuillez télécharger tous les documents requis.');
    } else {
      navigate('/RecapEtudiant');
    }
  };

  return (
    <div className="flex flex-col flex-1 px-4 sm:px-8 lg:px-12">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
        Documents à fournir
      </h2>

      <form className="flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 py-6">
          {[
            'cni/passeport', 'diplome','bulletin notes','extrait de naissance','photo identite'
          ].map((file, index) => (
            <FileInput
              key={index}
              label={file.replace('/', ' / ')} // Amélioration d'affichage
              type="file"
              name={file}
              accept=".pdf"
              initialFile={documents[file]} // ✅ Empêche l'erreur undefined
              onChange={(e) => handleFileUpload(file, e.target.files)}
            />
          ))}
        </div>

        <NavigationButtons 
          onPrevClick={handlePrevClick} 
          onNextClick={handleNextClick} 
          prevText="Précédent"
          nextText="Suivant"
        />
      </form>
    </div>
  );
};

export default DocForm;
