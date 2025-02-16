import React from 'react';
import { LayoutDashboard, UserPlus, Users, GraduationCap, BookOpen, Calendar, FileText, MessageSquare, Users2 } from 'lucide-react';
import NavItem from '../ui/Button/NavItem';

function SideNav({ isCollapsed }) {
  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r h-screen transition-all duration-300`}>
      <div className={`${isCollapsed ? 'h-28' : 'h-40'} flex justify-center items-center`}>
        <img src="images/Isi_Logo.png" alt="ISI SUPTECH" className={`${isCollapsed ? 'h-1/2 w-full' : 'h-20'} transition-all duration-300`} />
      </div>

      <nav className="">
        <ul className="space-y-2 w-full">
          <NavItem icon={<LayoutDashboard size={20} />} label="Tableau de bord" navigate={"/dashboard"} isCollapsed={isCollapsed} />
          <NavItem icon={<UserPlus size={20} />} label="Inscription" navigate={"/inscription"} active isCollapsed={isCollapsed} />
          <NavItem icon={<Users size={20} />} label="Etudiants" navigate={"/etudiants"} isCollapsed={isCollapsed} />
          <NavItem icon={<GraduationCap size={20} />} label="Professeurs" navigate={"/professeurs"} isCollapsed={isCollapsed} />
          <NavItem icon={<BookOpen size={20} />} label="Modules et Matières" navigate={"/modules"} isCollapsed={isCollapsed} />
          <NavItem icon={<Calendar size={20} />} label="Gestion des présences" navigate={"/presence"} isCollapsed={isCollapsed} />
          <NavItem icon={<FileText size={20} />} label="Gestions Administrative" navigate={"/gestion-administrative"} isCollapsed={isCollapsed} />
          <NavItem icon={<MessageSquare size={20} />} label="Discussion" navigate={"/discussion"} isCollapsed={isCollapsed} />
          <NavItem icon={<Users2 size={20} />} label="Classes et groupe" navigate={"/classes"} isCollapsed={isCollapsed} />
        </ul>
      </nav>

      <div className={`absolute bottom-4 ${isCollapsed ? 'left-0 right-0 text-center' : 'left-4'} text-sm text-gray-600 shadow-xl font-black p-2 border`}>
        ANNEE SCOLAIRE 2024/2025
      </div>
    </div>
  );
}

export default SideNav;