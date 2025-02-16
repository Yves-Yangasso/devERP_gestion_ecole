import React from 'react';
import Layout from '../../formulaire/Layout'; // Assure-toi d'importer correctement le Layout
import StepIndicator from '../../formulaire/StepIndicator';
import TuteurForm from '../../formulaire/TuteurForm';

const InformationTuteur = () => {
  return (
    <Layout
      leftText="Veuillez compléter les informations concernant le tuteur en suivant les instructions ci-dessous." 
      formComponent={<TuteurForm/>}
      StepIndicator={<StepIndicator activeStep={2} totalSteps={4} activeStepColor="bg-green-600" />}
    />
  );
}

export default InformationTuteur;