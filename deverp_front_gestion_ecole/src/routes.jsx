import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Decision from './components/pages/Admins/Decision';
import InformationStudentPage from './components/pages/Admins/SuivieDossier';
import Etudiants from './components/pages/Demandeurs/InformationStudent';
import Tuteurs from './components/pages/Demandeurs/InformationTuteur';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/SuivieDossier" element={<InformationStudentPage />} />
      <Route path="/Decision" element={<Decision />} />
      <Route path="/Etudiants" element={<Etudiants />} />
      <Route path="/Tuteurs" element={<Tuteurs />} />
    </Routes>
  );
};

export default AppRoutes;
