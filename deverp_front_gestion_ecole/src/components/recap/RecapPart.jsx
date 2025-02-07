import React from 'react'
import InfosTuteur from '../ui/Card/InfosTuteur'
import StudentInfos from '../ui/Card/StudentInfos'
import DocInfos from '../ui/Card/DocInfos'
import NavigationButtons from '../ui/Button/NavigationButtons'

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
      <NavigationButtons prevLink="/DocAFournir" nextLink="/RecapEtudiant" prevText="Précédent" nextText="Envoyer" /> 
    </div>
  )
}

export default RecapStudents