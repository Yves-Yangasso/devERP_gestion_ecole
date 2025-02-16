function DoubleButton() {
    return (
        <div className="flex gap-1 border rounded-lg p-1 font-bold bg-white shadow-lg">
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">Etudiants</button>
            <button className="px-4 py-2 bg-[#4A76C2] text-white rounded-md">Demandes</button>
        </div>
    )
}

export default DoubleButton