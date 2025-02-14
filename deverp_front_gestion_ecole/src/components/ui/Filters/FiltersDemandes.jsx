import { ChevronDown } from "lucide-react";

function FiltersDemandes({ searchQuery, setSearchQuery, selectedLevel, setSelectedLevel }) {
    return (
        <div className="flex items-center gap-4 flex-1">
            <div className="relative w-1/4">
                <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5d87ff]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="relative w-64">
                <select
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:border-[#5d87ff]"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                >
                    <option>Filtre par niveau</option>
                    <option>Licence 1</option>
                    <option>Licence 2</option>
                    <option>Licence 3</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
        </div>
    );
}

export default FiltersDemandes;
