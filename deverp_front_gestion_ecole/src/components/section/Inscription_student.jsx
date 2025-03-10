// Importation des dépendances nécessaires
import { useEffect, useState } from "react";
import useCrud from "../../hooks/useCrudAxios";
import SearchBar from "../formulaire/SearchBar";
import DataTable from "./DataTable";
import AlertService from "../../services/notifications/AlertService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import PopupLayout from "../popup/PopupLayout";  // 🔥 Importation du popup
import PopupLayout_Details_Inscription from "../formulaire/PopupLayout_Details_Inscription";

// Définition des colonnes pour la table
const columns = [
    { key: "nom", label: "Nom Complet" },
    { key: "code", label: "Code d'accés" },
    { key: "date", label: "Date" },
    { key: "formation", label: "Formation" },
    { key: "niveau", label: "Niveau" },
    { key: "email", label: "Email" },
    { key: "statut", label: "Statut" },
    { key: "actions", label: "Actions" },
];

// Actions disponibles pour chaque ligne
const actions = ["Voir détails", "Traité", "Supprimé"];

function InscriptionStudent() {
    const [selectedDossier, setSelectedDossier] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);  // 🔥 État pour gérer l'affichage du popup
    const { data, get, remove } = useCrud("inscriptions");

    // Chargement initial des données
    useEffect(() => {
        get();
    }, [get]);

    // 🔥 Gestion du cas où `data` est null ou undefined
    const safeData = data || [];

    // Formatage des données pour l'affichage dans la table
    const formattedData = safeData.map((item) => ({
        id: item.id,
        nom: `${item.nom} ${item.prenom}`,
        code: item.dossier?.[0]?.code_suivi || "N/A",
        date: new Date(item.created_at).toLocaleDateString(),
        formation: item.formation_superieure,
        niveau: item.niveau,
        email: item.email,
        statut: item.dossier?.[0]?.statut || "En attente",
        fullData: item,
    }));

    // Gestionnaire pour les actions sur une ligne
    const handleActionSelect = (action, dossier) => {
        switch (action) {
            case "Voir détails":
                setSelectedData(dossier.fullData);
                setShowDetails(true);
                break;

            case "Supprimé":
                handleDeleteConfirmation(dossier);
                break;

            default:
                break;
        }
    };

    // Fonction de confirmation de suppression
    const handleDeleteConfirmation = (dossier) => {
        confirmAlert({
            title: "Confirmation de suppression",
            message: `Êtes-vous sûr de vouloir supprimer la demande de ${dossier.fullData.nom} ?`,
            buttons: [
                {
                    label: "Oui",
                    onClick: async () => {
                        try {
                            await remove(dossier.fullData.id);
                            AlertService.success(`La demande de ${dossier.fullData.nom} a été supprimée avec succès!`);
                            get(); // Actualisation de la liste
                        } catch (error) {
                            AlertService.error("Erreur lors de la suppression : " + error.message);
                        }
                    },
                },
                {
                    label: "Non",
                },
            ],
        });
    };

    return (
        <>
            <div className="flex items-center justify-between gap-4 mb-4">
                <SearchBar
                    placeholder="Rechercher étudiants, matricules..."
                    buttonLabel="Nouvelle inscription"
                    onButtonClick={() => setIsPopupOpen(true)}  // 🔥 Ouvre le popup
                />
            </div>

            <DataTable
                columns={columns}
                data={formattedData}
                actions={actions}
                onActionSelect={handleActionSelect}
                onRowClick={setSelectedDossier}
            />

            {/* 🔥 Affichage du popup si `isPopupOpen` est vrai */}
            {isPopupOpen && (
                <PopupLayout onClose={() => setIsPopupOpen(false)} />
            )}

            {showDetails && (
                <PopupLayout_Details_Inscription
                    inscriptionData={selectedData}
                    onClose={() => setShowDetails(false)}
                />
            )}
        </>
    );
}

export default InscriptionStudent;
