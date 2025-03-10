import React, { useState } from 'react';
import useCrudAxios from "../../hooks/useCrudAxios";

const NouveauDepartement = () => {
    const { create, loading, error } = useCrudAxios("departements");
    const [formData, setFormData] = useState({
        code: "",
        nom: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await create({
                code: formData.code,
                nom: formData.nom,
                description: formData.description
            });
        } catch (err) {
            console.error("Erreur lors de la création du département", err);
        }
    };

    return (
        <div className="p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Nouveau Département</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label>Code du Département</label>
                    <input name="code" placeholder="Code du Département" value={formData.code} onChange={handleChange} className="border rounded p-2 w-full" />
                </div>
                <div>
                    <label>Nom du Département</label>
                    <input name="nom" placeholder="Nom du Département" value={formData.nom} onChange={handleChange} className="border rounded p-2 w-full" />
                </div>
            </div>
            <div className="mt-4">
                <label>Description</label>
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border rounded p-2 w-full" />
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

export default NouveauDepartement;
