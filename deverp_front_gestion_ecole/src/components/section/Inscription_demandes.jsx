// Importation des dépendances nécessaires
import { useEffect, useState } from "react";
import useCrud from "../../hooks/useCrudAxios";
import Filters from "../ui/Filters/FiltersDemandes";
import DownloadButton from "../ui/Button/DownloadButton";
import DataTable from "./DataTable";
import TraiteDemandes from "../popup/TraiteDemandes";
import DecisionDemandes from "../popup/DecisionDemandes";
import DetailsDemande from "../popup/DetailsDemande";
import AlertService from "../../services/notifications/AlertService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// Définition des colonnes pour la table
const columns = [
    { key: "nom", label: "Nom Complet" },
    { key: "code", label: "Code Suivi Dossier" },
    { key: "date", label: "Date" },
    { key: "formation", label: "Formation" },
    { key: "niveau", label: "Niveau" },
    { key: "email", label: "Email" },
    { key: "statut", label: "Statut" },
    { key: "actions", label: "Actions" },
];

// Actions disponibles pour chaque ligne
const actions = ["Voir détails", "Traité", "Supprimé"];

function InscriptionDemandes() {
    // Hooks pour la gestion des données et des états
    const { data, get, remove, refetch } = useCrud("inscriptions");
    const [selectedDossier, setSelectedDossier] = useState(null);
    const [showDecisionPopup, setShowDecisionPopup] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [decisionData, setDecisionData] = useState(null);
    const [checkedDocs, setCheckedDocs] = useState({});

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("Filtre par niveau");

    // Chargement initial des données
    useEffect(() => {
        refetch(); // Rafraîchir les données si nécessaire
    }, [refetch]);

    // Formatage des données pour l'affichage dans la table
    const formattedData = data
        ? data.map((item) => ({
            id: item.id,
            nom: `${item.nom} ${item.prenom}`,
            code: item.dossier?.code_suivi || "N/A", // ✅ Code de suivi du dossier
            date: new Date(item.created_at).toLocaleDateString(),
            formation: item.formation_superieure,
            niveau: item.niveau,
            email: item.email,
            statut: item.dossier?.statut || "En attente",
            fullData: {
                id: item.id,
                prenom: item.prenom,
                nom: `${item.nom} ${item.prenom}`,
                date_naissance: item.date_naissance,
                lieu_naissance: item.lieu_naissance,
                adresse: item.adresse,
                telephone: item.telephone,
                email: item.email,
                nationalite: item.nationalite,
                dernier_etablissement: item.dernier_etablissement,
                niveau: item.niveau,
                formation_superieure: item.formation_superieure,
                specialites: item.specialites,
                id_tuteur: item.tuteur?.id || null,
                created_at: item.created_at,
                updated_at: item.updated_at,
                tuteur: item.tuteur
                    ? {
                        id: item.tuteur.id,
                        prenom: item.tuteur.prenom,
                        nom: item.tuteur.nom,
                        email: item.tuteur.email,
                        telephone: item.tuteur.telephone,
                        adresse: item.tuteur.adresse,
                        fonctions: item.tuteur.fonctions,
                        statut: item.tuteur.statut,
                        created_at: item.tuteur.created_at,
                        updated_at: item.tuteur.updated_at,
                    }
                    : null,
                dossier: item.dossier
                    ? Array.isArray(item.dossier)
                        ? item.dossier.map((d) => ({
                            id: d.id,
                            inscription_id: d.inscription_id,
                            code_suivi: d.code_suivi,
                            statut: d.statut,
                            commentaire: d.commentaire,
                            mode_validation: d.mode_validation,
                            date_soumission: d.date_soumission,
                            created_at: d.created_at,
                            updated_at: d.updated_at,
                            deleted_at: d.deleted_at,
                            titre: d.titre,
                            description: d.description,
                            documents: d.documents
                                ? d.documents.map((doc) => ({
                                    id: doc.id,
                                    dossier_id: doc.dossier_id,
                                    type: doc.type,
                                    chemin: doc.chemin,
                                    statut: doc.statut,
                                    commentaire: doc.commentaire,
                                    date_validation: doc.date_validation,
                                    created_at: doc.created_at,
                                    updated_at: doc.updated_at,
                                    deleted_at: doc.deleted_at,
                                    url_secure: doc.url_secure,
                                    url_public: doc.url_public,
                                    folder_path: doc.folder_path,
                                    public_id: doc.public_id,
                                    format: doc.format,
                                    preview_url: doc.preview_url,
                                }))
                                : [],
                        }))
                        : [item.dossier] // Convertir l'objet en tableau si ce n'en est pas un
                    : [],

            },
        }))
        : [];

    const filteredData = formattedData.filter((row) => {
        const rowDate = new Date(row.fullData.created_at).toISOString().split("T")[0];

        const matchesDate = searchQuery ? rowDate === searchQuery : true;
        const matchesLevel = selectedLevel !== "Filtre par niveau" ? row.niveau === selectedLevel : true;

        return matchesDate && matchesLevel;
    });

    // Gestionnaire pour l'ouverture du popup de décision
    const handleOpenDecisionPopup = (data) => {
        // data contient { checkedDocuments, allDocsChecked, dossierId }
        setDecisionData(data);
        setShowDecisionPopup(true);
    };

    // Gestionnaire pour les actions sur une ligne
    const handleActionSelect = (action, dossier) => {
        switch (action) {
            case "Voir détails":
                setSelectedData(dossier.fullData);
                setShowDetails(true);
                break;

            case "Traité":
                setSelectedDossier(dossier.fullData);
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
            message: `Êtes-vous sûr de vouloir supprimer la demande de ${dossier.fullData.etudiant.nom} ?`,
            buttons: [
                {
                    label: "Oui",
                    onClick: async () => {
                        try {
                            await remove(dossier.fullData.id);
                            AlertService.success(`La demande de ${dossier.fullData.etudiant.nom} a été supprimée avec succès!`);
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

    // Fonction de fermeture des popups
    const handleClosePopups = () => {
        setShowDecisionPopup(false);
        setSelectedDossier(null);
        setDecisionData(null);
        get(); // Actualisation des données après fermeture
    };

    return (
        <>
            {/* ✅ Filtres intégrés et connectés à DataTable */}
            <div className="flex items-center justify-between gap-4 mb-4">
                <Filters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedLevel={selectedLevel}
                    setSelectedLevel={setSelectedLevel}
                />
                <DownloadButton />
            </div>

            {/* ✅ Table et pagination avec données filtrées */}
            <DataTable
                columns={columns}
                data={filteredData}  // 🔥 On passe les données filtrées
                actions={actions}
                onRowClick={setSelectedDossier}
                onActionSelect={handleActionSelect}
            />

            {/* Popups */}
            {selectedDossier && !showDecisionPopup && (
                <TraiteDemandes dossier={selectedDossier} checkedDocs={checkedDocs} setCheckedDocs={setCheckedDocs} closePopup={() => setSelectedDossier(null)} openSecondPopup={handleOpenDecisionPopup} />
            )}
            {showDecisionPopup && (
                <DecisionDemandes dossier={selectedDossier} decisionData={decisionData} closePopup={handleClosePopups} goBack={() => setShowDecisionPopup(false)} />
            )}
            {showDetails && (
                <DetailsDemande dossier={selectedData} onClose={() => setShowDetails(false)} />
            )}
        </>
    );
}

export default InscriptionDemandes;