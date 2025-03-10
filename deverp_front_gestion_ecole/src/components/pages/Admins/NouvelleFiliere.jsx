import React, { useState } from 'react';

const NouvelleFiliere = ({ onClose, onSubmit, departements = [] }) => {
    const [nomFiliere, setNomFiliere] = useState('');
    const [codeFiliere, setCodeFiliere] = useState('');
    const [description, setDescription] = useState('');
    const [departementAssocie, setDepartementAssocie] = useState('');

    const handleSubmit = () => {
        onSubmit({
            nom: nomFiliere,
            code: codeFiliere,
            description,
            departement: departementAssocie
        });
        onClose();  // 🔥 Fermer le popup après soumission
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Nouvelle Filière</h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
                <input
                    placeholder="Nom de la Filière"
                    value={nomFiliere}
                    onChange={(e) => setNomFiliere(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                />
                <input
                    placeholder="Code de la Filière"
                    value={codeFiliere}
                    onChange={(e) => setCodeFiliere(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                />
            </div>
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md mb-6"
            />
            <select
                value={departementAssocie}
                onChange={(e) => setDepartementAssocie(e.target.value)}
                className="w-full px-3 py-2 border rounded-md mb-6"
            >
                <option value="">Sélectionner un Département</option>
                {departements.map((dept, idx) => (
                    <option key={idx} value={dept.nom}>{dept.nom}</option>
                ))}
            </select>
            <div className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-6 rounded-md"
                >
                    Créer
                </button>
            </div>
        </div>
    );
};

export default NouvelleFiliere;
