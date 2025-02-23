import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const PrivateRoute = ({ element: Element }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    // Sauvegarder l'URL vers laquelle l'utilisateur tentait d'accéder
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return Element;
};
