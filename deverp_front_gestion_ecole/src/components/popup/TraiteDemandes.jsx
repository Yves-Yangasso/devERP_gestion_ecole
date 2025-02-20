import { useState } from 'react';
import { CheckCircle, Users, User, Eye } from "lucide-react";
import DocumentPreview from "../preview/DocumentPreview";

const TraiteDemandes = ({ dossier, checkedDocs, setCheckedDocs,closePopup, openSecondPopup }) => {
    
    
    const [previewDoc, setPreviewDoc] = useState(null);
    
    const documentsRequis = dossier.dossier && dossier.dossier[0] && dossier.dossier[0].documents
        ? dossier.dossier[0].documents.map(doc => ({
            id: doc.id,
            type: doc.type,
            chemin: doc.chemin,
            url_secure: doc.url_secure,
            preview_url: doc.preview_url
        }))
        : [];

    const handleCheckDocument = (docId) => {
        setCheckedDocs(prev => {
            const newCheckedDocs = {
                ...prev,
                [docId]: !prev[docId]
            };
            return newCheckedDocs;
        });
    };

    const areAllDocsChecked = () => {
        return documentsRequis.every(doc => checkedDocs[doc.id]);
    };

    const handleOpenDecision = () => {
        const checkedDocumentsStatus = documentsRequis.map(doc => ({
            id: doc.id,
            statut: checkedDocs[doc.id] ? "valide" : "incomplet"
        }));
        
        // On suppose que l'ID du dossier est dans dossier.dossier[0].id
        const dossierId = dossier?.dossier?.[0]?.id;
        
        // On passe l'ID dans l'objet envoyé à openSecondPopup
        openSecondPopup({
            checkedDocuments: checkedDocumentsStatus,
            allDocsChecked: areAllDocsChecked(),
            dossierId: dossierId  // Ici, c'est bien un nombre (ex: 99 ou 87)
        });
    };
    
    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-5xl relative">
                <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-2xl font-bold text-gray-800">
                        Traitement du dossier de {dossier.prenom} {dossier.nom}
                    </h3>
                    <button onClick={closePopup} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-4">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h4 className="font-bold text-blue-600 text-lg flex items-center">
                            <User className="w-5 h-5 mr-2" /> Informations du demandeur
                        </h4>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <p className="font-semibold text-gray-700">Nom Complet:</p>
                            <p className="text-right">{dossier.prenom} {dossier.nom}</p>
                            <p className="font-semibold text-gray-700">Nationalité:</p>
                            <p className="text-right">{dossier.nationalite}</p>
                            <p className="font-semibold text-gray-700">Date de Naissance:</p>
                            <p className="text-right">{new Date(dossier.date_naissance).toLocaleDateString()}</p>
                            <p className="font-semibold text-gray-700">Email:</p>
                            <p className="text-right">{dossier.email}</p>
                            <p className="font-semibold text-gray-700">Téléphone:</p>
                            <p className="text-right">{dossier.telephone}</p>
                            <p className="font-semibold text-gray-700">Niveau d'Études:</p>
                            <p className="text-right">{dossier.niveau}</p>
                        </div>
                    </div>

                    {dossier.tuteur && (
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <h4 className="font-bold text-blue-600 text-lg flex items-center">
                                <Users className="w-5 h-5 mr-2" /> Informations du tuteur
                            </h4>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <p className="font-semibold text-gray-700">Nom Complet:</p>
                                <p className="text-right">{dossier.tuteur.prenom} {dossier.tuteur.nom}</p>
                                <p className="font-semibold text-gray-700">Téléphone:</p>
                                <p className="text-right">{dossier.tuteur.telephone}</p>
                                <p className="font-semibold text-gray-700">Email:</p>
                                <p className="text-right">{dossier.tuteur.email}</p>
                                <p className="font-semibold text-gray-700">Fonction:</p>
                                <p className="text-right">{dossier.tuteur.fonctions}</p>
                            </div>
                        </div>
                    )}
                </div>


                <div className="mt-6 p-6 bg-blue-100 rounded-lg shadow-lg">
                    <h4 className="font-bold text-lg text-blue-600 mb-4">📄 Documents Requis</h4>
                    <div className="grid grid-cols-3 gap-4">
                        {documentsRequis.map((doc) => (
                            <div key={doc.id} className="bg-white p-4 rounded-lg shadow flex items-center space-x-3">
                                <input 
                                    type="checkbox" 
                                    id={`doc-${doc.id}`}
                                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={checkedDocs[doc.id] || false}
                                    onChange={() => handleCheckDocument(doc.id)}
                                />
                                <label 
                                    htmlFor={`doc-${doc.id}`}
                                    className="flex-1 text-sm font-medium text-gray-700 cursor-pointer"
                                >
                                    {doc.type} - <span className={checkedDocs[doc.id] ? "text-green-600" : "text-red-600"}>
                                        {checkedDocs[doc.id] ? "Valide" : "Incomplet"}
                                    </span>
                                </label>
                                <button 
                                    onClick={() => setPreviewDoc(doc)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <Eye className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleOpenDecision}
                        className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-950 transition duration-300 flex items-center"
                    >
                        <CheckCircle className="w-5 h-5 mr-2"/> Soumettre décision
                    </button>
                </div>
            </div>
            
            {previewDoc && (
                <DocumentPreview 
                    document={previewDoc} 
                    onClose={() => setPreviewDoc(null)} 
                />
            )}
        </div>
    );
};

export default TraiteDemandes;
