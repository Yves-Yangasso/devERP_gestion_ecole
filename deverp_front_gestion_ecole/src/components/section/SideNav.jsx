import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  MessageSquare,
  Users2,
} from "lucide-react";
import NavItem from "../ui/Button/NavItem";

function SideNav({ isCollapsed }) {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);

  // Mettre à jour l'état actif quand l'utilisateur change de route
  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  return (
    <div className={`${isCollapsed ? "w-20" : "w-64"} bg-white border-r h-screen transition-all duration-300`}>
      <div className={`${isCollapsed ? "h-28" : "h-40"} flex justify-center items-center`}>
        <img
          src="images/Isi_Logo.png"
          alt="ISI SUPTECH"
          className={`${isCollapsed ? "h-1/2 w-full" : "h-20"} transition-all duration-300`}
        />
      </div>

      <nav>
        <ul className="space-y-2 w-full">
          <NavItem icon={<LayoutDashboard size={20} />} label="Tableau de bord" navigate="/dashboard" active={activeRoute === "/dashboard"} isCollapsed={isCollapsed} />
          <NavItem icon={<UserPlus size={20} />} label="Inscription" navigate="/inscription" active={activeRoute === "/inscription"} isCollapsed={isCollapsed} />
          <NavItem icon={<Users size={20} />} label="Etudiants" navigate="/etudiant" active={activeRoute === "/etudiant"} isCollapsed={isCollapsed} />
          <NavItem icon={<Users size={20} />} label="Départements et Filières" navigate="/Departements" active={activeRoute === "/Departements"} isCollapsed={isCollapsed} />
          <NavItem icon={<GraduationCap size={20} />} label="Professeurs" navigate="/professeur" active={activeRoute === "/professeur"} isCollapsed={isCollapsed} />
          <NavItem icon={<BookOpen size={20} />} label="Modules et Matières" navigate="/moduleMatiere" active={activeRoute === "/moduleMatiere"} isCollapsed={isCollapsed} />
          <NavItem icon={<Calendar size={20} />} label="Gestion des présences" navigate="/presence" active={activeRoute === "/presence"} isCollapsed={isCollapsed} />
          <NavItem icon={<FileText size={20} />} label="Gestions Administrative" navigate="/administrative" active={activeRoute === "/administrative"} isCollapsed={isCollapsed} />
          <NavItem icon={<MessageSquare size={20} />} label="Discussion" navigate="/discussion" active={activeRoute === "/discussion"} isCollapsed={isCollapsed} />
          <NavItem icon={<Users2 size={20} />} label="Classes et groupe" navigate="/classeGroupe" active={activeRoute === "/classeGroupe"} isCollapsed={isCollapsed} />
        </ul>
      </nav>

      <div className={`absolute left-5 bottom-4 text-sm text-gray-600 shadow-xl font-black p-2 border`}>
        {isCollapsed ? "2025" : "ANNEE SCOLAIRE 2024/2025"}
      </div>

    </div>
  );
}

export default SideNav;
