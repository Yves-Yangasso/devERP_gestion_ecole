import { Navigate } from 'react-router-dom';
import { useFormContext } from '../../context/FormContext';

export const InscriptionRoute = ({ element: Element, requiredStep }) => {
  const { formState } = useFormContext();
  
  const checkStepCompletion = (step) => {
    switch (step) {
      case 'studentInfo':
        return formState.student.prenom && formState.student.nom;
      case 'tuteurInfo':
        return formState.tuteur.nom && formState.student.prenom;
      case 'documents':
        return formState.documents.length > 0;
      default:
        return true;
    }
  };

  if (!checkStepCompletion(requiredStep)) {
    return <Navigate to="/inscription-demandes" replace />;
  }

  return Element;
};