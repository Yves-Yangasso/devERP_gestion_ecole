import React from 'react';
import Layout from '../../formulaire/Layout'; // Assure-toi d'importer correctement le Layout
import StepIndicator from '../../formulaire/StepIndicator';
import FormDecision from '../../formulaire/form_decision'; // <-- Corrigé

const Decision_admin = () => {
  return (
    <Layout
      leftText="Veuillez soumettre votre décision"
      formComponent={<FormDecision />} // <-- Correction ici aussi
      StepIndicator={<StepIndicator activeStep={2} totalSteps={4} activeStepColor="bg-green-600" />}
    />
  );
}

export default Decision_admin;
