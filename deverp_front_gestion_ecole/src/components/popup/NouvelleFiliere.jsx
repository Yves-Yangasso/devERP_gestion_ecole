import React, { useState, useEffect } from 'react';
import useCrudAxios from "../../hooks/useCrudAxios";

const NouvelleFiliere = () => {
    const { create, loading, error } = useCrudAxios("filieres");
    const { data: departements } = useCrudAxios("departements");

    const [formData, setFormData] = useState({
        code: "",
        nom: "",
        description: "",
        departement_id: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await create(formData);
        } catch (err) {
            console.error("Erreur lors de la création de la filière", err);
        }
    };

    return (
        <div className="p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Nouvelle Filière</h2>
            <div className="grid grid-cols-2 gap-4">
                <input name="nom" placeholder="Nom du Filière" value={formData.nom} onChange={handleChange} className="border rounded p-2" />
                <input name="code" placeholder="Code du Filière" value={formData.code} onChange={handleChange} className="border rounded p-2" />
                <textarea name="description" placeholder="Description de la Filière" value={formData.description} onChange={handleChange} className="border rounded p-2" />
                <select onChange={(e) => setFormData(prev => ({ ...prev, departement_id: e.target.value }))} className="border rounded p-2">
                    <option value="">Veuillez choisir parmi ces options</option>
                    {departements?.map(dept => (
                        <option key={dept.id} value={dept.id.toString()}>
                            {dept.nom}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex justify-end mt-4">
                <button onClick={handleSubmit} disabled={loading} className="bg-blue-600 text-white rounded px-4 py-2">
                    {loading ? "Création..." : "Créer"}
                </button>
            </div>
            {error && <p className="text-red-500">Erreur: {error.message}</p>}
        </div>
    );
};

export default NouvelleFiliere;