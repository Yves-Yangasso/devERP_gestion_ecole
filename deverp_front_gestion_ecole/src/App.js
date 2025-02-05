import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import './App.css';
import InformationStudent from './components/pages/Demandeurs/InformationStudent';
import DocAFournir from './components/pages/Demandeurs/DocAFournir';
import RecapStudents from './components/pages/Demandeurs/RecapStudent';
import InformationTuteur from './components/pages/Demandeurs/InformationTuteur';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/StudentInfos" />} />
        <Route path="/StudentInfos" element={<InformationStudent />} />
        <Route path="/TuteurInfos" element={<InformationTuteur />} />
        <Route path="/DocAFournir" element={<DocAFournir />} />
        <Route path="/RecapEtudiant" element={<RecapStudents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;