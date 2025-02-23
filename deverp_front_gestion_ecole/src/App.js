import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { PrivateRoute } from './components/routes/PrivateRoute';
import { PublicRoute } from './components/routes/PublicRoute';
import { InscriptionRoute } from './components/routes/InscriptionRoute';
import { FormProvider } from "./context/FormContext";
import { UserProvider } from './context/AuthContext';
import { TokenProvider } from './context/TokenContext';
import Login from './components/pages/Login/Login';
import HomePage from './HomePage';

// Importation des pages ADMIN
import Dashboard from "./components/pages/Admins/Dashboard";
import InscriptionPage from "./components/pages/Admins/Inscription";
import Etudiants from "./components/pages/Admins/Etudiant";
import Professeurs from "./components/pages/Admins/Professeur";
import Modules from "./components/pages/Admins/ModuleMatiere";
import Presence from "./components/pages/Admins/Presence";
import GestionAdministrative from "./components/pages/Admins/Administrative";
import Discussion from "./components/pages/Admins/Discussion";
import Classes from "./components/pages/Admins/ClasseGroupe";

// Importation des pages DEMANDEUR
import InformationStudent from "./components/pages/Demandeurs/InformationStudent";
import SuivieDossier from "./components/pages/Demandeurs/SuivieDossier";
import InformationTuteur from "./components/pages/Demandeurs/InformationTuteur";
import DocAFournir from "./components/pages/Demandeurs/DocAFournir";
import RecapStudents from "./components/pages/Demandeurs/RecapStudent";

function App() {
  return (
    <TokenProvider>
      <UserProvider>
        <FormProvider>
          <BrowserRouter>
            <Routes>
              {/* Routes publiques */}
              <Route 
                path="/login" 
                element={
                  <PublicRoute 
                    element={<Login />} 
                    restricted={true}
                  />
                } 
              />
              <Route 
                path="/home" 
                element={
                  <PublicRoute 
                    element={<HomePage />} 
                    restricted={true}
                  />
                } 
              />

              {/* Routes d'inscription */}
              <Route 
                path="/inscription-demandes" 
                element={
                  <InscriptionRoute 
                    element={<InformationStudent />}
                    requiredStep="studentInfo"
                  />
                }
              />
              <Route 
                path="/TuteurInfos" 
                element={
                  <InscriptionRoute 
                    element={<InformationTuteur />}
                    requiredStep="tuteurInfo"
                  />
                }
              />
              <Route 
                path="/DocAFournir" 
                element={
                  <InscriptionRoute 
                    element={<DocAFournir />}
                    requiredStep="documents"
                  />
                }
              />
              <Route 
                path="/RecapEtudiant" 
                element={
                  <InscriptionRoute 
                    element={<RecapStudents />}
                  />
                }
              />
              <Route 
                path="/SuivieDossier" 
                element={
                  <InscriptionRoute 
                    element={<SuivieDossier />}
                  />
                }
              />

              {/* Routes privées (administration) */}
              <Route 
                path="/dashboard" 
                element={<PrivateRoute element={<Dashboard />} />}
              />
              <Route 
                path="/inscription" 
                element={<PrivateRoute element={<InscriptionPage />} />}
              />
              <Route 
                path="/etudiant" 
                element={<PrivateRoute element={<Etudiants />} />}
              />
              <Route 
                path="/professeur" 
                element={<PrivateRoute element={<Professeurs />} />}
              />
              <Route 
                path="/moduleMatiere" 
                element={<PrivateRoute element={<Modules />} />}
              />
              <Route 
                path="/presence" 
                element={<PrivateRoute element={<Presence />} />}
              />
              <Route 
                path="/administrative" 
                element={<PrivateRoute element={<GestionAdministrative />} />}
              />
              <Route 
                path="/discussion" 
                element={<PrivateRoute element={<Discussion />} />}
              />
               <Route 
                path="/classeGroupe" 
                element={<PrivateRoute element={<Classes />} />}
              />

              {/* Redirections par défaut */}
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </BrowserRouter>
        </FormProvider>
      </UserProvider>
    </TokenProvider>
  );
}

export default App;