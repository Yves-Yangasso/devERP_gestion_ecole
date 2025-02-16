import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
// import InformationStudent from './components/pages/Demandeurs/InformationStudent';
import SuivieDossier from './components/pages/Admins/Inscription_demandes';
import InformationTuteur from './components/pages/Demandeurs/InformationTuteur';
import DocAFournir from './components/pages/Demandeurs/DocAFournir';
import RecapStudents from './components/pages/Demandeurs/RecapStudent';
import ProtectedRoute from './components/ProtectedRoute/Inscription';

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          {/* Route par défaut vers la page StudentInfos */}
          <Route path="/" element={<Navigate to="/StudentInfos" />} />
          {/* <Route path="/StudentInfos" element={<InformationStudent />} /> */}
          <Route path="/StudentInfos" element={<SuivieDossier />} />
          
          {/* Routes protégées */}
          <Route
            path="/TuteurInfos"
            element={<ProtectedRoute element={<InformationTuteur />} />}
          />
          <Route
            path="/DocAFournir"
            element={<ProtectedRoute element={<DocAFournir />} />}
          />
          <Route
            path="/RecapEtudiant"
            element={<ProtectedRoute element={<RecapStudents />} />}
          />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;
