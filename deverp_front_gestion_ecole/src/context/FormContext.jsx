import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formState, setFormState] = useState({
    student: {},
    tuteur: {},
    payment: {},
    errors: {}
  });

  const updateStudent = (data) => {
    setFormState(prev => ({
      ...prev,
      student: {
        ...prev.student,
        ...data
      },
      errors: {
        ...prev.errors,
        ...data.errors
      }
    }));
  };

  const updateTuteur = (data) => {
    setFormState(prev => ({
      ...prev,
      tuteur: {
        ...prev.tuteur,
        ...data
      },
      errors: {
        ...prev.errors,
        tuteur: {
          ...prev.errors?.tuteur,
          ...data.errors
        }
      }
    }));
  };

  const updatePayment = (data) => {
    setFormState(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        ...data
      }
    }));
  };

  return (
    <FormContext.Provider value={{ formState, updateStudent, updateTuteur, updatePayment }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);

export default FormContext;