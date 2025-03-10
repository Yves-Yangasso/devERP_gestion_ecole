import { useEffect, useState } from "react";
import { X } from 'lucide-react';
import useCrud from "../../hooks/useCrudAxios";
import SearchBar from "../formulaire/SearchBar";
import DataTable from "./DataTable";
import AlertService from "../../services/notifications/AlertService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import NouvelleFiliere from "../popup/NouvelleFiliere";

const columns = [
    { key: "code", label: "Code" },
    { key: "nom", label: "Nom de la Filière" },
    { key: "description", label: "Description" },
    { key: "est_professionnelle", label: "Professionnelle ?" },
    { key: "actions", label: "Actions" },
];

const actions = ["Modifier", "Supprimé"];

function FiliereList() {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedFiliere, setSelectedFiliere] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [editForm, setEditForm] = useState({
        code: "",
        nom: "",
        description: "",
        est_professionnelle: false,
        departement_id: ""
    });
    
    const { data, get, remove, update, create } = useCrud("filiere");
    const { data: departements, get: getDepartements } = useCrud("departements");

    useEffect(() => {
        get();
        getDepartements();
    }, [get, getDepartements]);

    const safeData = data || [];
    const safeDepartements = departements || [];

    const formattedData = safeData.map((item) => ({
        id: item.id,
        code: item.code,
        nom: item.nom,
        description: item.description,
        est_professionnelle: item.est_professionnelle ? "Oui" : "Non",
        fullData: item,
    }));

    const handleActionSelect = (action, filiere) => {
        switch (action) {
            case "Modifier":
                setSelectedData(filiere.fullData);
                setEditForm({
                    code: filiere.fullData.code || "",
                    nom: filiere.fullData.nom || "",
                    description: filiere.fullData.description || "",
                    est_professionnelle: filiere.fullData.est_professionnelle || false,
                    departement_id: filiere.fullData.departement_id?.toString() || ""
                });
                setShowEditModal(true);
                break;
            case "Supprimé":
                handleDeleteConfirmation(filiere);
                break;
            default:
                break;
        }
    };

    const handleDeleteConfirmation = (filiere) => {
        confirmAlert({
            title: "Confirmation de suppression",
            message: `Êtes-vous sûr de vouloir supprimer la filière ${filiere.fullData.nom} ?`,
            buttons: [
                {
                    label: "Oui",
                    onClick: async () => {
                        try {
                            await remove(filiere.fullData.id);
                            AlertService.success(`La filière ${filiere.fullData.nom} a été supprimée avec succès!`);
                            get();
                        } catch (error) {
                            AlertService.error("Erreur lors de la suppression : " + error.message);
                        }
                    },
                },
                { label: "Non" },
            ],
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                code: editForm.code.trim(),
                nom: editForm.nom.trim(),
                description: editForm.description.trim(),
                departement_id: parseInt(editForm.departement_id, 10),
                est_professionnelle: editForm.est_professionnelle
            };
            await update(selectedData.id, formData);
            AlertService.success(`La filière ${formData.nom} a été modifiée avec succès!`);
            setShowEditModal(false);
            get();
        } catch (error) {
            AlertService.error(`Erreur : ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between gap-4 mb-4">
                <SearchBar
                    placeholder="Rechercher filières..."
                    buttonLabel="Nouvelle Filière"
                    onButtonClick={() => setShowPopup(true)}
                />
            </div>

            <DataTable
                columns={columns}
                data={formattedData}
                actions={actions}
                onActionSelect={handleActionSelect}
                onRowClick={setSelectedFiliere}
            />

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="relative bg-white p-10 rounded shadow-lg max-w-4xl w-full h-[75vh] overflow-y-auto">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            onClick={() => setShowPopup(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <NouvelleFiliere onClose={() => setShowPopup(false)} />
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="relative bg-white p-10 rounded shadow-lg max-w-4xl w-full h-[78vh] overflow-y-auto">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            onClick={() => setShowEditModal(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        
                        <h2 className="text-2xl font-bold mb-6">Modifier la Filière</h2>
                        <form onSubmit={handleEditSubmit} className="space-y-6">
                            <input
                                type="text"
                                value={editForm.code}
                                onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                            />
                            <input
                                type="text"
                                value={editForm.nom}
                                onChange={(e) => setEditForm({ ...editForm, nom: e.target.value })}
                            />
                            <textarea
                                value={editForm.description}
                                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            />
                            <select
                                value={editForm.departement_id}
                                onChange={(e) => setEditForm({ ...editForm, departement_id: e.target.value })}
                            >
                                <option value="">Sélectionnez un département</option>
                                {safeDepartements.map((dept) => (
                                    <option key={dept.id} value={dept.id}>{dept.nom}</option>
                                ))}
                            </select>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={editForm.est_professionnelle}
                                    onChange={(e) => setEditForm({ ...editForm, est_professionnelle: e.target.checked })}
                                />
                                Professionnelle
                            </label>
                            <button type="submit">Enregistrer</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default FiliereList;
