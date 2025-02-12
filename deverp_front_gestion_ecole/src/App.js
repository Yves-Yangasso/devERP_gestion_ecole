// App.js
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import InformationStudent from './components/pages/Demandeurs/InformationStudent';
import InformationTuteur from './components/pages/Demandeurs/InformationTuteur';
import DocAFournir from './components/pages/Demandeurs/DocAFournir';
import RecapStudents from './components/pages/Demandeurs/RecapStudent';
import Login from './components/pages/login/login';

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
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