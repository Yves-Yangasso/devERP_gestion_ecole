import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PaymentForm = () => {
    const location = useLocation();
    const [montantPaiement, setMontantPaiement] = useState(0);
    const [inscriptionId, setInscriptionId] = useState("");
    const [modePaiementId, setModePaiementId] = useState("");
    const [lignesPaiement, setLignesPaiement] = useState([
        { type_frais: "Frais d'inscription", montant: 0 },
        { type_frais: "Frais de scolarité", montant: 0 }
    ]);

    useEffect(() => {
        if (location.state && location.state.id) {
            setInscriptionId(location.state.id);
        }
    }, [location.state]);

    const handleChange = (index, value) => {
        const newLignes = [...lignesPaiement];
        newLignes[index].montant = Number(value);
        setLignesPaiement(newLignes);
        setMontantPaiement(newLignes.reduce((acc, item) => acc + item.montant, 0));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            montant_paiement: montantPaiement,
            inscription_id: Number(inscriptionId),
            mode_paiement_id: Number(modePaiementId),
            lignes_paiement: lignesPaiement
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

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Effectuer un Paiement</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">ID Inscription</label>
                    <input 
                        type="number"
                        value={inscriptionId}
                        disabled
                        className="w-full px-3 py-2 border rounded-lg bg-gray-200"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Mode de Paiement</label>
                    <select 
                        value={modePaiementId}
                        onChange={(e) => setModePaiementId(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    >
                        <option value="">Sélectionner un mode</option>
                        <option value="1">Carte bancaire</option>
                        <option value="2">Virement</option>
                        <option value="3">Mobile Money</option>
                        <option value="7">Espèces</option>
                    </select>
                </div>

                {lignesPaiement.map((ligne, index) => (
                    <div key={index}>
                        <label className="block text-sm font-medium">{ligne.type_frais}</label>
                        <input 
                            type="number"
                            value={ligne.montant}
                            onChange={(e) => handleChange(index, e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                ))}

                <div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
                        Payer {montantPaiement} F CFA
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentForm;