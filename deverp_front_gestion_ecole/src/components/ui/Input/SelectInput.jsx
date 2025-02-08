import React from 'react';
import SimpleLabel from '../label/SimpleLabel';
import useValidation from '../../../hooks/useValidation';
import clsx from "clsx";

const SelectInput = ({ label, name, options, validate, className = '', ...props }) => {
  const { error, handleValidation } = useValidation(validate);

  return (
    <div className="flex flex-col gap-1">
      <SimpleLabel text={label} className="text-gray-700 font-medium" />
      <select
        id={name}
        name={name}
        className={clsx(
          "w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200",
          className
        )}
        onChange={handleValidation}
        {...props}
      >
        {/* Option par défaut comme placeholder */}
        <option value="" disabled selected>Veuillez sélectionner</option>

        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SelectInput;
