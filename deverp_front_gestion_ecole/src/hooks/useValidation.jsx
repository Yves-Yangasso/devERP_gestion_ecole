import { useState, useCallback } from "react";

const useValidation = (validate, onChange) => {
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const handleValidation = useCallback((e) => {
    const value = e.target.value;
    
    if (validate) {
      const validationError = validate(value);
      setError(validationError);
      setIsValid(!validationError);
    }

    if (onChange) {
      onChange(e);
    }
  }, [validate, onChange]);

  return {
    error,
    isValid,
    handleValidation
  };
};

export default useValidation;