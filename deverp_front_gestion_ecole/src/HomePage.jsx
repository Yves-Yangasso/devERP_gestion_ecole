import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleInscriptionClick = () => {
    navigate('/StudentInfos'); // Redirige vers la première page d'inscription
  };

  const handleConnexionClick = () => {
    navigate('/login'); // Redirige vers la page de connexion
  };

  return (
    <div className="home-page">
      <h1>Bienvenue à l'Institut Supérieur d'Informatique (ISI)</h1>
      <p>Choisissez une action ci-dessous pour continuer</p>
      <div className="buttons">
        <button onClick={handleInscriptionClick}>Inscription</button>
        <button onClick={handleConnexionClick}>Connexion</button>
      </div>
    </div>
  );
};

export default HomePage;
