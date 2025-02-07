import React from 'react';
import Input from '../ui/Input/InputField';
import NavigationButtons from '../ui/Button/NavigationButtons';
import { useFormContext } from '../../context/FormContext';


const DocForm = () => {
  const { formState, updateDocuments } = useFormContext();

  const handleFileUpload = (name, files) => {
    updateDocuments({ ...formState.documents, [name]: files[0] });
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
        Document A fournir
      </h2>

      <form className="flex flex-col">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 py-6">
          <Input label="CNI/passport" name="cni" type='file' onChange={(e) => handleFileUpload('cni', e.target.files)} placeholder="Veuillez saisir le CNI passport" />
          <Input label="Dernier diplome" name="diplome" type='file' onChange={(e) => handleFileUpload('diplome', e.target.files)} placeholder="Veuillez saisir le diplome" />
          <Input label="Certificat Scolarite" name="scolarite" type='file' onChange={(e) => handleFileUpload('scolarite', e.target.files)} placeholder="Veuillez saisir le certificat de scolarite" />
          <Input label="Casier Judiciaire" name="casier" type='file' onChange={(e) => handleFileUpload('casier', e.target.files)} placeholder="Veuillez saisir le Telephone" />
          <Input label="Bulletins de Notes" name="bulletin" type='file' onChange={(e) => handleFileUpload('bulletin', e.target.files)} placeholder="Veuillez saisir le bulletin" />
          <Input label="Certificat residence" name="residence" type='file' onChange={(e) => handleFileUpload('residence', e.target.files)} placeholder="Veuillez saisir le certificat residence" />
          <Input label="Visite contre visite" name="visite" type='file' onChange={(e) => handleFileUpload('visite', e.target.files)} placeholder="Veuillez saisir le certificat visite" />
          <Input label="Certificat signa" name="signa" type='file' onChange={(e) => handleFileUpload('signa', e.target.files)} placeholder="Veuillez saisir le certificat signature" />
          <Input label="Certificat adresse" name="adresse" type='file' onChange={(e) => handleFileUpload('adresse', e.target.files)} placeholder="Veuillez saisir le certificat adresse" />
          <Input label="Certificat ville" name="ville" type='file' onChange={(e) => handleFileUpload('ville', e.target.files)} placeholder="Veuillez saisir le certificat ville" />
          <Input label="Certificat pays" name="pays" type='file' onChange={(e) => handleFileUpload('pays', e.target.files)} placeholder="Veuillez saisir le certificat pays" />
          <Input label="Certificat region" name="region" type='file' onChange={(e) => handleFileUpload('region', e.target.files)} placeholder="Veuillez saisir le certificat region" />

        </div>
        <NavigationButtons prevLink="/TuteurInfos" nextLink="/RecapEtudiant" prevText="Précédent" nextText="Suivant" /> 
      </form>
    </div>
  );
};

export default DocForm;
