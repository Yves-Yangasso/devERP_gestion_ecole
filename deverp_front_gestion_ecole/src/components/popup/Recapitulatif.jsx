import React from 'react';
import { DollarSign, Calendar } from 'lucide-react';
import { useFormContext } from "../../context/FormContext";

const Recapitulatif = () => {
  const { formState } = useFormContext();
  const { student, tuteur, payment } = formState;

  const formatMontant = (montant) => {
    return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA';
  };

  const documentsFournis = tuteur?.documents || [];
  const paiementInfo = payment || {};

  return (
    <div className="w-full max-w-6xl bg-white rounded-lg p-4 space-y-4 shadow-md">

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-6 shadow-lg p-4 rounded-lg">
        {/* Left Column */}
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-2 items-center">
            <span className="text-gray-700">Type d'opérateur</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full shadow-sm text-center">
              {paiementInfo.modePaiement || "Non spécifié"}
            </span>
          </div>
          <div className="grid grid-cols-2 items-center">
            <span className="text-gray-700">Mois Couverts</span>
            <span className="text-right">{paiementInfo.mensualitePaye} mois</span>
          </div>
          <div className="grid grid-cols-2 items-center">
            <span className="text-gray-700">Mois restants</span>
            <span className="text-right">{paiementInfo.mensualiteRestante} mois</span>
          </div>
          <div className="grid grid-cols-2 items-center">
            <span className="text-gray-700">Total payé</span>
            <span className="text-right">{formatMontant(paiementInfo.montantPaye || 0)}</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-2 items-center">
            <span className="text-gray-700">Date</span>
            <span className="text-right">23 Janvier 2023</span>
          </div>
          <div className="grid grid-cols-2 items-start">
            <span className="text-gray-700">Documents fournis</span>
            <div className="flex flex-wrap gap-1">
              {documentsFournis.length > 0 ? (
                documentsFournis.map((doc, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full shadow-sm text-xs">
                    {doc}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 italic">Aucun document fourni</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 items-start">
            <span className="text-gray-700">Documents manquants</span>
            <div className="flex flex-wrap gap-1">
              {documentsFournis.length > 0 ? (
                ["Certificat de Résidence", "Copie CNI/Passeport Légalisée", "Dernier Diplôme", 
                "Certificat de Scolarité", "Bulletins de notes", "2 Photos d'Identité", 
                "Casier Judiciaire"].filter(doc => !documentsFournis.includes(doc))
                .map((doc, index) => (
                  <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded-full shadow-sm text-xs">
                    {doc}
                  </span>
                ))
              ) : (
                <span className="text-red-500 italic">Tous les documents sont manquants</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 items-center">
            <span className="text-gray-700">Reste à payer</span>
            <span className="text-right">150 000 FCFA</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Récapitulatifs */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-md text-sm">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <h3 className="font-medium">Récapitulatifs</h3>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-2 items-center">
              <span>Total à Payer</span>
              <span className="text-blue-600 font-medium text-right">
                {formatMontant(paiementInfo.totalMontant || 0)}
              </span>
            </div>
            <div className="grid grid-cols-2 items-center">
              <span>Avance Versée</span>
              <span className="text-blue-600 font-medium text-right">
                {formatMontant(paiementInfo.montantPaye || 0)}
              </span>
            </div>
            <div className="grid grid-cols-2 items-center">
              <span>Reste à Payer</span>
              <span className="text-blue-600 font-medium text-right">
                {formatMontant(paiementInfo.resteAPayer || 0)}
              </span>
            </div>
          </div>
        </div>

      {/* Information du tuteur */}
      <div className="bg-green-50 p-4 rounded-lg shadow-md text-sm">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <h3 className="font-medium">Informations du tuteur</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-gray-600 text-xs">Nom complet</span>
            <p className="font-medium">{tuteur?.prenom || ""} {tuteur?.nom || ""}</p>
          </div>
          <div>
            <span className="text-gray-600 text-xs">Relation</span>
            <p className="font-medium">{tuteur?.relation || "Non spécifié"}</p>
          </div>
          <div>
            <span className="text-gray-600 text-xs">Téléphone</span>
            <p className="font-medium">{tuteur?.telephone || "Non spécifié"}</p>
          </div>
          <div>
            <span className="text-gray-600 text-xs">Email</span>
            <p className="font-medium">{tuteur?.email || "Non spécifié"}</p>
          </div>
        </div>
      </div>

      

        {/* Calcul Mensualités */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-md text-sm">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4" />
            <h3 className="font-medium">Calcul Mensualités</h3>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="block text-xs text-gray-600">Montant/Mois</span>
              <span className="text-sm font-medium">50 000 FCFA</span>
            </div>
            <div>
              <span className="block text-xs text-gray-600">Durée</span>
              <span className="text-sm font-medium">9 mois</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statut des documents */}
      <div className="bg-yellow-50 p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          <h3 className="font-medium">Statut des documents</h3>
        </div>
        
        <div className="flex items-center gap-3 mt-2">
          <div className="flex-1 bg-gray-200 h-2.5 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-green-500 rounded-full`} 
              style={{ width: `${documentsFournis.length ? (documentsFournis.length / 7) * 100 : 0}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">
            {documentsFournis.length}/7 ({Math.round(documentsFournis.length / 7 * 100)}%)
          </span>
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Documents validés: {documentsFournis.length}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Documents manquants: {7 - documentsFournis.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recapitulatif;