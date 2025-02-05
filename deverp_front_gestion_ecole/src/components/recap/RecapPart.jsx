import React from 'react'
import InfosTuteur from '../ui/Card/InfosTuteur'
import StudentInfos from '../ui/Card/StudentInfos'
import DocInfos from '../ui/Card/DocInfos'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'
import Button from '../ui/Button/SimpleButton';

const RecapStudents = ({ tuteur, demandeur, document }) => {
  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
         RECAPITULATIF ETUDIANT
      </h2>
      <div className='w-full flex flex-col gap-5 justify-between items-center'>
        <div className='flex gap-8 justify-between w-full h-auto'>
          <InfosTuteur tuteurs={tuteur} />
          <StudentInfos demandeurs={demandeur} />
        </div>
        <DocInfos documents={document} />
      </div>
      <div className="flex justify-between items-center mt-auto py-4 px-8 border-t border-gray-300">
        {/* Bouton Précédent */}
        <Button type="button" className="flex items-center text-blue-600">
          <ArrowLeftCircle className="w-6 h-6 mr-2" />
          Précédent
        </Button>

        {/* Bouton Suivant */}
        <Button type="button" className="flex items-center text-blue-600">
          Envoyer
          <ArrowRightCircle className="w-6 h-6 ml-2" />
        </Button>
      </div>
    </div>
    

  )
}

export default RecapStudents