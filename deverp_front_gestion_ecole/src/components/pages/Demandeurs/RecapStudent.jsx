import React, { useState } from 'react';
import RecapStudents from '../../recap/RecapPart';
import Layout from '../../formulaire/Layout';
import StepIndicator from '../../formulaire/StepIndicator';
import { useFormContext } from '../../../context/FormContext';
import useCrud from '../../../hooks/useCrudAxios'; // Importation du hook personnalisé
import AlertService from '../../../services/notifications/AlertService';

const RecapStudent = () => {
  const { formState } = useFormContext();
  const { create } = useCrud('submit'); // Utilisation du hook pour envoyer les données
  const [isSubmitting, setIsSubmitting] = useState(false); // Ajouter un état de soumission

  // Fonction pour envoyer les données
  const handleSubmit = async () => {
    setIsSubmitting(true); // Démarrer la soumission

    try {
      console.log('Envoi des données:' + JSON.stringify(formState));
      const response = await create({
        tuteur: formState.tutors,
        demandeur: formState.student,
        documents: formState.documents,
      });
      console.log('Données envoyées avec succès:', response);
      AlertService.success('Données envoyées avec succès');
      // Rediriger ou effectuer d'autres actions après l'envoi
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
      AlertService.error('Une erreur est survenue, veuillez réessayer.');
    } finally {
      setIsSubmitting(false); // Fin de la soumission
    }
  };

  return (
    <Layout
      leftText="Voici le récapitulatif de vos données pour plus de contrôle, Veuillez revérifier vos données avant de l’envoyer. Une fois envoyées vous ne pourrez plus les modifier."
      formComponent={<RecapStudents tuteur={formState.tutors} demandeur={formState.student} document={formState.documents} onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
      StepIndicator={<StepIndicator activeStep={4} totalSteps={4} activeStepColor="bg-green-600" />}
    />
  );
};

export default RecapStudent;
