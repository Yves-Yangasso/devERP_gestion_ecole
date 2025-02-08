import React from "react";
import { useNavigate } from "react-router-dom"; // Utilisation de useNavigate pour la navigation
import Input from '../ui/Input/InputField';
import Button from '../ui/Button/Button';
import { PlusCircle, Trash2 } from 'lucide-react';
import NavigationButtons from '../ui/Button/NavigationButtons';
import { useFormContext } from '../../context/FormContext';
import { validateName, validateEmail, validatePhone, validateRequired } from '../../utils/validators'; // Ou le chemin correct
import AlertService from "../../services/notifications/AlertService";

const TuteurForm = () => {
  const { formState, updateTutors } = useFormContext();
  const navigate = useNavigate(); // Le hook useNavigate pour la navigation

  const [tuteurs, setTuteurs] = React.useState(() => {
    return formState.tutors && formState.tutors.length > 0
      ? formState.tutors
      : [{ prenom: '', nom: '', adresse: '', telephone: '', email: '', fonction: '' }];
  });

  const [ajoutPossible, setAjoutPossible] = React.useState(false);

  const isTuteurComplet = (tuteur) => {
    return Object.values(tuteur).every((val) => val.trim() !== '');
  };

  const handleTuteurChange = (index, field, value) => {
    const newTuteurs = [...tuteurs];
    newTuteurs[index] = { ...newTuteurs[index], [field]: value };
    setTuteurs(newTuteurs);
    updateTutors(newTuteurs);
    if (index === 0) {
      setAjoutPossible(isTuteurComplet(newTuteurs[0]));
    }
  };

  const ajouterTuteur = () => {
    if (!ajoutPossible) return;
    const newTuteurs = [...tuteurs, { prenom: '', nom: '', adresse: '', telephone: '', email: '', fonction: '' }];
    setTuteurs(newTuteurs);
    updateTutors(newTuteurs);
  };

  const supprimerTuteur = (index) => {
    if (index === 1) {
      const newTuteurs = tuteurs.slice(0, 1);
      setTuteurs(newTuteurs);
      updateTutors(newTuteurs);
      setAjoutPossible(true);
    }
  };

  const handlePrevClick = () => {
    navigate("/StudentInfos"); // Redirection vers /StudentInfos
  };

  const handleNextClick = (e) => {
    e.preventDefault();
  
    const errors = {};
  
    // Vérification de chaque tuteur
    tuteurs.forEach((tuteur, index) => {
      if (!tuteur.prenom) errors[`prenom-${index}`] = "Le prénom est requis";
      if (!tuteur.nom) errors[`nom-${index}`] = "Le nom est requis";
      if (!tuteur.adresse) errors[`adresse-${index}`] = "L'adresse est requise";
      if (!tuteur.telephone) errors[`telephone-${index}`] = "Le téléphone est requis";
      if (!tuteur.email) errors[`email-${index}`] = "L'email est requis";
      if (!tuteur.fonction) errors[`fonction-${index}`] = "La fonction est requise";
    });
  
    // Si des erreurs sont présentes, on les affiche et on bloque la navigation
    if (Object.keys(errors).length > 0) {
      AlertService.error("Veillez remplir tous les champs", errors);
      updateTutors({ errors });
    } else {
      // Si tout est validé, on peut rediriger
      navigate("/DocAFournir"); // Redirige vers la page suivante, par exemple "/SuivantPage"
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

            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <Input label="Prénom" name={`prenom-${index}`} placeholder="Veillez saisir le prenom" value={tuteur.prenom} onChange={(e) => handleTuteurChange(index, 'prenom', e.target.value)} validate={(value) => validateName(value, 'Prénom')}/>
              <Input label="Nom" name={`nom-${index}`} placeholder="Veillez saisir le nom" value={tuteur.nom} onChange={(e) => handleTuteurChange(index, 'nom', e.target.value)} validate={(value) => validateName(value, 'nom')}/>
              <Input label="Adresse" name={`adresse-${index}`} placeholder="Veillez saisir l'adresse" value={tuteur.adresse} onChange={(e) => handleTuteurChange(index, 'adresse', e.target.value)} validate={(value) => validateRequired(value, 'adresse')}/>
              <Input label="Téléphone" name={`telephone-${index}`} placeholder="Veillez saisir le numéro de téléphone" value={tuteur.telephone} onChange={(e) => handleTuteurChange(index, 'telephone', e.target.value)} validate={(value) => validatePhone(value, 'telephone')}/>
              <Input label="Email" name={`email-${index}`} placeholder="Veillez saisir l'email" value={tuteur.email} onChange={(e) => handleTuteurChange(index, 'email', e.target.value)} validate={(value) => validateEmail(value, 'email')}/>
              <Input label="Fonction" name={`fonction-${index}`} placeholder="Veillez saisir la fonction" value={tuteur.fonction} onChange={(e) => handleTuteurChange(index, 'fonction', e.target.value)} validate={(value) => validateRequired(value, 'fonction')}/>
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

        <NavigationButtons 
          onPrevClick={handlePrevClick} 
          onNextClick={handleNextClick} 
          prevText="Précédent"
          nextText="Suivant"
        />
      </form>
    </div>
  );
};

export default TuteurForm;
