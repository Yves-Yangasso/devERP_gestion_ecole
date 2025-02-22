import React, { useState } from "react";

const Paiement = () => {
  const [paiements, setPaiements] = useState([
    { mois: "Octobre", montant: "50 000 FCFA", payé: true },
    { mois: "Novembre", montant: "50 000 FCFA", payé: true },
    { mois: "Décembre", montant: "50 000 FCFA", payé: true },
    { mois: "Janvier", montant: "50 000 FCFA", payé: false },
    { mois: "Février", montant: "50 000 FCFA", payé: false },
    { mois: "Mars", montant: "50 000 FCFA", payé: false },
    { mois: "Avril", montant: "50 000 FCFA", payé: false },
    { mois: "Mai", montant: "50 000 FCFA", payé: false },
    { mois: "Juin", montant: "50 000 FCFA", payé: false },
  ]);

  const [frais, setFrais] = useState([
    { label: "Frais Scolarité", montant: "450 000 FCFA", payé: true },
    { label: "Frais d'Examen", montant: "0 000 FCFA", payé: false },
    { label: "Frais Dossier", montant: "50 000 FCFA", payé: true },
    { label: "Frais Soutenance", montant: "0 000 FCFA", payé: false },
    { label: "Frais d'Uniforme", montant: "60 000 FCFA", payé: true },
    { label: "Frais d'Assurance", montant: "5 000 FCFA", payé: true },
    { label: "Frais Amicale", montant: "5 000 FCFA", payé: true },
  ]);

  const togglePaiement = (index) => {
    setPaiements((prev) =>
      prev.map((p, i) => (i === index ? { ...p, payé: !p.payé } : p))
    );
  };

  const toggleFrais = (index) => {
    setFrais((prev) =>
      prev.map((f, i) => (i === index ? { ...f, payé: !f.payé } : f))
    );
  };

  return (
    <div className="p-3 space-y-3">
      <div className="grid grid-cols-2 gap-4">
        {/* Section Suivi des paiements */}
        <div className="bg-blue-50 p-3 rounded-xl">
          <h2 className="text-lg font-semibold mb-2">Suivie des paiements</h2>
          <div className="space-y-1 max-h-[300px] overflow-auto">
            {paiements.map((paiement, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white rounded-lg p-2 border"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={paiement.payé}
                    onChange={() => togglePaiement(index)}
                    className="w-4 h-4"
                  />
                  <span>{paiement.mois}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{paiement.montant}</span>
                  <div className={`w-2 h-2 rounded-full ${paiement.payé ? "bg-green-500" : "bg-gray-300"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Détails des Frais */}
        <div className="bg-blue-50 p-3 rounded-xl">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Détails des Frais
          </h2>
          <div className="space-y-1 max-h-[300px] overflow-auto">
            {frais.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white rounded-lg p-2"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.payé}
                    onChange={() => toggleFrais(index)}
                    className="w-4 h-4"
                  />
                  <span>{item.label}</span>
                </div>
                <span>{item.montant}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Mode de paiement */}
      <div className="bg-white p-3 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Mode de paiement</h2>
        <ul className="grid grid-cols-3 gap-3">
          <li className="flex items-center border rounded-lg p-2">
            <img src="img_espece.jpeg" alt="Espèces" className="w-8 h-8 mr-2" />
            <div>
              <h3 className="font-medium">Espèces</h3>
              <p className="text-xs text-gray-500">Paiement au bureau</p>
            </div>
          </li>
          <li className="flex items-center border rounded-lg p-2">
            <img src="img_cb.jpeg" alt="Carte Bancaire" className="w-8 h-8 mr-2" />
            <div>
              <h3 className="font-medium">Carte Bancaire</h3>
              <p className="text-xs text-gray-500">Visa, Mastercard</p>
            </div>
          </li>
          <li className="flex items-center border rounded-lg p-2">
            <img src="img_om.png" alt="Orange Money" className="w-8 h-8 mr-2" />
            <div>
              <h3 className="font-medium">Orange Money</h3>
              <p className="text-xs text-gray-500">Paiement Mobile</p>
            </div>
          </li>
          <li className="flex items-center border rounded-lg p-2">
            <img src="img_wave.webp" alt="Wave" className="w-8 h-8 mr-2" />
            <div>
              <h3 className="font-medium">Wave</h3>
              <p className="text-xs text-gray-500">Paiement Mobile</p>
            </div>
          </li>
          <li className="flex items-center border rounded-lg p-2">
            <img src="img_free_money.png" alt="Free Money" className="w-8 h-8 mr-2" />
            <div>
              <h3 className="font-medium">Free Money</h3>
              <p className="text-xs text-gray-500">Paiement Mobile</p>
            </div>
          </li>
          <li className="flex items-center border rounded-lg p-2">
            <img src="img_free_money.png" alt="Free Money" className="w-8 h-8 mr-2" />
            <div>
              <h3 className="font-medium">Yas</h3>
              <p className="text-xs text-gray-500">Paiement Mobile</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Paiement;