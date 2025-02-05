import React from 'react'
import RecapStudents from '../../recap/RecapPart';
import Layout from '../../formulaire/Layout';
import StepIndicator from '../../formulaire/StepIndicator';

const tuteurs = [
    {
      nom: 'Landing Diallo',
      adresse: 'Keur Massar',
      telephone: '+221 XX XXX XX XX',
      fonction: 'Chef de Production'
    },
    {
      nom: 'Landing Diedhiou',
      adresse: 'Keur Massar',
      telephone: '+221 XX XXX XX XX',
      fonction: 'Informaticien'
    }
  ];
  const demandeurs =  {
    nom: 'Landing Diallo',
    adresse: 'Keur Massar',
    telephone: '+221 XX XXX XX XX',
    DateNaissance: ".............",
    LieuNaissance: "Dakar",
    Email: "landing@gmail.com",
    Nationalite: "Senegalais",
    Niveau_Etude: "L1",
    Etablissement: "ISI Suptech",
    Formation_Souhaite: "Informatique",
    Specialite: ".........",

  }

  const documents = [
    "Bulletins de notes de l'année dernier",
    "Certificat de Residence",
    "Copie CNI/Passeport Légalisée",
    "Dernier Diplôme",
    "Certificat de Scolarité", 
    "2 Photo d'Identité",
    "Casier Judiciaire",
    "Documents",
    "Documents",
    "Documents",
    "Documents",
    "Documents"
  ];

const RecapStudent= ()=> {
    
  return (
    <Layout
      leftText="Voici le recapitulatif de vos donnees pour plus de controle, Veuillez reverifier vos donnees avant de l’envoyer. Une fois envoyez vous ne pouvez plus la modifier si l’admin vous y autorise" 
      formComponent={<RecapStudents tuteur={tuteurs} demandeur={demandeurs} document={documents}/>}
      StepIndicator={<StepIndicator activeStep={4} totalSteps={4} activeStepColor="bg-green-600" />}
    />
  )
}

export default RecapStudent
