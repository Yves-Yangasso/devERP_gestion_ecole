import { useEffect, useState } from "react";
import useCrud from "../../../hooks/useCrudAxios";
import PageContainer from "../Layout/PageContainer";
import InfosPages from "../../ui/Infos/InfosPages";
import DoubleButton from "../../ui/Button/DoubleButton";
import Filters from "../../ui/Filters/FiltersDemandes";
import DownloadButton from "../../ui/Button/DownloadButton";
import DataTable from "../../section/DataTable";
import DetailsDemandes from "../../popup/TraiteDemandes";
import DecisionDemandes from "../../popup/DecisionDemandes";
import DetailsDemande from "../../popup/DetailsDemande";
import AlertService from "../../../services/notifications/AlertService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

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

const actions = ["Voir détails", "Traité", "Supprimé"];

// Données de démonstration selon le format spécifié
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
                type_document: "Carte d'identité",
                chemin_fichier: "/uploads/documents/ci_jean_dupont.pdf"
            },
            {
                type_document: "Diplôme Bac",
                chemin_fichier: "/uploads/documents/diplome_bac.pdf"
            }
        ]
    }
};

function InscriptionDemandes() {
    const { data, get, remove } = useCrud("inscriptions");
    const [selectedDossier, setSelectedDossier] = useState(null);
    const [showDecisionPopup, setShowDecisionPopup] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    useEffect(() => {
        get();
    }, [get]);

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

    const handleRowClick = (row) => {
        setSelectedDossier(row.fullData);
    };

    const handleActionSelect = (action, dossier) => {
        if (action === "Voir détails") {
            setSelectedData(dossier.fullData);
            setShowDetails(true);
        } else if (action === "Traité") {
            setSelectedDossier(dossier.fullData);
        } else if (action === "Supprimé") {
            confirmAlert({
                title: "Confirmation",
                message: "Êtes-vous sûr de vouloir supprimer cette inscription ?",
                buttons: [
                    {
                        label: "Oui",
                        onClick: async () => {
                            try {
                                await remove(dossier.fullData.id);
                                AlertService.error("La demande de ",  dossier.fullData.etudiant.nom, " supprimer avec success!");
                                get(); // Rafraîchir la liste après suppression
                            } catch (error) {
                                AlertService.error("Erreur lors de la suppression :", error);
                            }
                        },
                    },
                    {
                        label: "Non",
                    },
                ],
            });
        }
    };

    return (
        <PageContainer title="Inscriptions" page="Demandes">
            <InfosPages title="Inscriptions" page="Demandes">
                <DoubleButton />
            </InfosPages>

            <div className="flex items-center justify-between gap-4 mb-4">
                <Filters />
                <DownloadButton />
            </div>

            <DataTable
                columns={columns}
                data={formattedData}
                actions={actions}
                onRowClick={handleRowClick}
                onActionSelect={handleActionSelect}
            />

            {selectedDossier && !showDecisionPopup && (
                <DetailsDemandes
                    dossier={selectedDossier}
                    closePopup={() => setSelectedDossier(null)}
                    openSecondPopup={() => setShowDecisionPopup(true)}
                />
            )}

            {showDecisionPopup && (
                <DecisionDemandes
                    dossier={selectedDossier}
                    closePopup={() => {
                        setShowDecisionPopup(false);
                        setSelectedDossier(null);
                    }}
                    goBack={() => setShowDecisionPopup(false)}
                />
            )}

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