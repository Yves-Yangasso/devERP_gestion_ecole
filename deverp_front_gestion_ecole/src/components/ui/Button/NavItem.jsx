import React from "react";
import { NavLink } from "react-router-dom";

function NavItem({ icon, navigate, label, active, isCollapsed }) {
  return (
    <li className="w-full">
      <NavLink
        to={navigate}
        className={`flex items-center gap-3 px-4 py-2 w-full bg-opacity-60 transition-all duration-200 ${active ? 'bg-[#4A76C2] text-black border-l-4 border-[#23385C] shadow-md' : 'text-gray-700 hover:bg-gray-50'}`}
        title={isCollapsed ? label : ""}
      >
        {icon}
        {!isCollapsed && <span>{label}</span>}
      </NavLink>
    </li>
  );
}

export default NavItem;
