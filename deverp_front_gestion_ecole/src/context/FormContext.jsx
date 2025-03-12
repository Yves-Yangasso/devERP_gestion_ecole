<<<<<<< HEAD
// import React, { createContext, useState, useContext } from 'react';

// const FormContext = createContext();

// export const FormProvider = ({ children }) => {
//   const [formState, setFormState] = useState({
//     student: {},
//     tuteur: [],
//     documents: {},
//     payment: {},
//     errors: {}
//   });

//   const updateStudent = (data) => {
//     setFormState(prev => ({
//       ...prev,
//       student: {
//         ...prev.student,
//         ...data
//       },
//       errors: {
//         ...prev.errors,
//         ...data.errors
//       }
//     }));
//   };

//   const updateDocuments = (documents) => {
//     setFormState(prev => ({ ...prev, documents }));
//   };

//   const updateTuteur = (data) => {
//     setFormState(prev => ({
//       ...prev,
//       tuteur: {
//         ...prev.tuteur,
//         ...data
//       },
//       errors: {
//         ...prev.errors,
//         tuteur: {
//           ...prev.errors?.tuteur,
//           ...data.errors
//         }
//       }
//     }));
//   };

//   const updatePayment = (data) => {
//     setFormState(prev => ({
//       ...prev,
//       payment: {
//         ...prev.payment,
//         ...data
//       }
//     }));
//   };

  

//   return (
//     <FormContext.Provider value={{ formState, updateStudent, updateTuteur, updateDocuments, updatePayment }}>
//       {children}
//     </FormContext.Provider>
//   );
// };

// export const useFormContext = () => useContext(FormContext);

// export default FormContext;

=======
>>>>>>> 3e34f25 (🔧 Mise à jour gestion inscription : corrections et améliorations backend/frontend)
import { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formState, setFormState] = useState({
    student: {},
<<<<<<< HEAD
    tuteur: [],
    documents: {},
    payment: {},
    errors: {}
=======
    tutors: [],
    documents: {}
>>>>>>> 3e34f25 (🔧 Mise à jour gestion inscription : corrections et améliorations backend/frontend)
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

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};