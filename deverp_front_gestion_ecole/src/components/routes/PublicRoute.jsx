import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const PublicRoute = ({ element: Element, restricted = false }) => {
  const { isAuthenticated } = useAuth();

  // Si la route est restreinte et que l'utilisateur est connecté, rediriger vers le dashboard
  if (restricted && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return Element;
};