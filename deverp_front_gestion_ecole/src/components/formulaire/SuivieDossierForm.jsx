import React, { useState } from 'react';
import Input from '../ui/Input/InputField';
import Button from '../ui/Button/SimpleButton';
import InfoRow from '../ui/label/InfoRow';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

import '../../styles/SuivieDossier.css';

const dossierData = {
    nom: 'Mariama Ndiaye',
    email: 'ndiayemama868@gmail.com',
    telephone: '772600714',
    nationalite: 'Sénégalaise',
    documents: {
        'CIN/Passport': true,
        'Casier Judiciaire': true,
        'Certificat de Scolarité': true,
        'Certificat de Résidence': true,
        'Dernier Diplôme': false,
    },
    decision: 'Rejeté',
    motif: 'Il manque le document Dernier Diplôme',
};

const StudentTrackingForm = () => {
    const [trackingCode, setTrackingCode] = useState('');

    return (
        <div className="flex flex-col flex-1 p-8 bg-transparent">

            <div className="title-container text-center">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">SUIVIE DE DOSSIER</h2>
            </div>

     <div className="form-container text-center">
            
            <Input
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="Entrez votre code de suivie"
            />

            <div className="info-demandeur">
                <div className="header-demandeur">
                    <img src="icon.png" alt="Icône" />
                    <h6>Informations du demandeur</h6>
                </div>

                <div className="info-row" style={{ fontSize: 11 }}>
                    <InfoRow label="Nom Complet" value="Marianne Ndiaye" />
                    <InfoRow label="Nationalité" value="Sénégalais(e)" />
                </div>

                <div className="info-row" style={{ fontSize: 11 }}>
                    <InfoRow label="Email" value="ndaiymama888@gmail.com" />
                    <InfoRow label="Téléphone" value="776269714" />
                </div>

            </div>

            <hr style={{ background: 'black' }} />

            <div className="bg-white p-6 mt-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Dossier</h3>
                {Object.entries(dossierData.documents).map(([doc, valid]) => (
                    <div key={doc} className="flex items-center justify-between border-b py-2">
                        <span>{doc}</span>
                        {valid ? (
                            <CheckCircle className="text-green-500" />
                        ) : (
                            <XCircle className="text-red-500" />
                        )}
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 mt-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Décision</h3>
                <p className={`font-bold ${dossierData.decision === 'Rejeté' ? 'text-red-500' : 'text-green-500'}`}>
                    {dossierData.decision}
                </p>
                {dossierData.motif && (
                    <p className="mt-2 text-gray-600">Motif : {dossierData.motif}</p>
                )}
            </div>

            <div className="flex justify-end mt-6">
                <Button>
                    Suivant
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
            </div>

            </div>
        </div>
    );
};

export default StudentTrackingForm;
