// Importation des dépendances nécessaires
import { useEffect, useState } from "react";
import useCrud from "../../../hooks/useCrudAxios";
import PageContainer from "../Layout/PageContainer";
import InfosPages from "../../ui/Infos/InfosPages";
import DoubleButton from "../../ui/Button/DoubleButton";
import Filters from "../../ui/Filters/FiltersDemandes";
import DownloadButton from "../../ui/Button/DownloadButton";
import DataTable from "../../section/DataTable";
import TraiteDemandes from "../../popup/TraiteDemandes";
import DecisionDemandes from "../../popup/DecisionDemandes";
import DetailsDemande from "../../popup/DetailsDemande";
import AlertService from "../../../services/notifications/AlertService";
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

const mockData = {
    etudiant: {
        prenom: "Jean",
        nom: "Dupont",
        date_naissance: "2001-05-20",
        lieu_naissance: "Paris",
        adresse: "123 Rue de l'Université, Paris",
        telephone: "+33612345678",
        email: "jean.dupns@example.com",
        nationalite: "Française",
        dernier_etablissement: "Lycée Saint-Louis",
        niveau: "Bac+1",
        formation_superieure: "Informatique",
        specialites: "Développement Web",
        statut: "En Cours",
        code: "DEM-JEDU2001"
    },
    tuteurs: [
        {
            nom: "Martin",
            prenom: "Claude",
            telephone: "+33698765432",
            email: "clau.martin@example.com",
            adresse: "1234",
            fonctions: "milliardaire",
            status: "marier"
        },
        {
            nom: "Martin",
            prenom: "Claude",
            telephone: "+33698765432",
            email: "clau.martin@example.com",
            adresse: "1234",
            fonctions: "milliardaire",
            status: "marier"
        }
    ],
    dossier: {
        nom: "Dossier de Jean Dupont",
        description: "Dossier contenant les documents de l'étudiant",
        documents: [
            {
                id: "1",
                type_document: "Carte d'identité",
                chemin_fichier: "https://documents1.worldbank.org/curated/en/099005501312332141/pdf/P173204014bc7b0630bbee0943431d526e2.pdf"
            },
            {
                id: "2",
                type_document: "Diplôme Bac",
                chemin_fichier: "https://www.ansd.sn/sites/default/files/2023-12/Final%20Senegal%20DHS%20-%20KIR%202023.pdf"
            }
        ]
    }
};

function InscriptionDemandes() {
    // Hooks pour la gestion des données et des états
    const { data, get, remove } = useCrud("inscriptions");
    const [selectedDossier, setSelectedDossier] = useState(null);
    const [showDecisionPopup, setShowDecisionPopup] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [decisionData, setDecisionData] = useState(null);

    // Chargement initial des données
    useEffect(() => {
        get();
    }, [get]);

    // Formatage des données pour l'affichage dans la table
    const formattedData = data
        ? data.map((item) => ({
            nom: `${item.etudiant.nom} ${item.etudiant.prenom}`,
            code: item.etudiant.code,
            date: new Date().toLocaleDateString(), // À remplacer par item.created_at
            formation: item.etudiant.formation_superieure,
            niveau: item.etudiant.niveau,
            email: item.etudiant.email,
            statut: item.etudiant.statut,
            fullData: item // Données complètes
        }))
        : [
            {
                nom: `${mockData.etudiant.nom} ${mockData.etudiant.prenom}`,
                code: mockData.etudiant.code,
                date: new Date().toLocaleDateString(),
                formation: mockData.etudiant.formation_superieure,
                niveau: mockData.etudiant.niveau,
                email: mockData.etudiant.email,
                statut: mockData.etudiant.statut,
                fullData: mockData
            }
        ];

    // Gestionnaire de clic sur une ligne
    const handleRowClick = (row) => {
        setSelectedDossier(row.fullData);
    };

    // Gestionnaire pour l'ouverture du popup de décision
    const handleOpenDecisionPopup = (data) => {
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
        <PageContainer title="Inscriptions" page="Demandes">
            <InfosPages title="Inscriptions" page="Demandes">
                <DoubleButton />
            </InfosPages>

            {/* Filtres et bouton de téléchargement */}
            <div className="flex items-center justify-between gap-4 mb-4">
                <Filters />
                <DownloadButton />
            </div>

            {/* Table des demandes */}
            <DataTable
                columns={columns}
                data={formattedData}
                actions={actions}
                onRowClick={handleRowClick}
                onActionSelect={handleActionSelect}
            />

            {/* Popup de traitement des demandes */}
            {selectedDossier && !showDecisionPopup && (
                <TraiteDemandes
                    dossier={selectedDossier}
                    closePopup={() => setSelectedDossier(null)}
                    openSecondPopup={handleOpenDecisionPopup}
                />
            )}

            {/* Popup de décision */}
            {showDecisionPopup && (
                <DecisionDemandes
                    dossier={selectedDossier}
                    decisionData={decisionData}
                    closePopup={handleClosePopups}
                    goBack={() => setShowDecisionPopup(false)}
                />
            )}

            {/* Popup de détails */}
            {showDetails && (
                <DetailsDemande
                    dossier={selectedData}
                    onClose={() => setShowDetails(false)}
                />
            )}
        </PageContainer>
    );
}

export default InscriptionDemandes;