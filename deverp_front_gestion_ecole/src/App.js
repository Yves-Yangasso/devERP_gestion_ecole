import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/pages/Demandeurs/DocAFournir.jsx'; // Il faut utiliser ici AppRoutes
import './App.css';

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
