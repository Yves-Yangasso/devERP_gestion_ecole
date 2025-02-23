function FiltersDemandes({ searchQuery, setSearchQuery, selectedLevel, setSelectedLevel }) {
    return (
        <div className="flex gap-2 w-full max-w-md">
            <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
                className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
            >
                <option>Filtre par niveau</option>
                <option>Licence 1</option>
                <option>Licence 2</option>
                <option>Licence 3</option>
                <option>Master 1</option>
                <option>Master 2</option>
            </select>
        </div>
    );
}

export default FiltersDemandes;
