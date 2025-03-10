import { useEffect, useState } from "react";
import { X } from 'lucide-react';
import useCrud from "../../hooks/useCrudAxios";
import SearchBar from "../formulaire/SearchBar";
import DataTable from "./DataTable";
import AlertService from "../../services/notifications/AlertService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import NouveauDepartement from "../popup/NouveauDepartement";

const columns = [
    { key: "code", label: "Code" },
    { key: "nom", label: "Nom du Département" },
    { key: "description", label: "Description" },
    { key: "actions", label: "Actions" },
];

const actions = ["Modifier", "Supprimé"];

function DepartementList() {
    const [showPopup, setShowPopup] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [editForm, setEditForm] = useState({ code: "", nom: "", description: "" });
    const { data, get, remove, update } = useCrud("departements");

    useEffect(() => {
        get();
    }, [get]);

    const safeData = data || [];
    const formattedData = safeData.map((item) => ({
        id: item.id,
        code: item.code,
        nom: item.nom,
        description: item.description,
        fullData: item,
    }));

    // 🛠️ Gestion des actions (Modifier, Supprimé)
    const handleActionSelect = (action, departement) => {
        console.log("Action:", action, "Département:", departement);
        switch (action) {
            case "Modifier":
                setSelectedData(departement.fullData);
                setEditForm(departement.fullData);
                setShowEditModal(true);
                break;

            case "Supprimé":
                handleDeleteConfirmation(departement);
                break;

            default:
                break;
        }
    };

    const handleDeleteConfirmation = (departement) => {
        confirmAlert({
            title: "Confirmation de suppression",
            message: `Êtes-vous sûr de vouloir supprimer le département ${departement.fullData.nom} ?`,
            buttons: [
                {
                    label: "Oui",
                    onClick: async () => {
                        try {
                            await remove(departement.fullData.id);
                            AlertService.success(`Le département ${departement.fullData.nom} a été supprimé avec succès!`);
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

    // 🛠️ Gestion de la soumission du formulaire d'édition
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await update(selectedData.id, editForm);
            AlertService.success(`Le département ${editForm.nom} a été modifié avec succès!`);
            setShowEditModal(false);
            get();  // Actualiser la liste
        } catch (error) {
            AlertService.error("Erreur lors de la modification : " + error.message);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between gap-4 mb-4">
                <SearchBar
                    placeholder="Rechercher départements..."
                    buttonLabel="Nouveau Département"
                    onButtonClick={() => setShowPopup(true)}
                />
            </div>

            <DataTable
                columns={columns}
                data={formattedData}
                actions={actions}
                onActionSelect={handleActionSelect}
            />

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="relative bg-white p-10 rounded shadow-lg max-w-4xl w-full h-[50vh] overflow-y-auto">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            onClick={() => setShowPopup(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        
                        <NouveauDepartement onClose={() => setShowPopup(false)} />
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="relative bg-white p-10 rounded shadow-lg max-w-4xl w-full h-[63vh] overflow-y-auto">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            onClick={() => setShowEditModal(false)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        
                        <div className="w-full">
                            <h2 className="text-2xl font-bold mb-6">Modifier le Département</h2>
                            <form onSubmit={handleEditSubmit} className="space-y-6">
                                <div>
                                    <label>Code</label>
                                    <input
                                        type="text"
                                        value={editForm.code}
                                        onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                                        className="border rounded p-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label>Nom</label>
                                    <input
                                        type="text"
                                        value={editForm.nom}
                                        onChange={(e) => setEditForm({ ...editForm, nom: e.target.value })}
                                        className="border rounded p-2 w-full"
                                    />
                                </div>
                                <div>
                                    <label>Description</label>
                                    <textarea
                                        value={editForm.description}
                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                        className="border rounded p-2 w-full"
                                    />
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white rounded px-4 py-2"
                                    >
                                        Enregistrer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DepartementList;
