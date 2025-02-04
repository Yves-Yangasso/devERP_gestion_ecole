import React from 'react';
import SimpleLabel from '../label/SimpleLabel';

const SelectInput = ({ label, name, options, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <SimpleLabel text={label} className="text-gray-700 font-medium" />
      <select
        id={name}
        name={name}
        className={`
          w-full px-4 py-2.5 rounded-lg
          border border-gray-300
          bg-white
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-all duration-200
          ${className}
        `}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
