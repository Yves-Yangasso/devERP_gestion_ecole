import React from 'react';

const Frais_et_mensualités = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Colonne gauche */}
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="w-1/2">
              <h3 className="text-base font-semibold text-gray-800">Frais Scolarité</h3>
            </div>
            <div className="text-right">
              <p>450 000 FCFA</p>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div className="w-1/2">
              <h3 className="text-base font-semibold text-gray-800">Frais d'Examen</h3>
            </div>
            <div className="text-right">
              <p>0 000 FCFA</p>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div className="w-1/2">
              <h3 className="text-base font-semibold text-gray-800">Frais Dossier</h3>
            </div>
            <div className="text-right">
              <p>50 000 FCFA</p>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div className="w-1/2">
              <h3 className="text-base font-semibold text-gray-800">Frais Soutenance</h3>
            </div>
            <div className="text-right">
              <p>0 000 FCFA</p>
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="w-1/2">
              <h3 className="text-base font-semibold text-gray-800">Frais d'Uniforme</h3>
            </div>
            <div className="text-right">
              <p>60 000 FCFA</p>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div className="w-1/2">
              <h3 className="text-base font-semibold text-gray-800">Frais d'Assurance</h3>
            </div>
            <div className="text-right">
              <p>5 000 FCFA</p>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div className="w-1/2">
              <h3 className="text-base font-semibold text-gray-800">Frais Amicale</h3>
            </div>
            <div className="text-right">
              <p>5 000 FCFA</p>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div className="w-1/2">
              <h3 className="text-base font-semibold text-gray-800">Total Frais Payé</h3>
            </div>
            <div className="text-right">
              <p>570 000 FCFA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frais_et_mensualités;