import React, { useState } from 'react';

const NouveauDepartementPopup = ({ onClose, onSubmit }) => {
  const [nomDepartement, setNomDepartement] = useState('');
  const [codeDepartement, setCodeDepartement] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSubmit({
      nom: nomDepartement,
      code: codeDepartement,
      description
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nouveau Département</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="nomDepartement" className="block text-sm font-medium mb-2">
              Nom du Département
            </label>
            <input
              id="nomDepartement"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nom du Département"
              value={nomDepartement}
              onChange={(e) => setNomDepartement(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="codeDepartement" className="block text-sm font-medium mb-2">
              Code du Département
            </label>
            <input
              id="codeDepartement"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Code du Département"
              value={codeDepartement}
              onChange={(e) => setCodeDepartement(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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

export default NouveauDepartementPopup;