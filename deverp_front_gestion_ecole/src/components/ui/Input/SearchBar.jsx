import { Search } from "lucide-react";

function SearchBar() {
    return (
        <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-opacity-50" size={20} />
            <input
                type="text"
                placeholder="Search for..."
                className="w-full pl-10 pr-4 py-2 bg-[#D3D0D0] rounded-full focus:outline-none focus:ring-2 shadow-md"
            />
        </div>
    );
}

export default SearchBar