import React from 'react';
import Layout from '../../formulaire/Layout';
import StudentTrackingForm from '../../formulaire/SuivieDossierForm'; 

const InformationStudentPage = () => {  
  return (
    <Layout
      leftText=" Votre dossier a été envoyé avec succès. Vous recevrez un e-mail
                contenant un lien qui vous permettra de suivre l’état de votre dossier
                à tout moment." 
      formComponent={<StudentTrackingForm />}
    />
  );
}

export default InformationStudentPage;