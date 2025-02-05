<<<<<<< HEAD
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/pages/Admins/Decision.jsx'; // Il faut utiliser ici AppRoutes
import './App.css';
=======
import logo from "./logo.svg";
import "./App.css";
>>>>>>> ae13001 (Mise a jour front)

function App() {
  return (
    <Router> {/* Assurer que le Router est ici */}
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
