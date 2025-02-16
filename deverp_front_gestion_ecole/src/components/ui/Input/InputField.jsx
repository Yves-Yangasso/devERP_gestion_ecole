import React from "react";
import InputSaisie from "./InputSaisie";
import SimpleLabel from "../label/SimpleLabel";
import useValidation from "../../../hooks/useValidation";
import clsx from "clsx";
import FileInput from "./FileInput";

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  validate, // Validation à passer en prop
  className,
  onChange,
  accept,
  ...rest
}) => {
  const { error, isValid, handleValidation } = useValidation(validate, onChange);

  const inputClass = clsx(
    "w-full px-4 py-2.5 rounded-lg focus:outline-none color-black border bg-white placeholder-gray-400 transition-all duration-200",
    {
      "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent": !error && !isValid,
      "border-red-500 focus:ring-2 focus:ring-red-500": error,
      "border-green-500 focus:ring-2 focus:ring-green-500": isValid,
    },
    className
  );

  const handleInputChange = (e) => {
    handleValidation(e); // Applique la validation à chaque changement
    if (onChange) onChange(e); // Propager le changement si une fonction onChange est passée
  };

  return (
    <div className="flex flex-col gap-1">
      {label && <SimpleLabel text={label} className="text-gray-700 font-medium" />}
      
      {type === "file" ? (
        <FileInput
          label={label}
          name={name}
          accept={accept}
          onChange={handleInputChange}
          className={className}
          {...rest}
        />
      ) : (
        <InputSaisie
          className={inputClass}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleInputChange}
          {...rest}
        />
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};


export default InputField;