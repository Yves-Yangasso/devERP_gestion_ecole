import React from 'react';
import InputSaisie from './InputSaisie';
import SimpleLabel from '../label/SimpleLabel';

const InputField = ({ label, name, type = 'text', placeholder, value, className = '' }) => {
  return (
    <div className="flex flex-col gap-2">
      <SimpleLabel text={label} className="text-gray-700 font-medium" />
      <InputSaisie
        className={`
          w-full px-4 py-2.5 rounded-lg
          border border-gray-300
          bg-white
          placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
          ${className}
        `}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
      />
    </div>
  );
};

export default InputField;