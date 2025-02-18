import React from "react";

const RecetteConstaté = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6 shadow-lg p-4 rounded-md">
        <img
          src="moi.png"
          alt="Profil utilisateur"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h1 className="text-xl font-bold text-gray-800">Mariama NDIAYE</h1>
          <p className="text-gray-600">ISI - MAND2001</p>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-lg">
        {/* Colonne de gauche */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Type d’opérateur</span>
            <span className="text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full text-sm">
              Orange Money
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Mois couverts</span>
            <span className="text-gray-800">3 à compter de janvier</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Mois restant</span>
            <span className="text-gray-800">3 à payer début Avril</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Total donné</span>
            <span className="text-gray-800">150 000 FCFA</span>
          </div>
        </div>

        {/* Colonne de droite */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Date</span>
            <span className="text-gray-800">23 Janvier 2023</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-600">Documents fournis</span>
            <div className="flex space-x-1">
              <span className="text-purple-600 bg-purple-100 p-2 rounded-full text-sm">
                CNI/Passport
              </span>
              <span className="text-purple-600 bg-purple-100 p-2 rounded-full text-sm">
                Diplôme
              </span>
              <span className="text-purple-600 bg-purple-100 p-2 rounded-full text-sm">
                Certificat
              </span>
              <span className="text-purple-600 bg-purple-100 p-2 rounded-full text-sm">
                Photo
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Frais fournis</span>
            <span className="text-orange-600 bg-orange-100 px-3 py-1 rounded-full text-sm">
              Scolarité, dossier, uniform, assurance, amicale
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Reste à payer</span>
            <span className="text-gray-800">150 000 FCFA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecetteConstaté;
