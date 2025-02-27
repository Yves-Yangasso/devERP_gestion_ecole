import { Navigate } from 'react-router-dom';
import { useFormContext } from '../../context/FormContext';

export const InscriptionRoute = ({ element: Element, requiredStep }) => {
  const { formState } = useFormContext();

  const checkStepCompletion = (step) => {
    switch (step) {
      case 'StudentInfos':
        return !!formState.student?.prenom && !!formState.student?.nom;
      case 'tuteurInfo':
        return formState.tutors?.length > 0 ? !!formState.tutors[0]?.prenom : true;
      case 'documents':
        // 🔥 ✅ Permet l'accès même si aucun fichier n'est encore ajouté
        return formState.documents !== undefined;
      default:
        return true;
    }
  };
    

  console.log("formState:", formState);
  console.log("Documents in formState:", formState.documents);
  console.log("step:", requiredStep);
  console.log("checkStepCompletion result:", checkStepCompletion(requiredStep));

  if (!checkStepCompletion(requiredStep)) {
    return <Navigate to="/StudentInfos" replace />;
  }

  return Element;
};