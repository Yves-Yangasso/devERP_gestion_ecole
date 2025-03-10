import React from 'react';
import Layout from '../../formulaire/Layout';
import Recu from '../../formulaire/reçuInscription'; 

const reçuInscription = () => {
  return (
    <Layout
      leftText="Veuillez compléter les informations concernant l'étudiant en suivant les instructions ci-dessous." 
      formComponent={<Recu />}
    />
  );
}

export default reçuInscription;