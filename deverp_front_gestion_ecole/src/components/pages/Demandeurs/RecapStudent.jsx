import React from 'react'
import RecapStudents from '../../recap/RecapPart';
import Layout from '../../formulaire/Layout';
import StepIndicator from '../../formulaire/StepIndicator';
import { useFormContext } from '../../../context/FormContext';

const RecapStudent= ()=> {
  const { formState } = useFormContext();
    
  return (
    <Layout
      leftText="Voici le recapitulatif de vos donnees pour plus de controle, Veuillez reverifier vos donnees avant de l’envoyer. Une fois envoyez vous ne pouvez plus la modifier si l’admin vous y autorise" 
      formComponent={<RecapStudents tuteur={formState.tutors} demandeur={formState.student} document={formState.documents}/>}
      StepIndicator={<StepIndicator activeStep={4} totalSteps={4} activeStepColor="bg-green-600" />}
    />
  )
}

export default RecapStudent
