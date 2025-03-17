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
            janvier: true,
            fevrier: false,
            mars: false,
            avril: false,
            mai: false,
            juin: false,
            juillet: false,
            aout: false,
            septembre: false,
            octobre: false,
            novembre: false,
            decembre: true,
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

    const handleFraisChange = (e) => {
        setPaiementsSelectionnes((prev) => ({
            ...prev,
            fraisInscription: e.target.checked,
        }));
    };

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

        const moisSelectionnes = Object.entries(paiementsSelectionnes.mois)
            .filter(([_, checked]) => checked)
            .map(([mois]) => mois);

        if (!paiementsSelectionnes.fraisInscription && moisSelectionnes.length === 0) {
            alert("Veuillez sélectionner au moins un type de paiement.");
            return;
        }

        const lignesPaiement = [];
        if (paiementsSelectionnes.fraisInscription) {
            lignesPaiement.push({ type_frais: "Frais d'inscription", montant: formationData?.droit_inscription || 0 });
        }
        moisSelectionnes.forEach((mois) => {
            lignesPaiement.push({ type_frais: `Mensualité ${mois}`, montant: formationData?.mensualite || 0 });
        });

        const data = {
            montant_paiement: montantPaiement,
            inscription_id: Number(inscriptionId),
            mode_paiement_id: Number(modePaiementId),
            lignes_paiement: lignesPaiement,
        };

        try {
            const response = await axios.post("http://localhost:8000/api/v1/paiements", data);
            console.log("Paiement réussi :", response.data);
            alert("Paiement effectué avec succès !");
        } catch (error) {
            console.error("Erreur lors du paiement :", error);
            alert("Erreur lors du paiement, veuillez réessayer.");
        }
    };

    if (loading) {
        return <p className="text-center text-gray-500">Chargement des informations...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Effectuer un Paiement</h2>

            {/* Section Informations sur l'inscription */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Détails de l'inscription</h3>
                <p><strong>Prénom:</strong> {inscriptionData?.prenom}</p>
                <p><strong>Nom:</strong> {inscriptionData?.nom}</p>
                <p><strong>Email:</strong> {inscriptionData?.email}</p>
                <p><strong>Contact:</strong> {inscriptionData?.telephone}</p>
                <p><strong>Adresse:</strong> {inscriptionData?.adresse}</p>
                <p><strong>Date de dépôt:</strong> {new Date(inscriptionData?.created_at).toLocaleDateString()}</p>
                <p><strong>Statut:</strong> {inscriptionData?.status}</p>
                {inscriptionData?.etudiant && (
                    <p><strong>Étudiant:</strong> {inscriptionData.etudiant.nom} {inscriptionData.etudiant.prenom}</p>
                )}
            </div>

            {/* Section Informations sur la formation */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Détails de la formation choisie</h3>
                <p><strong>Nom:</strong> {formationDataPlus?.nom}</p>
                <p><strong>Description:</strong> {formationDataPlus?.description}</p>
            </div>

            {/* Formulaire de paiement */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Mode de Paiement</label>
                    <select
                        value={modePaiementId}
                        onChange={(e) => setModePaiementId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Sélectionner un mode</option>
                        <option value="7">Carte bancaire</option>
                        <option value="7">Virement</option>
                        <option value="7">Mobile Money</option>
                        <option value="7">Espèces</option>
                    </select>
                </div>

                {/* Section des paiements */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium">Sélectionnez les frais à payer :</h3>
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="fraisInscription"
                            checked={paiementsSelectionnes.fraisInscription}
                            onChange={handleFraisChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="text-sm">
                            Frais d'inscription ({formationData?.droit_inscription || 0} F CFA)
                        </label>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium mb-2">Mensualités par mois :</h4>
                        <div className="grid grid-cols-3 gap-2">
                            {Object.keys(paiementsSelectionnes.mois).map((mois) => (
                                <div key={mois} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name={mois}
                                        checked={paiementsSelectionnes.mois[mois]}
                                        onChange={handleMoisChange}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label className="text-sm capitalize">
                                        {mois} ({formationData?.mensualite || 0} F CFA)
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-lg font-semibold text-center bg-blue-50 p-3 rounded-lg">
                    Montant Total à Payer: {montantPaiement} F CFA
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Confirmer le Paiement
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;