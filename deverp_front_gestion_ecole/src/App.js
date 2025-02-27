import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { FormProvider } from "./context/FormContext";
import Inscription from "./components/ProtectedRoute/Inscription";
import Connexion from "./components/ProtectedRoute/Connexion";
import { UserProvider } from './context/AuthContext';
import { TokenProvider } from './context/TokenContext';
import Login from './components/pages/Login/Login';

// Importation des pages ADMIN
import Dashboard from "./components/pages/Admins/Dashboard";
import InscriptionPage from "./components/pages/Admins/Inscription";
import Etudiants from "./components/pages/Admins/Etudiant";
import Professeurs from "./components/pages/Admins/Professeur";
import Modules from "./components/pages/Admins/ModuleMatiére";
import Presence from "./components/pages/Admins/Presence";
import GestionAdministrative from "./components/pages/Admins/Administrative";
import Discussion from "./components/pages/Admins/Discussion";
import Classes from "./components/pages/Admins/ClasseGroupe";

// Importation des pages DEMANDEUR (protégées)
import InformationStudent from "./components/pages/Demandeurs/InformationStudent";
import SuivieDossier from "./components/pages/Demandeurs/SuivieDossier";
import InformationTuteur from "./components/pages/Demandeurs/InformationTuteur";
import DocAFournir from "./components/pages/Demandeurs/DocAFournir";
import RecapStudents from "./components/pages/Demandeurs/RecapStudent";

function App() {
  return (
    <>
      <TokenProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              {/* 🔒 Routes protégées pour la connexion */}
              
              <Route path="/login" element={<Login />} />

              {/* 🌍 Espace ADMIN */}
              
              <Route path="/" element={<Connexion />}>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inscription" element={<InscriptionPage />} />
                <Route path="/etudiant" element={<Etudiants />} />
                <Route path="/professeur" element={<Professeurs />} />
                <Route path="/moduleMatiere" element={<Modules />} />
                <Route path="/presence" element={<Presence />} />
                <Route path="/administrative" element={<GestionAdministrative />} />
                <Route path="/discussion" element={<Discussion />} />
                <Route path="/classeGroupe" element={<Classes />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </TokenProvider>
      <FormProvider>
        <BrowserRouter>
          <Routes>
            {/* 🔒 Espace DEMANDEUR (protégé) */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/inscription-demandes" element={<InformationStudent />} />
            <Route path="/TuteurInfos" element={<Inscription element={<InformationTuteur />} />} />
            <Route path="/DocAFournir" element={<Inscription element={<DocAFournir />} />} />
            <Route path="/RecapEtudiant" element={<Inscription element={<RecapStudents />} />} />
            <Route path="/SuivieDossier" element={<Inscription element={<SuivieDossier />} />} />
          </Routes>
        </BrowserRouter>
      </FormProvider>
    </>
  );
}

export default App;
