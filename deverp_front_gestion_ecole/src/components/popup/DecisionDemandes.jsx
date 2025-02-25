import { useState } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import  useCrud  from "../../hooks/useCrudAxios";
import AlertService from "../../services/notifications/AlertService";

const DecisionDemande = ({ closePopup, goBack, initialStatus, nom_admin, setCheckedDocs, decisionData }) => {
  const { create: traiterDossierEtDocuments, loading: loadingTraitement } = useCrud("dossiers/traitements");
  const [statut, setStatut] = useState(initialStatus?.decision || "valide");
  const [commentaire, setCommentaire] = useState(initialStatus?.motif || "");

  const handleSubmit = async () => {
      try {
        const dossierId = decisionData?.dossierId;
        const checkedDocument = decisionData?.checkedDocuments;
        if (!dossierId) {
            AlertService.error("ID du dossier manquant !");
            return;
        }
        
          const dataToSend = {
              id: dossierId,
              statut,
              commentaire,
              documents: Object.entries(checkedDocument).map(([id, doc]) => ({
                  id: doc.id,
                  statut: doc.statut,
              }))
          };        
          console.log("Données envoyées :", dataToSend);

          await traiterDossierEtDocuments(dataToSend);

          // Nettoyer les documents cochés après succès
          setCheckedDocs({});
          closePopup();
          AlertService.success("Dossier traite avec success");
      } catch (error) {
        AlertService.error("Erreur lors du traitement du dossier :", error);
      }
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
                  <label className="block font-semibold text-gray-700">Statut du dossier</label>
                  <select
                      className="w-full p-3 border rounded-lg bg-gray-100 cursor-pointer"
                      value={statut}
                      onChange={(e) => setStatut(e.target.value)}
                  >
                      <option value="valide">Valide</option>
                      <option value="invalide">Invalide</option>
                  </select>
              </div>

              <div className="mb-4">
                  <label className="block font-semibold text-gray-700">Admin en charge du dossier</label>
                  <input type="text" value={nom_admin} readOnly className="w-full p-3 border rounded-lg bg-gray-100" />
              </div>

              <div className="mb-4">
                  <label className="block font-semibold text-gray-700">Commentaire</label>
                  <textarea
                      className="w-full h-24 p-3 border rounded-lg resize-none"
                      value={commentaire}
                      onChange={(e) => setCommentaire(e.target.value)}
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
                      disabled={loadingTraitement}
                  >
                      {loadingTraitement ? "Envoi en cours..." : <>
                        <FileText className="w-5 h-5 mr-2" /> Valider
                      </>}
                  </button>
              </div>
          </div>
      </div>
  );
};

export default DecisionDemande;



