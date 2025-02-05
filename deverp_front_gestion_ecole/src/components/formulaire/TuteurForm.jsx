import React, { useState } from 'react';
import Input from '../ui/Input/InputField';
import Button from '../ui/Button/SimpleButton';
import { ArrowRightCircle, ArrowLeftCircle, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TuteurForm = () => {
  // État pour suivre les formulaires de tuteurs
  const [tuteurs, setTuteurs] = useState([{ id: 1 }]);

  // Fonction pour ajouter un nouveau formulaire
  const ajouterTuteur = () => {
    setTuteurs([...tuteurs, { id: tuteurs.length + 1 }]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Titre */}
      <h2 className="relative inline-block text-xl font-bold text-blue-600 mb-8 px-4 py-2 border-2 border-blue-600 rounded-tl-full rounded-br-full bg-white text-center">
        INFORMATION DU TUTEUR
      </h2>




      {/* Formulaire principal */}
      <form className="flex-1 flex flex-col">
        {tuteurs.map((tuteur, index) => (
          <div key={tuteur.id} className="border border-gray-300 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Tuteur : {tuteur.id}</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <Input label="Prénom" placeholder="Veuillez saisir le prénom(s)" />
              <Input label="Nom" placeholder="Veuillez saisir le nom(s)" />
              <Input label="Adresse" placeholder="Veuillez saisir l'adresse" />
              <Input label="Téléphone" type="tel" placeholder="Veuillez saisir le téléphone" />
              <Input label="Email" type="email" placeholder="Veuillez saisir l'email" />
              <Input label="Fonction" placeholder="Veuillez saisir la Fonction" />
            </div>
          </div>
        ))}

        {/* Affichage conditionnel du bouton Ajouter Tuteur */}
        {tuteurs.length < 2 && (
          <div className="flex justify-end mb-6">
            <Button
              onClick={ajouterTuteur}
              type="button"
              className="bg-blue-600 text-white flex items-center"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Tuteur
            </Button>
          </div>
        )}
      </form>

      {/* Boutons en bas */}
      <div className="flex justify-between items-center mt-auto py-4 px-8 border-t border-gray-300">
        {/* Bouton Précédent */}
        <Link to="/StudentInfos">
        <Button type="button" className="flex items-center text-blue-600">
          <ArrowLeftCircle className="w-6 h-6 mr-2" />
          Précédent
        </Button>
        </Link>
        

        {/* Bouton Suivant */}
        <Link to="/DocAFournir">
          <Button type="button" className="flex items-center text-blue-600">
            Suivant
            <ArrowRightCircle className="w-6 h-6 ml-2" />
          </Button></Link>

      </div>
    </div>
  );
};

export default TuteurForm;
