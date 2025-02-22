import React from 'react';
import { DollarSign, Calendar } from 'lucide-react';

const PaymentDetails = () => {
  return (
    <div className="w-full max-w-6xl bg-white rounded-lg p-4 space-y-4 shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 shadow-md p-3">
        <img src="moi.png" alt="Profile" className="rounded-full w-10 h-10 shadow-sm" />
        <div>
          <h2 className="text-lg font-medium">Ousseynou Diedhiou</h2>
          <p className="text-gray-500 text-sm">ISI - OUDI2001</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-6 shadow-lg p-4 rounded-lg">
        {/* Left Column */}
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-2 items-center">
            <span className="text-gray-700">Type d'opérateur</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full shadow-sm text-center">Orange Money</span>
          </div>
          <div className="grid grid-cols-2 items-center">
            <span className="text-gray-700">Mois Couvers</span>
            <span className="text-right">3 à compter de janvier</span>
          </div>
          <div className="grid grid-cols-2 items-center">
            <span className="text-gray-700">Mois restant</span>
            <span className="text-right">3 à payer début Avril</span>
          </div>
          <div className="grid grid-cols-2 items-center">
            <span className="text-gray-700">Total donnée</span>
            <span className="text-right">150 000 FCFA</span>
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
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full shadow-sm">CNI/Passeport</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full shadow-sm">Diplôme</span>
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full shadow-sm">Photo</span>
            </div>
          </div>
          <div className="grid grid-cols-2 items-start">
            <span className="text-gray-700">Frais fournis</span>
            <div className="flex flex-wrap gap-1">
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full shadow-sm">Scolarité, dossier, uniform</span>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center">
            <span className="text-gray-700">Reste à payer</span>
            <span className="text-right">150 000 FCFA</span>
          </div>
        </div>
      </div>

      {/* Bottom Sections */}
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
              <span className="text-blue-600 font-medium text-right">575 000 FCFA</span>
            </div>
            <div className="grid grid-cols-2 items-center">
              <span>Avance Versée</span>
              <span className="text-blue-600 font-medium text-right">125 000 FCFA</span>
            </div>
            <div className="grid grid-cols-2 items-center">
              <span>Reste à Payer</span>
              <span className="text-blue-600 font-medium text-right">450 000 FCFA</span>
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
    </div>
  );
};

export default PaymentDetails;
