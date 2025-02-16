// App.js

import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import './App.css';

import InformationStudent from './components/pages/Demandeurs/InformationStudent';
import InformationTuteur from './components/pages/Demandeurs/InformationTuteur';
import DocAFournir from './components/pages/Demandeurs/DocAFournir';
import RecapStudents from './components/pages/Demandeurs/RecapStudent';
import Decision_admin from './components/pages/Admins/Decision_admin';
import Paiement from './components/pages/Admins/Paiement';
import RecetteConstaté from './components/pages/Admins/RecetteConstaté';

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/RecetteConstaté" />} />
          <Route path="/StudentInfos" element={<InformationStudent />} />
          <Route path="/TuteurInfos" element={<InformationTuteur />} />
          <Route path="/DocAFournir" element={<DocAFournir />} />
          <Route path="/RecapEtudiant" element={<RecapStudents />} />
          <Route path="/Decision_admin" element={<Decision_admin />} />
          <Route path="/Paiement" element={<Paiement />} />
          <Route path="/RecetteConstaté" element={<RecetteConstaté />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;
