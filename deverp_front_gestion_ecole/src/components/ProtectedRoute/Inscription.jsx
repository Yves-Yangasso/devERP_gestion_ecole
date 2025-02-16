import { Navigate } from 'react-router-dom';
import { useFormContext } from '../../context/FormContext'; // Importer le contexte du formulaire ou une autre source d'information

const Inscription = ({ element }) => {
  const { formState } = useFormContext();

  // Vérifiez si les informations nécessaires sont présentes, par exemple:
  const isStudentInfoCompleted = formState.student.prenom && formState.student.nom && formState.student.formation;

  // Si l'utilisateur n'a pas rempli les informations de base, le rediriger vers StudentInfos
  if (!isStudentInfoCompleted) {
    return <Navigate to="/StudentInfos" />;
  }

  // Sinon, rendre l'élément de la route demandée
  return element;
};

export default Inscription;
