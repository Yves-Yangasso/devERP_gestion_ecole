import React, { useState, useEffect } from "react";
import { useFormContext } from "../../context/FormContext";

const Paiement = () => {
  const { formState, updatePayment } = useFormContext();
  const savedPayment = formState.payment || {};

  const [paiements, setPaiements] = useState(
    savedPayment.detailsPaiements || [
      { mois: "Octobre", montant: 50000, payé: true },
      { mois: "Novembre", montant: 50000, payé: true },
      { mois: "Décembre", montant: 50000, payé: true },
      { mois: "Janvier", montant: 50000, payé: false },
      { mois: "Février", montant: 50000, payé: false },
      { mois: "Mars", montant: 50000, payé: false },
      { mois: "Avril", montant: 50000, payé: false },
      { mois: "Mai", montant: 50000, payé: false },
      { mois: "Juin", montant: 50000, payé: false },
    ]
  );

  const [frais, setFrais] = useState(
    savedPayment.detailsFrais || [
      { label: "Frais Scolarité", montant: 450000, payé: true },
      { label: "Frais d'Examen", montant: 0, payé: false },
      { label: "Frais Dossier", montant: 50000, payé: true },
      { label: "Frais Soutenance", montant: 0, payé: false },
      { label: "Frais d'Uniforme", montant: 60000, payé: true },
      { label: "Frais d'Assurance", montant: 5000, payé: true },
      { label: "Frais Amicale", montant: 5000, payé: true },
    ]
  );

  const [selectedMode, setSelectedMode] = useState(savedPayment.modePaiement || "");

  useEffect(() => {
    const totalMontant = frais.reduce((acc, item) => acc + item.montant, 0);
    const montantPaye = frais.reduce((acc, item) => item.payé ? acc + item.montant : acc, 0);
    const mensualitesPaye = paiements.filter(p => p.payé).length;
    const mensualitesRestantes = paiements.length - mensualitesPaye;

    updatePayment({
      totalMontant,
      montantPaye,
      resteAPayer: totalMontant - montantPaye,
      mensualitePaye: mensualitesPaye,
      mensualiteRestante: mensualitesRestantes,
      modePaiement: selectedMode,
      detailsPaiements: paiements,
      detailsFrais: frais
    });
  }, [paiements, frais, selectedMode]);

  const handleModeSelection = (mode) => {
    setSelectedMode(mode);
  };

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
          {[
            { name: "Espèces", img: "img_espece.jpeg" },
            { name: "Carte Bancaire", img: "img_cb.jpeg" },
            { name: "Orange Money", img: "img_om.png" },
            { name: "Wave", img: "img_wave.webp" },
            { name: "Free Money", img: "img_free_money.png" },
            { name: "Yas", img: "img_free_money.png" },
          ].map((mode) => (
            <li 
              key={mode.name}
              onClick={() => handleModeSelection(mode.name)}
              className={`flex items-center border rounded-lg p-2 cursor-pointer ${
                selectedMode === mode.name ? 'border-blue-500 bg-blue-50' : ''
              }`}
            >
              <img src={mode.img} alt={mode.name} className="w-8 h-8 mr-2" />
              <div>
                <h3 className="font-medium">{mode.name}</h3>
                <p className="text-xs text-gray-500">
                  {mode.name === "Espèces" ? "Paiement au bureau" :
                   mode.name === "Carte Bancaire" ? "Visa, Mastercard" :
                   "Paiement Mobile"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Paiement;