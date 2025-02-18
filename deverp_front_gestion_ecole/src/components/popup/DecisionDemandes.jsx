import { useState } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';

const DecisionDemandes = ({ closePopup, goBack, onSubmit, initialStatus, nom_admin, checkedDocuments }) => {
  const [decision, setDecision] = useState(initialStatus?.decision || "Accepter");
  const [status, setStatus] = useState(initialStatus?.status || "Terminé");
  const [motif, setMotif] = useState(initialStatus?.motif || "");

  const handleSubmit = () => {
    onSubmit({
      decision,
      status,
      motif,
      checkedDocuments // Envoi des documents avec leurs statuts
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
          <label className="block font-semibold text-gray-700">Admin en charge du dossier</label>
          <input type="text" value={nom_admin} readOnly className="w-full p-3 border rounded-lg bg-gray-100" />
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

        {/* Affichage des documents et statuts */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Documents Vérifiés</h4>
          <ul className="bg-gray-50 p-3 rounded-lg border">
            {checkedDocuments?.map((doc) => (
              <li key={doc.id} className="flex justify-between border-b last:border-b-0 py-2">
                <span>{doc.type}</span>
                <span className={doc.status === "Valide" ? "text-green-600" : "text-red-600"}>{doc.status}</span>
              </li>
            ))}
          </ul>
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
