import React, { useState, useEffect } from 'react';

const Frais_Mensualites = () => {
  const [fees, setFees] = useState({
    scolarite: 450000,
    examen: 0,
    dossier: 50000,
    soutenance: 0,
    uniforme: 60000,
    assurance: 5000,
    amicale: 5000
  });

  const [advance, setAdvance] = useState(125000);
  const [monthlyAmount] = useState(50000);
  const [duration] = useState(9);

  // Calculer le total
  const total = Object.values(fees).reduce((sum, fee) => sum + fee, 0);
  const remaining = total - advance;

  return (
    <div className="p-6 grid grid-cols-2 gap-6">
      {/* Colonne de gauche - Détails des Frais */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-blue-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </span>
          <h2 className="text-xl font-semibold">Détails des Frais</h2>
        </div>

        {Object.entries(fees).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center py-2 px-4 bg-blue-50 rounded-lg">
            <span className="font-medium">{`Frais ${key.charAt(0).toUpperCase() + key.slice(1)}`}</span>
            <div className="flex items-center">
              <input
                type="number"
                value={value}
                onChange={(e) => setFees({ ...fees, [key]: Number(e.target.value) })}
                className="w-24 text-right p-2 border rounded mr-2"
              />
              <span className="font-medium">FCFA</span>
            </div>
          </div>
        ))}
      </div>

      {/* Colonne de droite - Récapitulatifs et Mensualités */}
      <div className="space-y-6">
        {/* Récapitulatifs */}
        <div className="bg-blue-50 p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </span>
            <h2 className="text-xl font-semibold">Récapitulatifs</h2>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center p-4 bg-white rounded-lg">
              <span className="font-medium">Total à Payer</span>
              <span className="text-blue-600 font-bold">{total.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white rounded-lg">
              <span className="font-medium">Avance Vercée</span>
              <span className="text-blue-600 font-bold">{total.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white rounded-lg">
              <span className="font-medium">Reste à Payer</span>
              <span className="text-blue-600 font-bold">{remaining.toLocaleString()} FCFA</span>
            </div>
          </div>
        </div>

        {/* Calcul Mensualités */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>
            <h2 className="text-xl font-semibold">Calcul Mensualités</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-sm text-gray-600">Montant/Mois</div>
              <div className="font-bold text-lg">{monthlyAmount.toLocaleString()} FCFA</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-sm text-gray-600">Durée</div>
              <div className="font-bold text-lg">{duration} mois</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frais_Mensualites;