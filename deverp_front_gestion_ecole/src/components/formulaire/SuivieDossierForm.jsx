import React, { useState } from "react";
import Input from "../ui/Input/InputField";
import Button from "../ui/Button/Button";
import InfoRow from "../ui/label/InfoRow";
import { CheckCircle, XCircle, Hourglass, AlertTriangle, FileText } from "lucide-react";
import AlertService from "../../services/notifications/AlertService";
import useCrud from '../../hooks/useCrudAxios';
import { useNavigate } from "react-router-dom";

const StudentTrackingForm = () => {
    const [codeSuivi, setCodeSuivi] = useState("");
    const [showDecision, setShowDecision] = useState(false);
    const [dossierData, setDossierData] = useState(null);
    const { create } = useCrud('suivi-dossier/verifier');
    //const router = useRouter();

    const handleEmailSubmit = async () => {
        const requestPayload = { code_suivi: codeSuivi };
        try {
            const response = await create(requestPayload);
            if (response && response.data.code_suivi === codeSuivi) {
                setDossierData(response.data);
                setShowDecision(true);
            } else {
                AlertService.error("Code de suivi non trouvé. Veuillez entrer un code valide.");
            }
        } catch (error) {
            AlertService.error("Une erreur s'est produite lors de la vérification du code de suivi.");
        }
    };

    const navigate = useNavigate();

    const handleGoToPayment = () => {
        navigate("/PaiementEnLigne", { state: dossierData.inscription });
    };


    const renderStatusIcon = (statut) => {
        switch (statut) {
            case 'en_attente':
                return <Hourglass className="text-yellow-500" />;
            case 'en_cours_validation':
                return <FileText className="text-blue-500" />;
            case 'valide':
                return <CheckCircle className="text-green-500" />;
            case 'rejete':
                return <XCircle className="text-red-500" />;
            case 'incomplet':
                return <AlertTriangle className="text-orange-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
            <div className="bg-white p-6 h-full w-full">
                <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
                    Suivi de Dossier
                </h2>

                {!showDecision && (
                    <div className="mb-6 flex justify-between w-full">
                        <Input
                            value={codeSuivi}
                            onChange={(e) => setCodeSuivi(e.target.value)}
                            placeholder="Entrez votre code de suivi"
                        />
                        <Button
                            className="bg-blue-600 text-white hover:bg-blue-700 ml-4"
                            onClick={handleEmailSubmit}
                        >
                            Vérifier
                        </Button>
                    </div>
                )}

                {showDecision && dossierData && (
                    <div className="bg-white p-6 rounded-lg shadow w-full">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Informations du demandeur</h3>
                        <div className="grid grid-cols-2 gap-4 w-full border">
                            <InfoRow label="Nom Complet" className="w-full" value={`${dossierData.inscription.prenom} ${dossierData.inscription.nom}`} />
                            <InfoRow label="Nationalité" value={dossierData.inscription.nationalite} />
                            <InfoRow label="Email" value={dossierData.inscription.email} />
                            <InfoRow label="Téléphone" value={dossierData.inscription.telephone} />
                        </div>

                        <div className="bg-white p-6 mt-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Dossier</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(dossierData.documents).map(([doc, details]) => (
                                    <div key={doc} className="flex items-center justify-between border-b py-2 last:border-none">
                                        <span>{details.type}</span>
                                        {renderStatusIcon(details.statut)}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 mt-6 rounded-lg shadow">
                            <div className="bg-gray-50 shadow-lg px-10 py-2 rounded-3xl items-center flex justify-between">
                                <h3 className="text-lg font-semibold text-gray-700">Décision</h3>
                                <p className={`font-bold text-lg ${dossierData.decision === "Rejeté" ? "text-red-500" : "text-green-500"}`}>
                                    {dossierData.status}
                                </p>
                            </div>
                            {dossierData.motif && <p className="mt-6 text-gray-600 text-left">Motif : {dossierData.motif}</p>}
                        </div>

                        {dossierData.decision === "Rejeté" || dossierData.decision === "incomplet" ? (
                            <div className="flex justify-end mt-6">
                                <Button className="bg-yellow-600 text-white hover:bg-yellow-700">
                                    Revoir mes informations
                                </Button>
                            </div>
                        ) : (
                            <div className="flex justify-end mt-6">
                                <Button className="bg-green-600 text-white hover:bg-green-700" onClick={handleGoToPayment}>
                                    Aller à la connexion
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentTrackingForm;