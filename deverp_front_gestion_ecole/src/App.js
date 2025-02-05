import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes.jsx';
import Navbar from './components/ui/NavBar/menuItems.jsx'; // Vérifie que ce fichier contient bien le composant Navbar
import './App.css';

const menuItems = [
  { path: '/SuivieDossier', label: 'Suivie Dossier' },
  { path: '/Decision', label: 'Décision' },
  { path: '/Etudiants', label: 'Etudiants' },
];

function App() {
  return (
    <Router> {/* Un seul Router englobant toute l'application */}
      <div className="App">
        <Navbar menuItems={menuItems} /> {/* Barre de navigation */}
        <AppRoutes /> {/* Gestion des routes */}
      </div>
    </Router>
  );
}

export default App;
