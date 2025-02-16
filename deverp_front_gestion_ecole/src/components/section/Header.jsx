import React from 'react';
import { Menu } from 'lucide-react';
import SearchBar from '../ui/Input/SearchBar';
import UserMenu from '../ui/DocText/UserMenu';
function Header({ onMenuClick, name, role }) {
  return (
    <header className="bg-white border-b px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 py-2">
          <button 
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
          >
            <Menu size={24} />
          </button>
          <SearchBar />
        </div>
        <UserMenu name={name} role={role} />
      </div>
    </header>
  );
}

export default Header;