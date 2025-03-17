import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PaymentForm = () => {
    const location = useLocation();
    const [montantPaiement, setMontantPaiement] = useState(0);
    const [inscriptionId, setInscriptionId] = useState("");
    const [modePaiementId, setModePaiementId] = useState("");
    const [inscriptionData, setInscriptionData] = useState(null);
    const [formationData, setFormationData] = useState(null);
    const [formationDataPlus, setFormationDataPlus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [paiementsSelectionnes, setPaiementsSelectionnes] = useState({
        fraisInscription: true,
        mois: {
            octobre: false,
            novembre: false,
            decembre: true,
            janvier: false,
            fevrier: false,
            mars: false,
            avril: false,
            mai: false,
            juin: false,
        },
    });

    useEffect(() => {
        if (location.state && location.state.id) {
            setInscriptionId(location.state.id);
            fetchAllData(location.state.id);
        }
    }, [location.state]);

    const fetchAllData = async (inscriptionId) => {
        try {
            const inscriptionResponse = await axios.get(`http://localhost:8000/api/v1/inscriptions/${inscriptionId}`);
            setInscriptionData(inscriptionResponse.data);
            const formationId = inscriptionResponse.data.formations;

            if (formationId) {
                const formationResponse = await axios.get(`http://localhost:8000/api/v1/formations/${formationId}/tarif`);
                setFormationData(formationResponse.data);
                const formationResponsePlus = await axios.get(`http://localhost:8000/api/v1/formations/${formationId}`);
                setFormationDataPlus(formationResponsePlus.data);
            } else {
                throw new Error("Aucune formation trouvée pour cette inscription.");
            }
        } catch (err) {
            console.error("Erreur lors de la récupération des données :", err);
            setError("Impossible de récupérer les informations.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let total = 0;
        if (paiementsSelectionnes.fraisInscription) {
            total += formationData?.droit_inscription || 0;
        }
        const mensualite = formationData?.mensualite || 0;
        const moisSelectionnes = Object.values(paiementsSelectionnes.mois).filter(Boolean).length;
        total += mensualite * moisSelectionnes;
        setMontantPaiement(total);
    }, [paiementsSelectionnes, formationData]);

    const handleMoisChange = (e) => {
        const { name, checked } = e.target;
        setPaiementsSelectionnes((prev) => ({
            ...prev,
            mois: {
                ...prev.mois,
                [name]: checked,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!modePaiementId) {
            alert("Veuillez sélectionner un mode de paiement.");
            return;
        }
    
        const lignesPaiement = [];
        if (paiementsSelectionnes.fraisInscription) {
            lignesPaiement.push({ type_frais: "Frais d'inscription", montant: Number(formationData?.droit_inscription) || 0 });
        }
    
        Object.entries(paiementsSelectionnes.mois).forEach(([mois, checked]) => {
            if (checked) {
                lignesPaiement.push({ type_frais: "Frais de scolarité", montant: Number(formationData?.mensualite) || 0 });
            }
        });
    
        const data = {
            montant_paiement: Number(montantPaiement),
            inscription_id: Number(inscriptionId),
            mode_paiement_id: Number(modePaiementId),
            lignes_paiement: lignesPaiement,
        };
    
        console.log("Données envoyées :", JSON.stringify(data, null, 2)); // Debugging
    
        try {
            const response = await axios.post("http://localhost:8000/api/v1/paiements", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Paiement réussi :", response.data);
            alert("Paiement effectué avec succès !");
        } catch (error) {
            console.error("Erreur lors du paiement :", error.response?.data || error);
            alert("Erreur lors du paiement, veuillez réessayer.");
        }
    };
    

    return (
        <div className="max-w-5xl mx-auto p-6 bg-blue-200 rounded-lg">
            {/* Section Détails de la Formation */}
            <div className="mb-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800">Détails de la Formation</h2>
                <div className="bg-blue-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-blue-100 rounded py-2 px-4 font-medium">Nom</div>
                        <div className="bg-white rounded py-2 px-4">{formationDataPlus?.nom || "Licence Professionnelle en réseaux informatiques"}</div>
                        <div className="bg-blue-100 rounded py-2 px-4 font-medium">Description</div>
                        <div className="bg-white rounded py-2 px-4">{formationDataPlus?.description || "Formation avancée en réseau, télécom"}</div>
                    </div>
                </div>
            </div>

            {/* Section Détails des Frais */}
            <div className="mb-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800">Détails de l'inscription</h2>
                <div className="bg-blue-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-blue-100 rounded py-2 px-4 font-medium">Téléphone</div>
                        <div className="bg-white rounded py-2 px-4">{inscriptionData?.telephone || "+221763224512"}</div>
                        <div className="bg-blue-100 rounded py-2 px-4 font-medium">Prénom</div>
                        <div className="bg-white rounded py-2 px-4">{inscriptionData?.prenom || "Yama"}</div>
                        <div className="bg-blue-100 rounded py-2 px-4 font-medium">Nom</div>
                        <div className="bg-white rounded py-2 px-4">{inscriptionData?.nom || "Diallo"}</div>
                        <div className="bg-blue-100 rounded py-2 px-4 font-medium">Email</div>
                        <div className="bg-white rounded py-2 px-4">{inscriptionData?.email || "mariama.ndiaye@uah.sn"}</div>
                        <div className="bg-blue-100 rounded py-2 px-4 font-medium">Adresse</div>
                        <div className="bg-white rounded py-2 px-4">{inscriptionData?.adresse || "Dakar, Sénégal"}</div>
                        <div className="bg-blue-100 rounded py-2 px-4 font-medium">Date dépôt dossier</div>
                        <div className="bg-white rounded py-2 px-4">
                            {inscriptionData?.created_at ? new Date(inscriptionData.created_at).toLocaleDateString() : "17/03/2025"}
                        </div>
                        <div className="bg-blue-100 rounded py-2 px-4 font-medium">Statut dossier</div>
                        <div className="bg-white rounded py-2 px-4">{inscriptionData?.status || "En attente"}</div>
                    </div>
                </div>
            </div>
    
            {/* Section Montants */}
            <div className="mb-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800">Montants</h2>
                <div className="bg-blue-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-blue-100 rounded py-2 px-4 font-medium">Mensualité</div>
                        <div className="bg-white rounded py-2 px-4">{(formationData?.mensualite || 50000).toLocaleString()} FCFA</div>
                        <div className="bg-blue-100 rounded py-2 px-4 font-medium">Frais Inscription</div>
                        <div className="bg-white rounded py-2 px-4">{(formationData?.droit_inscription || 255000).toLocaleString()} FCFA</div>
                    </div>
                </div>
            </div>
    
            {/* Section Mois à couvrir */}
            <div className="mb-6 shadow-lg">
                <h3 className="text-lg font-bold">Mois à couvrir</h3>
                <div className="grid grid-cols-3 gap-2">
                    {Object.entries(paiementsSelectionnes.mois).map(([mois, checked]) => (
                        <div key={mois} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name={mois}
                                checked={checked}
                                onChange={handleMoisChange}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="text-sm capitalize">{mois}</label>
                        </div>
                    ))}
                </div>
            </div>
    
            
    
            {/* Montant total */}
            <div className="text-lg font-semibold text-center bg-blue-50 p-3 rounded-lg shadow-lg">
                Montant Total à Payer: {montantPaiement.toLocaleString()} FCFA
            </div>
    
            {/* Mode de paiement */}
            <div className="mt-6 shadow-lg">
                <h3 className="font-bold mb-4">Mode de paiement</h3>
                <select
                    value={modePaiementId}
                    onChange={(e) => setModePaiementId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Sélectionner un mode</option>
                    <option value="7">Espèces</option>
                    <option value="7">Carte Bancaire</option>
                    <option value="7">Orange Money</option>
                    <option value="7">Wave</option>
                    <option value="7">Wari</option>
                    <option value="7">Free Money</option>
                </select>
            </div>
    
            {/* Bouton de paiement */}
            <button
                onClick={handleSubmit}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
                Effectuer Paiement
            </button>
        </div>
    );
    
};

export default PaymentForm;
