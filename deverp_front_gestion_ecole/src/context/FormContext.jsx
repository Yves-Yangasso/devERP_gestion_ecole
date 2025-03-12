import React, { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formState, setFormState] = useState({
    student: {},
    tutors: [],
    payment: {},
    documents: {}, // ✅ Ajout de l'initialisation des documents
    errors: {}
  });

  // ✅ Mise à jour des informations de l'étudiant
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

  // ✅ Mise à jour de plusieurs tuteurs
  const updateTutors = (newTutors) => {
    setFormState(prev => ({
      ...prev,
      tutors: newTutors.length > 0 ? newTutors : prev.tutors,
      errors: {
        ...prev.errors,
        tutors: newTutors.length > 0 ? newTutors.map(() => ({})) : prev.errors?.tutors
      }
    }));
  };

  // ✅ Mise à jour des paiements
  const updatePayment = (data) => {
    setFormState(prev => ({
      ...prev,
      payment: {
        ...prev.payment,
        ...data
      }
    }));
  };

  // ✅ Mise à jour des documents
  const updateDocuments = (newDocuments) => {
    setFormState(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        ...newDocuments
      }
    }));
  };

  return (
    <FormContext.Provider value={{ formState, updateStudent, updateTutors, updatePayment, updateDocuments }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);

export default FormContext;
