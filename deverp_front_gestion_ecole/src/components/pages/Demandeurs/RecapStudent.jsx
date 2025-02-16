import React, { useState } from 'react';
import RecapStudents from '../../recap/RecapPart';
import Layout from '../../formulaire/Layout';
import StepIndicator from '../../formulaire/StepIndicator';
import { useFormContext } from '../../../context/FormContext';
import useCrud from '../../../hooks/useCrudAxios'; // Importation du hook personnalisé
import AlertService from '../../../services/notifications/AlertService';

const RecapStudent = () => {
  const { formState } = useFormContext();
  const { create } = useCrud('inscriptions'); // Utilisation du hook pour envoyer les données
  const [isSubmitting, setIsSubmitting] = useState(false); // Ajouter un état de soumission

  // Fonction pour envoyer les données
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
  
    try {
      // Données étudiant
      formData.append('etudiant[prenom]', formState.student.prenom);
      formData.append('etudiant[nom]', formState.student.nom);
      formData.append('etudiant[date_naissance]', formState.student.date);
      formData.append('etudiant[lieu_naissance]', formState.student.lieu);
      formData.append('etudiant[adresse]', formState.student.adresse);
      formData.append('etudiant[telephone]', formState.student.telephone);
      formData.append('etudiant[email]', formState.student.email);
      formData.append('etudiant[nationalite]', formState.student.nationalite);
      formData.append('etudiant[dernier_etablissement]', formState.student.universite);
      formData.append('etudiant[niveau]', formState.student.niveau);
      formData.append('etudiant[formation_superieure]', formState.student.formation);
      formData.append('etudiant[specialites]', formState.student.specialites.join(', '));
  
      // Données tuteurs
      formState.tutors.forEach((tuteur, index) => {
        formData.append(`tuteurs[${index}][nom]`, tuteur.nom);
        formData.append(`tuteurs[${index}][prenom]`, tuteur.prenom);
        formData.append(`tuteurs[${index}][telephone]`, tuteur.telephone);
        formData.append(`tuteurs[${index}][email]`, tuteur.email);
        formData.append(`tuteurs[${index}][adresse]`, tuteur.adresse);
        formData.append(`tuteurs[${index}][fonctions]`, tuteur.relation);
        formData.append(`tuteurs[${index}][status]`, 'actif');
      });
  
      // Données documents
      Object.entries(formState.documents).forEach(([type, file], index) => {
        if (file instanceof File) {
          formData.append(`dossier[documents][${index}][type_document]`, type);
          formData.append(`dossier[documents][${index}][fichier]`, file);
        }
      });
  
      formData.append('dossier[titre]', `Dossier de ${formState.student.prenom} ${formState.student.nom}`);
      formData.append('dossier[description]', 'Dossier contenant les documents de l\'étudiant');
  
      // Debug: afficher les données qui seront envoyées
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value instanceof File ? value.name : value}`);
      }
  
      const response = await create(formData);
      console.log('Réponse du serveur:', response);
      AlertService.success('Données envoyées avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
      if (error.response) {
        console.log('Détails de l\'erreur:', error.response.data);
      }
      AlertService.error('Une erreur est survenue, veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
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
