import React, { useState } from 'react';
import Input from '../ui/Input/InputField';
import Button from '../ui/Button/Button';
import { PlusCircle, Trash2 } from 'lucide-react';
import NavigationButtons from '../ui/Button/NavigationButtons';
import { useFormContext } from '../../context/FormContext';

const TuteurForm = () => {
  const { formState, updateTutors } = useFormContext();

  // Toujours afficher un premier tuteur
  const [tuteurs, setTuteurs] = useState(() => {
    return formState.tutors && formState.tutors.length > 0
      ? formState.tutors
      : [{ prenom: '', nom: '', adresse: '', telephone: '', email: '', fonction: '' }];
  });

  const [ajoutPossible, setAjoutPossible] = useState(false);

  // Vérifie si un tuteur est totalement rempli
  const isTuteurComplet = (tuteur) => {
    return Object.values(tuteur).every((val) => val.trim() !== '');
  };

  // Met à jour le formulaire lors de la saisie
  const handleTuteurChange = (index, field, value) => {
    const newTuteurs = [...tuteurs];
    newTuteurs[index] = { ...newTuteurs[index], [field]: value };
    setTuteurs(newTuteurs);
    updateTutors(newTuteurs);

    // Active l'ajout du deuxième tuteur seulement si le premier est rempli
    if (index === 0) {
      setAjoutPossible(isTuteurComplet(newTuteurs[0]));
    }
  };

  // Ajoute un deuxième tuteur uniquement si le premier est complètement rempli
  const ajouterTuteur = () => {
    if (!ajoutPossible) return;
    const newTuteurs = [...tuteurs, { prenom: '', nom: '', adresse: '', telephone: '', email: '', fonction: '' }];
    setTuteurs(newTuteurs);
    updateTutors(newTuteurs);
  };

  // Supprime le deuxième tuteur
  const supprimerTuteur = (index) => {
    if (index === 1) {
      const newTuteurs = tuteurs.slice(0, 1); // Garde seulement le premier tuteur
      setTuteurs(newTuteurs);
      updateTutors(newTuteurs);
      setAjoutPossible(true); // Réactive le bouton d'ajout
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="relative inline-block text-xl font-bold text-blue-600 mb-8 px-4 py-2 border-2 border-blue-600 rounded-tl-full rounded-br-full bg-white text-center">
        INFORMATION DU TUTEUR
      </h2>

      <form className="flex-1 flex flex-col">
        {tuteurs.map((tuteur, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4 mb-6 relative">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Tuteur {index + 1}</h3>

            {index === 1 && (
              <button 
                type="button" 
                onClick={() => supprimerTuteur(index)} 
                className="absolute top-3 right-3 text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}

            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <Input label="Prénom" name={`prenom-${index}`} placeholder="Veillez saisir le prenom" value={tuteur.prenom} onChange={(e) => handleTuteurChange(index, 'prenom', e.target.value)} />
              <Input label="Nom" name={`nom-${index}`} placeholder="Veillez saisir le nom" value={tuteur.nom} onChange={(e) => handleTuteurChange(index, 'nom', e.target.value)} />
              <Input label="Adresse" name={`adresse-${index}`} placeholder="Veillez saisir l'adresse" value={tuteur.adresse} onChange={(e) => handleTuteurChange(index, 'adresse', e.target.value)} />
              <Input label="Téléphone" name={`telephone-${index}`} placeholder="Veillez saisir le numéro de tелефone" value={tuteur.telephone} onChange={(e) => handleTuteurChange(index, 'telephone', e.target.value)} />
              <Input label="Email" name={`email-${index}`} placeholder="Veillez saisir l'email" value={tuteur.email} onChange={(e) => handleTuteurChange(index, 'email', e.target.value)} />
              <Input label="Fonction" name={`fonction-${index}`} placeholder="Veillez saisir la fonction" value={tuteur.fonction} onChange={(e) => handleTuteurChange(index, 'fonction', e.target.value)} />
            </div>
          </div>
        ))}

        {tuteurs.length < 2 && (
          <div className="flex justify-end mb-6">
            <Button onClick={ajouterTuteur} type="button" className={`bg-blue-600 text-white flex items-center ${!ajoutPossible ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!ajoutPossible}>
              <PlusCircle className="w-5 h-5 mr-2" />
              Ajouter Tuteur
            </Button>
          </div>
        )}

        <NavigationButtons prevLink="/StudentInfos" nextLink="/DocAFournir" prevText="Précédent" nextText="Suivant" />
      </form>
    </div>
  );
};

export default TuteurForm;
