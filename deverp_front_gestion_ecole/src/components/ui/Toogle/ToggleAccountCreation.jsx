import React from 'react';

const ToggleAccountCreation = ({ checked, onChange }) => (
  <div className="mb-4 flex items-center">
    <span className="mr-2">Créer un compte :</span>
    <label className="relative inline-block w-[60px] h-[34px] bg-gray-300 rounded-full">
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <div className={`absolute left-1 top-1 w-6 h-6 transform ${checked ? 'translate-x-6 bg-blue-500' : 'translate-x-0 bg-white'} rounded-full`} />
    </label>
    <span className="ml-2 text-gray-700 font-semibold">{checked ? 'Oui' : 'Non'}</span>
  </div>
);

export default ToggleAccountCreation;
