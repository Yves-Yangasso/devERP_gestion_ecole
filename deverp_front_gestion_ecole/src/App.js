import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./components/routes/PrivateRoute";
import { PublicRoute } from "./components/routes/PublicRoute";
import { InscriptionRoute } from "./components/routes/InscriptionRoute";
import { FormProvider } from "./context/FormContext";
import { UserProvider } from "./context/AuthContext";
import { TokenProvider } from "./context/TokenContext";
import Login from "./components/pages/Login/Login";
import HomePage from "./HomePage";

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
import RecuInscription from "./components/formulaire/reçuInscription.jsx";
import Attestation from "./components/formulaire/Attestation.jsx"
// Importation des pages DEMANDEUR
import InformationStudent from "./components/pages/Demandeurs/InformationStudent";
import SuivieDossier from "./components/pages/Demandeurs/SuivieDossier";
import InformationTuteur from "./components/pages/Demandeurs/InformationTuteur";
import DocAFournir from "./components/pages/Demandeurs/DocAFournir";
import RecapStudents from "./components/pages/Demandeurs/RecapStudent";
import PaiementEnLigne from "./components/pages/Demandeurs/PaiementEnLigne";
import NouveauDepartement from "./components/popup/NouveauDepartement";
import NouvelleFiliere from "./components/popup/NouvelleFiliere";


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
                element={<PublicRoute element={<Login />} restricted={true} />}
              />

              <Route
                path="/RecuIns"
                element={<PublicRoute element={<RecuInscription />} />}
              />

              <Route
                path="/Attestation"
                element={<PublicRoute element={<Attestation />} />}
              />


              <Route
                path="/home"
                element={
                  <PublicRoute element={<HomePage />} restricted={true} />
                }
              />

              <Route
                path="/NouveauDepartement"
                element={
                  <PublicRoute element={<NouveauDepartement />} restricted={true} />
                }
              />

              <Route
                path="/NouvelleFiliere"
                element={
                  <PublicRoute element={<NouvelleFiliere />} restricted={true} />
                }
              />    

              {/* Routes d'inscription */}
              <Route
                path="/StudentInfos"
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
                    requiredStep="recap"
                  />
                }
              />


              <Route
                path="/SuivieDossier"
                element={<InscriptionRoute element={<SuivieDossier />} />}
              />

              <Route
                path="/PaiementEnLigne"
                element={<InscriptionRoute element={<PaiementEnLigne />} />}
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
