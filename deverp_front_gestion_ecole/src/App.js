// App.js

import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import './App.css';

import InformationStudent from './components/pages/Demandeurs/InformationStudent';
import InformationTuteur from './components/pages/Demandeurs/InformationTuteur';
import DocAFournir from './components/pages/Demandeurs/DocAFournir';
import RecapStudents from './components/pages/Demandeurs/RecapStudent';

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/StudentInfos" />} />
          <Route path="/StudentInfos" element={<InformationStudent />} />
          <Route path="/TuteurInfos" element={<InformationTuteur />} />
          <Route path="/DocAFournir" element={<DocAFournir />} />
          <Route path="/RecapEtudiant" element={<RecapStudents />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;
