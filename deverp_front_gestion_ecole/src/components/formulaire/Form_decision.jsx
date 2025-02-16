import React, { useState } from "react";
import DetailsDemandes from "../popup/DetailsDemandes";
import DecisionDemandes from "../popup/DecisionDemandes";
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
        <div className="flex justify-center">
          <button
            type="button"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            onClick={openFirstPopup}
          >
            Décisions
          </button>

      {isFirstPopupOpen && <DetailsDemandes closePopup={() => setIsFirstPopupOpen(false)} openSecondPopup={openSecondPopup} />}
      {isSecondPopupOpen && <DecisionDemandes closePopup={() => setIsSecondPopupOpen(false)} goBack={openFirstPopup} />}
    </div>
  );
};

export default FormDecision;