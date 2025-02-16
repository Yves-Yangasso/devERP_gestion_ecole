import React from 'react'
import Layout from '../../formulaire/Layout';
import DocForm from '../../formulaire/DocForm';
import StepIndicator from '../../formulaire/StepIndicator';

const DocAFournir=()=> {
  return (
    <Layout
    leftText="Ici vous devriez faire le depot des documents demandés pour votre inscription chez nous une fois envoyez vous ne pouvez plus la modifier si l’admin vous y autorise" 
    formComponent={<DocForm />}
    StepIndicator={<StepIndicator activeStep={3} totalSteps={4} activeStepColor="bg-green-600" />}
    />
  )
}

export default DocAFournir;
