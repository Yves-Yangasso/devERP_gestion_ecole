import { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formState, setFormState] = useState({
    student: {
      nom: "",
      prenom: "",
      date: "",
      lieu: "",
      adresse: "",
      email: "",
      telephone: "",
      nationalite: "",
      universite: "",
      niveau: "",
      formation: "",
      dernierDiplome: "",
      specialites: [],
    },
    tutors: [],
    documents: {}
  });

  const updateStudent = (data) => {
    setFormState(prev => ({ ...prev, student: { ...prev.student, ...data } }));
  };

  const updateTutors = (tutors) => {
    setFormState(prev => ({ ...prev, tutors }));
  };

  const updateDocuments = (documents) => {
    setFormState(prev => ({ ...prev, documents }));
  };

  const resetForm = () => {
    setFormState({
      student: {
        nom: "",
        prenom: "",
        date: "",
        lieu: "",
        adresse: "",
        email: "",
        telephone: "",
        nationalite: "",
        universite: "",
        niveau: "",
        formation: "",
        dernierDiplome: "",
        specialites: [],
      },
      tutors: [],
      documents: {},
    });
  };

  return (
    <FormContext.Provider value={{ formState, updateStudent, updateTutors, updateDocuments, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};