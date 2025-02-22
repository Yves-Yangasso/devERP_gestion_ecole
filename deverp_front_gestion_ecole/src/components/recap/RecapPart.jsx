import React from 'react';
import InfosTuteur from '../ui/Card/InfosTuteur';
import StudentInfos from '../ui/Card/StudentInfos';
import DocInfos from '../ui/Card/DocInfos';
import NavigationButtons from '../ui/Button/NavigationButtons';

const RecapStudents = ({ tuteur, demandeur, document, onSubmit, isSubmitting }) => {
  return (
    <div className="flex flex-col flex-1 px-4 sm:px-8 md:px-12">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        RÉCAPITULATIF ÉTUDIANT
      </h2>
      <div className="flex flex-col gap-5 justify-between items-center">
        <div className="flex flex-col md:flex-row gap-8 justify-between w-full h-auto">
          <div className="flex-3">
            <InfosTuteur tuteurs={tuteur} />
          </div>
          <div className="flex-1">
            <StudentInfos demandeurs={demandeur} />
          </div>
        </div>
        <DocInfos documents={document} />
      </div>
      <NavigationButtons
        onPrevClick={() => window.history.back()} // Retour à la page précédente
        onNextClick={onSubmit} // Appel de la fonction onSubmit (handleSubmit)
        prevText="Précédent"
        nextText={isSubmitting ? "Envoi en cours..." : "Envoyer"}
        disabled={isSubmitting} // Désactiver le bouton si la soumission est en cours
      />
    </div>
  );
};

export default RecapStudents;