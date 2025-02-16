import React from 'react';
import { useNavigate } from 'react-router-dom';  // Assurez-vous d'importer useNavigate
import NavigationButtons from '../ui/Button/NavigationButtons';
import { useFormContext } from '../../context/FormContext';
import FileInput from '../ui/Input/InputField';
import AlertService from '../../services/notifications/AlertService';

const DocForm = () => {
  const { formState, updateDocuments } = useFormContext();
  const navigate = useNavigate();

  // Fonction de gestion de l'upload de fichiers
  const handleFileUpload = (name, files) => {
    if (files && files[0]) {
      const file = files[0];
      // Stocker le fichier réel, pas juste un objet vide
      updateDocuments({ ...formState.documents, [name]: file });
    }
  };

  // Vérification que tous les fichiers nécessaires sont fournis
  const areAllFilesProvided = () => {
    const requiredFiles = [
      'cni/passeport', 'diplome', 'certificat scolarite', 'casier judiciaire', 'bulletin notes', 'certificat residence', 
      'visite contre visite', 'extrait de naissance', 'certificat domicile', 'certificat de travail', 'visite medicale', 'photo identite'
    ];
    return requiredFiles.every(file => formState.documents[file]);
  };

  // Fonction pour gérer le clic "Précédent"
  const handlePrevClick = (e) => {
    e.preventDefault();
    navigate('/TuteurInfos');
  };

  // Fonction pour gérer le clic "Suivant"
  const handleNextClick = (e) => {
    e.preventDefault();

    // Si tous les fichiers ne sont pas fournis, afficher une alerte
    if (areAllFilesProvided()) {
      AlertService.error('Veuillez télécharger tous les documents requis.');
    } else {
      navigate('/RecapEtudiant');
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
        Document A fournir
      </h2>

      <form className="flex flex-col">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-6">
          <FileInput
            label="CNI/passport"
            type="file"
            name="cni/passport"
            accept=".pdf"
            initialFile={formState.documents['cni/passeport']}
            onChange={(e) => handleFileUpload('cni/passeport', e.target.files)}
          />
          <FileInput
            label="Dernier diplôme obtenue"
            type="file"
            name="diplome"
            accept=".pdf"
            initialFile={formState.documents.diplome}
            onChange={(e) => handleFileUpload('diplome', e.target.files)}
          />
          <FileInput
            label="Certificat de Scolarite"
            type="file"
            name="certificat scolarite"
            accept=".pdf"
            initialFile={formState.documents['certificat scolarite']}
            onChange={(e) => handleFileUpload('certificat scolarite', e.target.files)}
          />
          <FileInput
            label="Casier Judiciaire"
            type="file"
            name="casier judiciaire"
            accept=".pdf"
            initialFile={formState.documents['casier judiciaire']}
            onChange={(e) => handleFileUpload('casier judiciaire', e.target.files)}
          />
          <FileInput
            label="Bulletins de Notes"
            type="file"
            name="bulletin notes"
            accept=".pdf"
            initialFile={formState.documents['bulletin notes']}
            onChange={(e) => handleFileUpload('bulletin notes', e.target.files)}
          />
          <FileInput
            label="Certificat de residence"
            type="file"
            name="certificat residence"
            accept=".pdf"
            initialFile={formState.documents['certificat residence']}
            onChange={(e) => handleFileUpload('certificat residence', e.target.files)}
          />
          <FileInput
            label="Visite contre visite"
            type="file"
            name="visite contre visite"
            accept=".pdf"
            initialFile={formState.documents['visite contre visite']}
            onChange={(e) => handleFileUpload('visite contre visite', e.target.files)}
          />
          <FileInput
            label="extrait de naissance"
            type="file"
            name="extrait de naissance"
            accept=".pdf"
            initialFile={formState.documents['extrait de naissance']}
            onChange={(e) => handleFileUpload('extrait de naissance', e.target.files)}
          />
          <FileInput
            label="certificat de domicile"
            type="file"
            name="certificat domicile"
            accept=".pdf"
            initialFile={formState.documents['certificat domicile']}
            onChange={(e) => handleFileUpload('certificat domicile', e.target.files)}
          />
          <FileInput
            label="certificat de travail"
            type="file"
            name="certificat travail"
            accept=".pdf"
            initialFile={formState.documents['certificat travail']}
            onChange={(e) => handleFileUpload('certificat travail', e.target.files)}
          />
          <FileInput
            label="visite medicale"
            type="file"
            name="visite medicale"
            accept=".pdf"
            initialFile={formState.documents['visite medicale']}
            onChange={(e) => handleFileUpload('visite medicale', e.target.files)}
          />
          <FileInput
            label="photo d'identite"
            type="file"
            name="photo identite"
            accept=".pdf"
            initialFile={formState.documents['photo identite']}
            onChange={(e) => handleFileUpload('photo identite', e.target.files)}
          />
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
