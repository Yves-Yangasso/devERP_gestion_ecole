function NavItem({ icon, navigate, label, active = false, isCollapsed }) {
    return (
        <li className="w-full">
            <a
                href={navigate}
                className={`flex items-center gap-3 px-4 py-2 w-full bg-opacity-60 ${active ? 'bg-[#4A76C2] text-black border-l-4 border-[#23385C] shadow-md' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                title={isCollapsed ? label : ''}
            >
                {icon}
                {!isCollapsed && <span>{label}</span>}
            </a>
        </li>
    );
}

export default NavItem;