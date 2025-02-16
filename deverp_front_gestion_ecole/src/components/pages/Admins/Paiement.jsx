import React, { useState } from "react";
import PopupLayout from "../../formulaire/PopupLayout";

const Paiement = () => {
  const tabs = [
    "Etudiants",
    "Frais & mensualités",
    "Paiements",
    "Recettes constatés",
  ];

  // État pour le suivi des paiements
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

  // Gestion du clic sur les cases à cocher
  const togglePaiement = (index) => {
    setPaiements((prevPaiements) =>
      prevPaiements.map((paiement, i) =>
        i === index ? { ...paiement, payé: !paiement.payé } : paiement
      )
    );
  };

  return (
    <PopupLayout
      title="Ajouter une nouvelle inscription"
      activeTab={3}
      tabs={tabs}
      onClose={() => console.log("Fermer")}
      onPrevClick={() => console.log("Précédent")}
      onNextClick={() => console.log("Suivant")}
      prevText="Précédent"
      nextText="Suivant"
      buttonType="button"
    >
      {/* Contenu du popup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {/* Section Mode de paiement */}
        <div className="bg-white p-4 rounded-lg shadow h-96 overflow-auto">
          <h2 className="text-lg font-bold mb-4">Mode de paiement</h2>
          <ul className="space-y-3">
            <li className="flex items-center border rounded-lg p-3">
              <img
                src="https://via.placeholder.com/40"
                alt="Espèces"
                className="w-10 h-10 mr-3"
              />
              <div>
                <h3 className="font-medium">Espèces</h3>
                <p className="text-sm text-gray-500">Paiement au bureau</p>
              </div>
            </li>
            <li className="flex items-center border rounded-lg p-3">
              <img
                src="https://via.placeholder.com/40"
                alt="Carte Bancaire"
                className="w-10 h-10 mr-3"
              />
              <div>
                <h3 className="font-medium">Carte Bancaire</h3>
                <p className="text-sm text-gray-500">Visa, Mastercard</p>
              </div>
            </li>
            <li className="flex items-center border rounded-lg p-3">
              <img
                src="https://via.placeholder.com/40"
                alt="Orange Money"
                className="w-10 h-10 mr-3"
              />
              <div>
                <h3 className="font-medium">Orange Money</h3>
                <p className="text-sm text-gray-500">Paiement Mobile</p>
              </div>
            </li>
            <li className="flex items-center border rounded-lg p-3">
              <img
                src="https://via.placeholder.com/40"
                alt="Wave"
                className="w-10 h-10 mr-3"
              />
              <div>
                <h3 className="font-medium">Wave</h3>
                <p className="text-sm text-gray-500">Paiement Mobile</p>
              </div>
            </li>
            <li className="flex items-center border rounded-lg p-3">
              <img
                src="https://via.placeholder.com/40"
                alt="Free Money"
                className="w-10 h-10 mr-3"
              />
              <div>
                <h3 className="font-medium">Free Money</h3>
                <p className="text-sm text-gray-500">Paiement Mobile</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Section Suivi des paiements */}
        <div className="bg-blue-50 p-4 rounded-lg shadow h-96 overflow-auto">
          <h2 className="text-lg font-bold mb-4">Suivi des paiements</h2>
          <ul className="space-y-3">
            {paiements.map((paiement, index) => (
              <li
                key={index}
                className="flex justify-between items-center border rounded-lg p-3 bg-white"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={paiement.payé}
                    onChange={() => togglePaiement(index)}
                    className="form-checkbox h-5 w-5 text-green-500 mr-3"
                  />
                  <span>{paiement.mois}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">{paiement.montant}</span>
                  <span
                    className={`w-3 h-3 rounded-full ${
                      paiement.payé ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PopupLayout>
  );
};

export default Paiement;