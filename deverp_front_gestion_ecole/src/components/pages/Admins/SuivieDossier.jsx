import React from 'react';
import Layout from '../../formulaire/Layout'; // Assure-toi d'importer correctement le Layout
import StudentTrackingForm from '../../formulaire/SuivieDossierForm'; // Assure-toi d'importer le formulaire que tu veux afficher
//import StepIndicator from '../../formulaire/StepIndicator';

const InformationStudentPage = () => {
  return (
    <Layout
      leftText=" Votre dossier a été envoyé avec succès. Vous recevrez un e-mail
                contenant un lien qui vous permettra de suivre l’état de votre dossier
                à tout moment." 
      formComponent={<StudentTrackingForm />}
     // StepIndicator={<StepIndicator activeStep={2} totalSteps={4} activeStepColor="bg-green-600" />}
    />
  );
}

export default InformationStudentPage;