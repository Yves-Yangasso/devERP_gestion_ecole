import React from 'react';

const Informations_Etudiants = () => {
  return (
    <div className="p-4">
      {/* Student info header */}
      <div className="flex mt-6 items-center shadow-md gap-4 p-4 border-b pb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img src="moi.png" alt="Student" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-lg font-medium">Ousseynou Diedhiou</h2>
          <p className="text-gray-600 text-sm">ISI - OUDI2001</p>
        </div>
      </div>

      {/* Student details */}
      <div className="grid grid-cols-2 gap-4 mt-6 shadow-md p-6">
        {/* Left column */}
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="w-1/3">
              <p className="text-sm text-gray-600">Niveau</p>
            </div>
            <div className="w-2/3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Licence 2
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3">
              <p className="text-sm text-gray-600">Classes</p>
            </div>
            <div className="w-2/3">
              <p className="text-sm">B2</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3">
              <p className="text-sm text-gray-600">Departement</p>
            </div>
            <div className="w-2/3">
              <p className="text-sm">Informatiques</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3">
              <p className="text-sm text-gray-600">Modules</p>
            </div>
            <div className="w-2/3">
              <p className="text-sm">Developpement web et mobile</p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="w-1/2">
              <p className="text-sm text-gray-600">Date et Lieu de naissance</p>
            </div>
            <div className="w-1/2">
              <p className="text-sm">24 - 05 - 2001 à Pikine</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-1/2">
              <p className="text-sm text-gray-600">Année en cours</p>
            </div>
            <div className="w-1/2">
              <p className="text-sm">2024 - 2025</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-1/2">
              <p className="text-sm text-gray-600">Email Professionnel</p>
            </div>
            <div className="w-1/2">
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm truncate block max-w-full">
                diedhiouousseynou53@gmail.com
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-1/2">
              <p className="text-sm text-gray-600">Telephone</p>
            </div>
            <div className="w-1/2">
              <p className="text-sm">+221 78 530 48 69</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Informations_Etudiants;