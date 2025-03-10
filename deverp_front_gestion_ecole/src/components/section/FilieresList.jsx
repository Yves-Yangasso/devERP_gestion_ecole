import React, { useState, useEffect } from 'react';
import useCrudAxios from "../../hooks/useCrudAxios";

const NouvelleFiliere = ({ onClose }) => {
    const { create, loading, error } = useCrudAxios("filieres");
    const { data: departements } = useCrudAxios("departements");

    const [formData, setFormData] = useState({
        code: "",
        nom: "",
        description: "",
        departement_id: "",
        est_professionnelle: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async () => {
        console.log("Données envoyées :", formData);
        try {
            await create(formData);
            onClose();  // Fermer le popup après la création
        } catch (err) {
            console.error("Erreur lors de la création :", err.response?.data || err.message);
        }
    };

    return (
        <div className="p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Nouvelle Filière</h2>
            <div className="space-y-4">
                <input name="code" placeholder="Code" value={formData.code} onChange={handleChange} className="border rounded p-2 w-full" />
                <input name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} className="border rounded p-2 w-full" />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border rounded p-2 w-full" />
                <select name="departement_id" value={formData.departement_id} onChange={handleChange} className="border rounded p-2 w-full">
                    <option value="">Sélectionnez un département</option>
                    {departements?.map((dept) => (
                        <option key={dept.id} value={dept.id}>{dept.nom}</option>
                    ))}
                </select>
                <label className="flex items-center">
                    <input type="checkbox" name="est_professionnelle" checked={formData.est_professionnelle} onChange={handleChange} />
                    <span className="ml-2">Professionnelle</span>
                </label>
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
