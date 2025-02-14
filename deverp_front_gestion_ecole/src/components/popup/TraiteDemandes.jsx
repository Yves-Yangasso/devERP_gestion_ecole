import { CheckCircle, Users, User } from "lucide-react";
import { useState, useEffect } from "react";

const TraiteDemandes = ({ dossier, closePopup, openSecondPopup, onSubmitDecision }) => {
    const { etudiant, tuteurs } = dossier;
    const [checkedDocuments, setCheckedDocuments] = useState({});
    const [showDecision, setShowDecision] = useState(false);
    
    // Liste des documents requis basée sur dossier.documents
    const documentsRequis = dossier.dossier.documents.map(doc => doc.type_document);
    
    // Ajouter d'autres documents si nécessaire
    const allDocuments = [
        ...documentsRequis,
        "Certificat de Résidence",
        "Certificat de Scolarité",
        "2 Photos d'Identité",
        "Casier Judiciaire"
    ];

    useEffect(() => {
        // Initialize checked state for all documents
        const initialCheckedState = allDocuments.reduce((acc, doc) => ({
          ...acc,
          [doc]: false
        }), {});
        setCheckedDocuments(initialCheckedState);
      }, []);
    
      const handleDocumentCheck = (document) => {
        setCheckedDocuments(prev => ({
          ...prev,
          [document]: !prev[document]
        }));
      };
    
      const areAllDocumentsChecked = () => {
        return Object.values(checkedDocuments).every(checked => checked);
      };
    
      const handleDecisionSubmit = async (decisionData) => {
        const allChecked = areAllDocumentsChecked();
        
        // Prepare the data to be sent
        const submissionData = {
          etudiantId: etudiant.id,
          documents: checkedDocuments,
          decision: allChecked ? "Accepter" : "Refuser",
          status: decisionData.status,
          motif: decisionData.motif
        };
    
        try {
          await onSubmitDecision(submissionData);
          closePopup();
        } catch (error) {
          console.error("Error submitting decision:", error);
        }
      };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-5xl relative">
                <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-2xl font-bold text-gray-800">
                        Traitement du dossier de {etudiant.prenom} {etudiant.nom}
                    </h3>
                    <button onClick={closePopup} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
                </div>

                {/* Informations de l'étudiant et du tuteur */}
                <div className="grid grid-cols-2 gap-6 mt-4">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h4 className="font-bold text-blue-600 text-lg flex items-center">
                            <User className="w-5 h-5 mr-2" /> Informations du demandeur
                        </h4>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <p className="font-semibold text-gray-700">Nom Complet:</p>
                            <p className="text-right">{etudiant.prenom} {etudiant.nom}</p>
                            <p className="font-semibold text-gray-700">Nationalité:</p>
                            <p className="text-right">{etudiant.nationalite}</p>
                            <p className="font-semibold text-gray-700">Date de Naissance:</p>
                            <p className="text-right">{new Date(etudiant.date_naissance).toLocaleDateString()}</p>
                            <p className="font-semibold text-gray-700">Lieu de Naissance:</p>
                            <p className="text-right">{etudiant.lieu_naissance}</p>
                            <p className="font-semibold text-gray-700">Adresse:</p>
                            <p className="text-right">{etudiant.adresse}</p>
                            <p className="font-semibold text-gray-700">Email:</p>
                            <p className="text-right">{etudiant.email}</p>
                            <p className="font-semibold text-gray-700">Téléphone:</p>
                            <p className="text-right">{etudiant.telephone}</p>
                            <p className="font-semibold text-gray-700">Niveau d'Études:</p>
                            <p className="text-right">{etudiant.niveau}</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h4 className="font-bold text-blue-600 text-lg flex items-center">
                            <Users className="w-5 h-5 mr-2" /> Informations du tuteur
                        </h4>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {tuteurs.map((tuteur, index) => (
                                <div key={index} className="contents">
                                    <p className="font-semibold text-gray-700">Nom Complet:</p>
                                    <p className="text-right">{tuteur.prenom} {tuteur.nom}</p>
                                    <p className="font-semibold text-gray-700">Adresse:</p>
                                    <p className="text-right">{tuteur.adresse}</p>
                                    <p className="font-semibold text-gray-700">Téléphone:</p>
                                    <p className="text-right">{tuteur.telephone}</p>
                                    <p className="font-semibold text-gray-700">Fonction:</p>
                                    <p className="text-right">{tuteur.fonctions}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Documents requis */}
                <div className="mt-6 p-6 bg-blue-100 rounded-lg shadow-lg">
                    <h4 className="font-bold text-lg text-blue-600">📄 Documents Requis</h4>
                    <ul className="grid grid-cols-3 gap-4 mt-2">
                        {allDocuments.map((doc, index) => (
                            <li key={index} className="bg-white p-3 rounded-lg shadow">
                                <input 
                                    type="checkbox" 
                                    className="mr-2 w-6 h-6"
                                /> 
                                {doc}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bouton "Soumettre décision" */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={openSecondPopup}
                        className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-950 transition duration-300 flex items-center"
                    >
                        <CheckCircle className="w-5 h-5 mr-2"/> Soumettre décision
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TraiteDemandes;