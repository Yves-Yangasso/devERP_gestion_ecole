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

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Paiement" />} />
          <Route path="/StudentInfos" element={<InformationStudent />} />
          <Route path="/TuteurInfos" element={<InformationTuteur />} />
          <Route path="/DocAFournir" element={<DocAFournir />} />
          <Route path="/RecapEtudiant" element={<RecapStudents />} />
          <Route path="/Decision_admin" element={<Decision_admin />} />
          <Route path="/Paiement" element={<Paiement />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;
