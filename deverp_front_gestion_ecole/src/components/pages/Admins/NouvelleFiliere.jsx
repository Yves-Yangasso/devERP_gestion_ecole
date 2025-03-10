import React, { useState } from 'react';

const NouvelleFiliere = ({ onClose, onSubmit, departements = [] }) => {
  const [nomFiliere, setNomFiliere] = useState('');
  const [codeFiliere, setCodeFiliere] = useState('');
  const [description, setDescription] = useState('');
  const [departementAssocie, setDepartementAssocie] = useState('');
  const [showDepartementDropdown, setShowDepartementDropdown] = useState(false);

  const handleSubmit = () => {
    onSubmit({
      nom: nomFiliere,
      code: codeFiliere,
      description,
      departement: departementAssocie
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nouvelle Filière</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="nomFiliere" className="block text-sm font-medium mb-2">
              Nom de la Filière
            </label>
            <input
              id="nomFiliere"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nom du Filière"
              value={nomFiliere}
              onChange={(e) => setNomFiliere(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="codeFiliere" className="block text-sm font-medium mb-2">
              Code de la Filière
            </label>
            <input
              id="codeFiliere"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Code du Filière"
              value={codeFiliere}
              onChange={(e) => setCodeFiliere(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description de la Filière"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="departementAssocie" className="block text-sm font-medium mb-2">
              Département Associé
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-left flex justify-between items-center"
                onClick={() => setShowDepartementDropdown(!showDepartementDropdown)}
              >
                <span className="text-gray-500">
                  {departementAssocie || "Veuillez choisir parmi ces options"}
                </span>
                <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {showDepartementDropdown && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {departements.length > 0 ? (
                    <ul className="max-h-60 overflow-auto py-1">
                      {departements.map((dept, index) => (
                        <li 
                          key={index} 
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setDepartementAssocie(dept.nom);
                            setShowDepartementDropdown(false);
                          }}
                        >
                          {dept.nom}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-3 py-2 text-gray-500">Aucun département disponible</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md"
          >
            Créer
          </button>
        </div>
      </div>
    </div>
  );
};

export default NouvelleFiliere;