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
      'cni', 'diplome', 'scolarite', 'casier', 'bulletin', 'residence', 
      'visite', 'signa', 'adresse', 'ville', 'pays', 'region'
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
    if (!areAllFilesProvided()) {
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
            name="cni"
            accept=".pdf"
            initialFile={formState.documents.cni}
            onChange={(e) => handleFileUpload('cni', e.target.files)}
          />
          <FileInput
            label="Dernier diplome"
            type="file"
            name="diplome"
            accept=".pdf"
            initialFile={formState.documents.diplome}
            onChange={(e) => handleFileUpload('diplome', e.target.files)}
          />
          <FileInput
            label="Certificat Scolarite"
            type="file"
            name="scolarite"
            accept=".pdf"
            initialFile={formState.documents.scolarite}
            onChange={(e) => handleFileUpload('scolarite', e.target.files)}
          />
          <FileInput
            label="Casier Judiciaire"
            type="file"
            name="casier"
            accept=".pdf"
            initialFile={formState.documents.casier}
            onChange={(e) => handleFileUpload('casier', e.target.files)}
          />
          <FileInput
            label="Bulletins de Notes"
            type="file"
            name="bulletin"
            accept=".pdf"
            initialFile={formState.documents.bulletin}
            onChange={(e) => handleFileUpload('bulletin', e.target.files)}
          />
          <FileInput
            label="Certificat residence"
            type="file"
            name="residence"
            accept=".pdf"
            initialFile={formState.documents.residence}
            onChange={(e) => handleFileUpload('residence', e.target.files)}
          />
          <FileInput
            label="Visite contre visite"
            type="file"
            name="visite"
            accept=".pdf"
            initialFile={formState.documents.visite}
            onChange={(e) => handleFileUpload('visite', e.target.files)}
          />
          <FileInput
            label="Certificat signa"
            type="file"
            name="signa"
            accept=".pdf"
            initialFile={formState.documents.signa}
            onChange={(e) => handleFileUpload('signa', e.target.files)}
          />
          <FileInput
            label="Certificat adresse"
            type="file"
            name="adresse"
            accept=".pdf"
            initialFile={formState.documents.adresse}
            onChange={(e) => handleFileUpload('adresse', e.target.files)}
          />
          <FileInput
            label="Certificat ville"
            type="file"
            name="ville"
            accept=".pdf"
            initialFile={formState.documents.ville}
            onChange={(e) => handleFileUpload('ville', e.target.files)}
          />
          <FileInput
            label="Certificat pays"
            type="file"
            name="pays"
            accept=".pdf"
            initialFile={formState.documents.pays}
            onChange={(e) => handleFileUpload('pays', e.target.files)}
          />
          <FileInput
            label="Certificat region"
            type="file"
            name="region"
            accept=".pdf"
            initialFile={formState.documents.region}
            onChange={(e) => handleFileUpload('region', e.target.files)}
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
