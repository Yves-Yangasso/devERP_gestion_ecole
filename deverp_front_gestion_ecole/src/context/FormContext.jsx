import { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formState, setFormState] = useState({
    student: {},
    tutors: [],
    documents: {}
  });

  const updateStudent = (data) => {
    setFormState(prev => ({ ...prev, student: { ...prev.student, ...data }}));
  };

  const updateTutors = (tutors) => {
    setFormState(prev => ({ ...prev, tutors }));
  };

  const updateDocuments = (documents) => {
    setFormState(prev => ({ ...prev, documents }));
  };

  const resetForm = () => {
    setFormState({ student: {}, tutors: [], documents: {} });
  };

  return (
    <FormContext.Provider value={{ formState, updateStudent, updateTutors, updateDocuments, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);