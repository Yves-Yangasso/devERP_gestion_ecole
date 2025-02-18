import React from "react";
import InputField from "../../ui/Input/InputField";
import SelectInput from "../../ui/Input/SelectInput";

export const options = {
    niveau: [
      { value: "Licence 1", label: "Licence 1" },
      { value: "Licence 2", label: "Licence 2" },
      { value: "Licence 3", label: "Licence 3" },
      { value: "Master 1", label: "Master 1" },
      { value: "Master 2", label: "Master 2" },
      { value: "Baccalauréat", label: "Baccalauréat" },
    ]
  };


const StudentForm = () => {
      
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Informations de l'étudiant */}
      <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
        <span className="text-blue-600">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </span>
        Informations de l'étudiant
      </h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="1">
        <InputField 
         label="Nom Complet"
         name="Nom Complet"
         type="text"
         placeholder={"Veuillez saisir le nom complet"}
        ></InputField>

        </div>

        <div className="space-y-1">
        <InputField 
         label="Téléphone"
         name="Téléphone"
         type="number"
         placeholder={"Veuillez saisir le numero de Téléphone"}
        ></InputField>
        </div>

        <InputField 
         label="Date_de_Naissance"
         name="Date de Naissance"
         type="date"
         placeholder={"Veuillez saisir la Date de Naissance"}
        ></InputField>

        <div className="1">
        <InputField 
         label="Adresse"
         name="Adresse"
         type="text"
         placeholder={"Veuillez saisir l'adresse"}
        ></InputField>
        </div>

        <div className="1">
        <InputField 
         label="Email"
         name="Email"
         type="email"
         placeholder={"Veuillez saisir l'email"}
        ></InputField>
        </div>


        <div className="1 relative">
        <SelectInput
              label="Niveau d'Études"
              name="Niveau_d_Études"
              options={options.niveau}
            />
        </div>
    </div>

      {/* Documents Requis */}
      <div className="mt-6 p-3 bg-blue-100 rounded-lg shadow-lg">
            <h4 className="font-bold text-lg text-blue-600">📄 Documents Requis</h4>
            <ul className="grid grid-cols-3 gap-4 mt-2">
              {[
                "Certificat de Résidence",
                "Copie CNI/Passeport Légalisée",
                "Dernier Diplôme",
                "Certificat de Scolarité",
                "Bulletins de notes",
                "2 Photos d’Identité",
                "Casier Judiciaire",
                "Documents",
                "Documents"
              ].map((doc, index) => (
                <li key={index} className="bg-white p-3 rounded-lg shadow flex">
                  <input type="checkbox" className="mr-2 w-6 h-6"/>
                  <div className="text-sm"> {doc}</div>
                </li>
              ))}
            </ul>
          </div>
      </div>
  );
};

export default StudentForm;
