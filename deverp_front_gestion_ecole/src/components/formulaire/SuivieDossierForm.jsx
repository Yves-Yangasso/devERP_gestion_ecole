import React, { useState } from "react";
import Input from "../ui/Input/InputField";
import Button from "../ui/Button/SimpleButton";
import InfoRow from "../ui/label/InfoRow";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

const dossierData = {
    nom: "Mariama Ndiaye",
    email: "ndiayemama868@gmail.com",
    telephone: "772600714",
    nationalite: "Sénégalaise",
    documents: {
        "CIN/Passport": true,
        "Casier Judiciaire": true,
        "Certificat de Scolarité": true,
        "Certificat de Résidence": true,
        "Dernier Diplôme": false,
    },
    decision: "Rejeté",
    motif: "Il manque le document Dernier Diplôme",
};

const StudentTrackingForm = () => {
    const [trackingCode, setTrackingCode] = useState("");

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
            <div className="bg-white p-6 h-full w-full">
                <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
                    Suivi de Dossier
                </h2>

                <Input
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    placeholder="Entrez votre code de suivi"
                    className="w-full mb-6"
                />

                <div className="bg-gray-50 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Informations du demandeur</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <InfoRow label="Nom Complet" value={dossierData.nom} />
                        <InfoRow label="Nationalité" value={dossierData.nationalite} />
                        <InfoRow label="Email" value={dossierData.email} />
                        <InfoRow label="Téléphone" value={dossierData.telephone} />
                    </div>
                </div>

                <div className="bg-white p-6 mt-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Dossier</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(dossierData.documents).map(([doc, valid]) => (
                            <div key={doc} className="flex items-center justify-between border-b py-2 last:border-none">
                                <span>{doc}</span>
                                {valid ? (
                                    <CheckCircle className="text-green-500" />
                                ) : (
                                    <XCircle className="text-red-500" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 mt-6 rounded-lg shadow">
                    <div className="bg-gray-50 shadow-lg px-10 py-2 rounded-3xl items-center flex justify-between">
                        <h3 className="text-lg font-semibold text-gray-700">Décision</h3>
                        <p className={`font-bold text-lg ${dossierData.decision === "Rejeté" ? "text-red-500" : "text-green-500"}`}>
                            {dossierData.decision}
                        </p>
                    </div>
                    {dossierData.motif && <p className="mt-6 text-gray-600 text-left">Motif : {dossierData.motif}</p>}
                </div>
                <div className="flex justify-end mt-6">
                    <Button className="bg-blue-600 text-white hover:bg-blue-700 flex items-center">
                        Suivant
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StudentTrackingForm;
