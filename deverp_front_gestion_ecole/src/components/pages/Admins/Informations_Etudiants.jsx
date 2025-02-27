import React from 'react';

const Informations_Etudiants = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 shadow-md p-3">
        <img src="moi.png" alt="Profile" className="rounded-full w-10 h-10 shadow-sm" />
        <div>
          <h2 className="text-lg font-medium">Ousseynou Diedhiou</h2>
          <p className="text-gray-500 text-sm">ISI - OUDI2001</p>
        </div>
      </div>
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 shadow-md">
        {/* Colonne gauche */}
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="w-1/3">
              <h3 className="text-base font-semibold text-gray-800">Niveau</h3>
            </div>
            <div className="w-2/3">
              <div className="bg-indigo-200 text-indigo-800 px-4 py-1 rounded-full inline-block">
                Licence 2
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-1/3">
              <h3 className="text-base font-semibold text-gray-800">Classes</h3>
            </div>
            <div className="w-2/3">
              <p>B2</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-1/3">
              <h3 className="text-base font-semibold text-gray-800">Departement</h3>
            </div>
            <div className="w-2/3">
              <p>Informatiques</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-1/3">
              <h3 className="text-base font-semibold text-gray-800">Modules</h3>
            </div>
            <div className="w-2/3">
              <p>Developpement web et mobile</p>
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="w-1/2">
              <h3 className="text-base font-semibold text-gray-800">Date et Lieu de naissance</h3>
            </div>
            <div className="w-1/2">
              <p>24 - 05 - 2001 à Pikine</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-1/2">
              <h3 className="text-base font-semibold text-gray-800">Année en cours</h3>
            </div>
            <div className="w-1/2">
              <p>2024 - 2025</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-1/2">
              <h3 className="text-base font-semibold text-gray-800">Email Professionnel</h3>
            </div>
            <div className="w-1/2">
              <div className="bg-orange-200 text-orange-800 px-4 py-1 rounded-full inline-block">
                diedhiouousseynou53@gmail.com
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-1/2">
              <h3 className="text-base font-semibold text-gray-800">Telephone</h3>
            </div>
            <div className="w-1/2">
              <p>+221 78 530 48 69</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Informations_Etudiants;