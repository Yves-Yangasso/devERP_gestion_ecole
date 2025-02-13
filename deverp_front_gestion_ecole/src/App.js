// App.js

import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import './App.css';

import InformationStudent from './components/pages/Demandeurs/InformationStudent';
import InformationTuteur from './components/pages/Demandeurs/InformationTuteur';
import DocAFournir from './components/pages/Demandeurs/DocAFournir';
import RecapStudents from './components/pages/Demandeurs/RecapStudent';
import Decision_admin from './components/pages/Admins/Decision_admin';

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Decision_admin" />} />
          <Route path="/StudentInfos" element={<InformationStudent />} />
          <Route path="/TuteurInfos" element={<InformationTuteur />} />
          <Route path="/DocAFournir" element={<DocAFournir />} />
          <Route path="/RecapEtudiant" element={<RecapStudents />} />
          <Route path="/Decision_admin" element={<Decision_admin />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;
