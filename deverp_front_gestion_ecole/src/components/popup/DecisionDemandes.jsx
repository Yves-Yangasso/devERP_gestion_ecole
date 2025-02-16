import { useState } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';

const DecisionDemandes = ({ closePopup, goBack, onSubmit, initialStatus }) => {
  const [decision, setDecision] = useState(initialStatus?.decision || "Accepter");
  const [status, setStatus] = useState(initialStatus?.status || "Terminé");
  const [motif, setMotif] = useState(initialStatus?.motif || "");

  const handleSubmit = () => {
    onSubmit({
      decision,
      status,
      motif
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ArrowLeft className="w-6 h-6 text-gray-600 mr-2 cursor-pointer" onClick={goBack} />
            <h3 className="text-xl font-bold">Décisions</h3>
          </div>
          <button onClick={closePopup} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Statut de décisions</label>
          <select
            className="w-full p-3 border rounded-lg bg-gray-100 cursor-pointer"
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
          >
            <option value="Accepter">Accepter</option>
            <option value="Refuser">Refuser</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Statut du dossier</label>
          <select
            className="w-full p-3 border rounded-lg bg-gray-200 cursor-pointer"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Terminé">Terminé</option>
            <option value="En attente">En attente</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Motif</label>
          <textarea
            className="w-full h-24 p-3 border rounded-lg resize-none"
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            placeholder="Expliquez votre décision..."
          />
        </div>

        <p className="text-sm text-gray-600">
          En cliquant sur "Valider", je consens avoir bien vérifié tous les documents requis et avoir donné mon approbation.
        </p>

        <div className="mt-4">
          <button 
            onClick={handleSubmit}
            className="bg-blue-900 text-white w-full py-3 rounded-lg flex items-center justify-center hover:bg-blue-950 transition"
          >
            <FileText className="w-5 h-5 mr-2" /> Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default DecisionDemandes;