import React from "react";

const Paiement_Detail_inscription = () => {
  const Paiement_Detail_inscriptions = [
    {
      numero: "ISI5173413",
      nature: "Inscription",
      mois: "Ouverture",
      somme: "125 000 FCFA",
      date: "12/11/2024",
      mode: "Espèces",
      recuPar: "Dr Kara",
      status: "Delivered",
    },
    {
      numero: "ISI5173413",
      nature: "Mensualités",
      mois: "Septembre",
      somme: "50 000 FCFA",
      date: "12/11/2024",
      mode: "Orange Money",
      recuPar: "Dr Kara",
      status: "Delivered",
    },
    {
      numero: "ISI5173413",
      nature: "Mensualités",
      mois: "Octobre",
      somme: "50 000 FCFA",
      date: "12/11/2024",
      mode: "Orange Money",
      recuPar: "Dr Kara",
      status: "Delivered",
    },
    {
      numero: "ISI5173413",
      nature: "Mensualités",
      mois: "Novembre",
      somme: "50 000 FCFA",
      date: "12/11/2024",
      mode: "Orange Money",
      recuPar: "Dr Kara",
      status: "Delivered",
    },
    {
      numero: "ISI5173413",
      nature: "Mensualités",
      mois: "Decembre",
      somme: "50 000 FCFA",
      date: "12/11/2024",
      mode: "Orange Money",
      recuPar: "Dr Kara",
      status: "Delivered",
    },
    {
      numero: "ISI5173413",
      nature: "Mensualités",
      mois: "Janvier",
      somme: "50 000 FCFA",
      date: "12/11/2024",
      mode: "Orange Money",
      recuPar: "Dr Kara",
      status: "Delivered",
    },
  ];

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          {/* En-tête du tableau */}
          <thead>
            <tr className="bg-blue-900 text-white text-left">
              <th className="px-6 py-3">N° Reçu</th>
              <th className="px-6 py-3">Nature</th>
              <th className="px-6 py-3">Mois</th>
              <th className="px-6 py-3">Somme versée</th>
              <th className="px-6 py-3">Date de Paiement_Detail_inscription</th>
              <th className="px-6 py-3">Mode de Paiement_Detail_inscriptions</th>
              <th className="px-6 py-3">Reçu par</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          
          {/* Corps du tableau */}
          <tbody>
            {Paiement_Detail_inscriptions.map((Paiement_Detail_inscription, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4">{Paiement_Detail_inscription.numero}</td>
                <td className="px-6 py-4">{Paiement_Detail_inscription.nature}</td>
                <td className="px-6 py-4">{Paiement_Detail_inscription.mois}</td>
                <td className="px-6 py-4">{Paiement_Detail_inscription.somme}</td>
                <td className="px-6 py-4">{Paiement_Detail_inscription.date}</td>
                <td className="px-6 py-4">{Paiement_Detail_inscription.mode}</td>
                <td className="px-6 py-4">{Paiement_Detail_inscription.recuPar}</td>
                <td className="px-6 py-4">
                  <span className="bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-full">
                    {Paiement_Detail_inscription.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-600 hover:text-gray-800">
                    •••
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Paiement_Detail_inscription;
