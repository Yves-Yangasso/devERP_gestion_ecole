import { useState } from "react";

const useValidation = (validate, onChange) => {
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const handleValidation = (e) => {
    const inputValue = e.target.value;

    if (validate) {
      const errorMessage = validate(inputValue);
      setError(errorMessage);
      setIsValid(!errorMessage);
    }

    if (onChange) onChange(e);
  };

  return { error, isValid, handleValidation };
};

export default useValidation;
