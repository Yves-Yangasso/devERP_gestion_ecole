// Importation des dépendances nécessaires
import { useEffect } from "react";
import useCrud from "../../hooks/useCrudAxios";
import SearchBar from "../formulaire/SearchBar";
import DataTable from "./DataTable";
import AlertService from "../../services/notifications/AlertService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

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
    // Hooks pour la gestion des données et des états
    const { data = [], get, remove } = useCrud("inscriptions");
    
    // Chargement initial des données
    useEffect(() => {
        get();
    }, [get]);

    // Formatage des données pour l'affichage dans la table
    const formattedData = data
        ? data.map((item) => ({
            id: item.id,
            nom: `${item.nom} ${item.prenom}`,
            code: item.dossier?.[0]?.code_suivi || "N/A",
            date: new Date(item.created_at).toLocaleDateString(),
            formation: item.formation_superieure,
            niveau: item.niveau,
            email: item.email,
            statut: item.dossier?.[0]?.statut || "En attente",
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

    // Gestionnaire pour les actions sur une ligne

    const handleActionSelect = (action, dossier) => {
        switch (action) {
            case "Voir détails":

                break;

            case "Traité":

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

    return (
        <>
            {/* ✅ Filtres intégrés et connectés à DataTable */}
            <div className="flex items-center justify-between gap-4 mb-4">
                <SearchBar />
            </div>

            {/* ✅ Table et pagination avec données filtrées */}
            <DataTable
                columns={columns}
                data={formattedData} // 👈 Ajout de formattedData ici !
                actions={actions}
                onActionSelect={handleActionSelect}
            />
        </>
    );
}

export default InscriptionStudent;