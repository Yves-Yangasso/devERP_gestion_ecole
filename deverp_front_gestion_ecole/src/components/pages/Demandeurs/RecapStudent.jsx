import React, { useState } from 'react';
import RecapStudents from '../../recap/RecapPart';
import Layout from '../../formulaire/Layout';
import StepIndicator from '../../formulaire/StepIndicator';
import { useFormContext } from '../../../context/FormContext';
import useCrud from '../../../hooks/useCrudAxios';
import AlertService from '../../../services/notifications/AlertService';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const RecapStudent = () => {
  const { formState } = useFormContext();
  const { create } = useCrud('inscriptions');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleConfirmation = (response) => {
    confirmAlert({
      title: 'Redirection vers Suivie de demandes',
      message: `Chère ${response.prenom} ${response.nom}, Votre demande a été envoyée. Veuillez vous rendre sur la page Suivie de demandes en cliquant sur le bouton Oui ?`,
      buttons: [
        {
          label: 'Oui',
          onClick: async () => {
            try {
              navigate('/SuivieDossier');
            } catch (error) {
              AlertService.error('Erreur lors de la redirection');
            }
          },
        },
        {
          label: 'Non',
        },
      ],
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const formData = new FormData();

    try {
      // Approche hybride pour être compatible avec le backend
      // Données directes pour les champs critiques
      formData.append('prenom', formState.student.prenom);
      formData.append('nom', formState.student.nom);
      formData.append('date_naissance', formState.student.date);
      formData.append('lieu_naissance', formState.student.lieu);
      formData.append('adresse', formState.student.adresse);
      formData.append('telephone', formState.student.telephone);
      formData.append('email', formState.student.email);
      formData.append('nationalite', formState.student.nationalite);
      formData.append('dernier_etablissement', formState.student.universite);
      formData.append('niveau', formState.student.niveau);
      
      // Structure originale pour le reste
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
      
      // Ajout de champs optionnels si présents
      if (formState.student.formations) {
        formData.append('etudiant[formations]', formState.student.formations);
        formData.append('formations', formState.student.formations);
      }
      
      if (formState.student.filiere) {
        formData.append('etudiant[filiere]', formState.student.filiere);
        formData.append('filiere', formState.student.filiere);
      }

      // Données tuteurs - conservons la structure originale
      formState.tutors.forEach((tuteur, index) => {
        formData.append(`tuteurs[${index}][nom]`, tuteur.nom);
        formData.append(`tuteurs[${index}][prenom]`, tuteur.prenom);
        formData.append(`tuteurs[${index}][telephone]`, tuteur.telephone);
        formData.append(`tuteurs[${index}][email]`, tuteur.email);
        formData.append(`tuteurs[${index}][adresse]`, tuteur.adresse);
        formData.append(`tuteurs[${index}][fonctions]`, tuteur.relation);
        formData.append(`tuteurs[${index}][status]`, 'actif');
      });

      // Données documents - conservons structure originale et ajoutons structure simplifiée
      Object.entries(formState.documents).forEach(([type, file], index) => {
        if (file instanceof File) {
          formData.append(`dossier[documents][${index}][type_document]`, type);
          formData.append(`dossier[documents][${index}][fichier]`, file);
          formData.append(`documents[${index}][type_document]`, type);
          formData.append(`documents[${index}][fichier]`, file);
        }
      });

      formData.append('dossier[titre]', `Dossier de ${formState.student.prenom} ${formState.student.nom}`);
      formData.append('dossier[description]', 'Dossier contenant les documents de l\'étudiant');
      formData.append('titre_dossier', `Dossier de ${formState.student.prenom} ${formState.student.nom}`);
      formData.append('description_dossier', 'Dossier contenant les documents de l\'étudiant');

      // Debug: afficher les données envoyées
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value instanceof File ? value.name : value}`);
      }

      const response = await create(formData);
      console.log('Réponse du serveur:', response);
      AlertService.success('Données envoyées avec succès');
      handleConfirmation(response);
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
      if (error.response && error.response.data) {
        console.log('Détails de l\'erreur:', error.response.data);
        AlertService.error(`Erreur: ${error.response.data.message || 'Une erreur est survenue'}`);
      } else {
        AlertService.error('Une erreur est survenue, veuillez réessayer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout
      leftText="Voici le récapitulatif de vos données pour plus de contrôle. Veuillez revérifier vos données avant de l'envoyer. Une fois envoyées, vous ne pourrez plus les modifier."
      formComponent={<RecapStudents tuteur={formState.tutors} demandeur={formState.student} document={formState.documents} onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
      StepIndicator={<StepIndicator activeStep={4} totalSteps={4} activeStepColor="bg-green-600" />}
    />
  );
};

export default RecapStudent;