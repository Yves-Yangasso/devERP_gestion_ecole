import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleInscriptionClick = () => {
    navigate('/StudentInfos'); // Redirige vers la première page d'inscription
  };

  const handleConnexionClick = () => {
    navigate('/PaiementEnLigne'); // Redirige vers la page de connexion
  };

  const handle_Paiement_line_Click = () => {
    navigate('/PaiementEnLigne'); // Redirige vers la page de connexion
  };
  const handle_departements_Click = () => {
    navigate('/NouveauDepartement'); // Redirige vers la page de connexion
  };
  const handle_filiere_Click = () => {
    navigate('/NouvelleFiliere'); // Redirige vers la page de connexion
  };

  return (
    <div className="home-page">
      <h1>Bienvenue à l'Institut Supérieur d'Informatique (ISI)</h1>
      <p>Choisissez une action ci-dessous pour continuer</p>
      <div className="buttons">
        <button onClick={handleInscriptionClick}>Inscription</button>
        <button onClick={handleConnexionClick}>Connexion</button>
        <button onClick={handle_Paiement_line_Click}>Paiement_en_Ligne</button>
        <button onClick={handle_departements_Click}>Add Département</button>
        <button onClick={handle_filiere_Click}>Add Filière</button>
      </div>
    </div>
  );
};

export default HomePage;
