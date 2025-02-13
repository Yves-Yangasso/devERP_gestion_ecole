import React, { useState } from "react";
import { User, Users, CheckCircle, ArrowLeft, ChevronDown, FileText } from "lucide-react";
import NavigationButtons from "../ui/Button/NavigationButtons";

const FormDecision = () => {
  const [isFirstPopupOpen, setIsFirstPopupOpen] = useState(false);
  const [isSecondPopupOpen, setIsSecondPopupOpen] = useState(false);

  const openFirstPopup = () => {
    setIsFirstPopupOpen(true);
    setIsSecondPopupOpen(false);
  };

  const openSecondPopup = () => {
    setIsFirstPopupOpen(false);
    setIsSecondPopupOpen(true);
  };

  return (
    <div className="flex flex-col h-full p-6 bg-gray-50">
      <h2 className="text-xl font-bold text-blue-600 mb-8 px-6 py-3 border-2 border-blue-600 rounded-tl-full rounded-br-full bg-white text-center w-fit mx-auto">
        Soumettre décision
      </h2>

      <form className="flex flex-col space-y-4">
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            onClick={openFirstPopup}
          >
            Décisions
          </button>
        </div>

        <NavigationButtons nextText="Suivant" />
      </form>

      {isFirstPopupOpen && <Popup closePopup={() => setIsFirstPopupOpen(false)} openSecondPopup={openSecondPopup} />}
      {isSecondPopupOpen && <SecondPopup closePopup={() => setIsSecondPopupOpen(false)} goBack={openFirstPopup} />}
    </div>
  );
};

// **Premier Popup**
const Popup = ({ closePopup, openSecondPopup }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-5xl relative">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-2xl font-bold text-gray-800">
            Traitement du dossier de Ibrahima Diallo
          </h3>
          <button onClick={closePopup} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
        </div>

           {/* Contenu principal */}
           <div className="grid grid-cols-2 gap-6 mt-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h4 className="font-bold text-blue-600 text-lg flex items-center">
                <User className="w-5 h-5 mr-2" /> Informations du demandeur
              </h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <p className="font-semibold text-gray-700">Nom Complet:</p><p className="text-right">Ibrahima Diallo</p>
                <p className="font-semibold text-gray-700">Nationalité:</p><p className="text-right">Sénégal</p>
                <p className="font-semibold text-gray-700">Date de Naissance:</p><p className="text-right">24 - 05 - 2001</p>
                <p className="font-semibold text-gray-700">Lieu de Naissance:</p><p className="text-right">Pikine</p>
                <p className="font-semibold text-gray-700">Adresse:</p><p className="text-right">Keur Massar</p>
                <p className="font-semibold text-gray-700">Email:</p><p className="text-right">sory@gmail.com</p>
                <p className="font-semibold text-gray-700">Téléphone:</p><p className="text-right">+221 78 530 48 69</p>
                <p className="font-semibold text-gray-700">Niveau d'Études:</p><p className="text-right">Licence 3</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h4 className="font-bold text-blue-600 text-lg flex items-center">
                <Users className="w-5 h-5 mr-2" /> Informations du tuteur
              </h4>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <p className="font-semibold text-gray-700">Nom Complet:</p><p className="text-right">Landing Diallo</p>
                <p className="font-semibold text-gray-700">Adresse:</p><p className="text-right">Keur Massar</p>
                <p className="font-semibold text-gray-700">Téléphone:</p><p className="text-right">+221 XX XXX XX XX</p>
                <p className="font-semibold text-gray-700">Fonction:</p><p className="text-right">Chef de Production</p>
              </div>
            </div>
          </div>

          {/* Documents requis */}
          <div className="mt-6 p-6 bg-blue-100 rounded-lg shadow-lg">
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
                <li key={index} className="bg-white p-3 rounded-lg shadow">
                  <input type="checkbox" className="mr-2 w-6 h-6"/> {doc}
                </li>
              ))}
            </ul>
          </div>

        {/* Bouton "Soumettre décision" */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={openSecondPopup}
            className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-950 transition duration-300 flex items-center"
          >
            <CheckCircle className="w-5 h-5 mr-2"/> Soumettre décision
          </button>
        </div>
      </div>
    </div>
  );
};

// **Deuxième Popup**
const SecondPopup = ({ closePopup, goBack }) => {
  const [decision, setDecision] = useState("Accepter");
  const [status, setStatus] = useState("Terminé");
  const [motif, setMotif] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ArrowLeft className="w-6 h-6 text-gray-600 mr-2 cursor-pointer" onClick={goBack} />
            <h3 className="text-xl font-bold">Décisions</h3>
          </div>
          <button onClick={closePopup} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
        </div>

        {/* Liste déroulante - Statut de décision */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Statut de décisions</label>
          <select
            className="w-full p-3 border rounded-lg bg-gray-100 cursor-pointer"
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
          >
            <option value="Accepter">Accepter</option>
            <option value="Refuser">Refuser</option>
          </select>
        </div>

        {/* Liste déroulante - Statut du dossier */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Statut du dossier</label>
          <select
            className="w-full p-3 border rounded-lg bg-gray-200 cursor-pointer"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Terminé">Terminé</option>
            <option value="En attente">En attente</option>
          </select>
        </div>

        {/* Motif */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Motif</label>
          <textarea
            className="w-full h-24 p-3 border rounded-lg resize-none"
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            placeholder="Expliquez votre décision..."
          />
        </div>

        {/* Texte d'avertissement */}
        <p className="text-sm text-gray-600">
          En cliquant sur "Valider", je consens avoir bien vérifié tous les documents requis et avoir donné mon approbation.
        </p>

        {/* Bouton de validation */}
        <div className="mt-4">
          <button className="bg-blue-900 text-white w-full py-3 rounded-lg flex items-center justify-center hover:bg-blue-950 transition">
            <FileText className="w-5 h-5 mr-2" /> Valider
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormDecision;
