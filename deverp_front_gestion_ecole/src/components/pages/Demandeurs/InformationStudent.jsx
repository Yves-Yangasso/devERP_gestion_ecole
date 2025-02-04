import React from 'react';
import Layout from '../../formulaire/Layout'; // Assure-toi d'importer correctement le Layout
import StudentForm from '../../formulaire/StudentForm'; // Assure-toi d'importer le formulaire que tu veux afficher
import StepIndicator from '../../formulaire/StepIndicator';

const InformationStudentPage = () => {
  return (
    <Layout
      leftText="Veuillez compléter les informations concernant l'étudiant en suivant les instructions ci-dessous." 
      formComponent={<StudentForm />}
      StepIndicator={<StepIndicator activeStep={1} totalSteps={4} activeStepColor="bg-green-600" />}
    />
  );
}

export default InformationStudentPage;
