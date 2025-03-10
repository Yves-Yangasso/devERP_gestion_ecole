import React, { useState, useEffect } from 'react';
import useCrudAxios from '../../../hooks/useCrudAxios'; // Ajusté selon votre structure de dossiers

const PaiementEnLigne = ({ inscription_id = 10 }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('wave');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('error'); // 'error' ou 'success'
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialisation du hook useCrudAxios pour les paiements
  const paiementsCrud = useCrudAxios('paiements');
  
  // Correspondance entre IDs frontend et backend pour les méthodes de paiement
  const paymentMethodsMap = {
    'especes': 1,
    'carte': 2,
    'orange': 3,
    'wave': 4,
    'yas': 5,
    'free': 6,
  };
  
  const [monthlyPayments, setMonthlyPayments] = useState([
    { month: 'Octobre', amount: 50000, checked: true, type_frais: "Frais mensuel Octobre" },
    { month: 'Novembre', amount: 50000, checked: true, type_frais: "Frais mensuel Novembre" },
    { month: 'Decembre', amount: 50000, checked: true, type_frais: "Frais mensuel Decembre" },
    { month: 'Janvier', amount: 50000, checked: false, type_frais: "Frais mensuel Janvier" },
    { month: 'Février', amount: 50000, checked: false, type_frais: "Frais mensuel Février" },
    { month: 'Mars', amount: 50000, checked: false, type_frais: "Frais mensuel Mars" },
    { month: 'Avril', amount: 50000, checked: false, type_frais: "Frais mensuel Avril" },
    { month: 'Mai', amount: 50000, checked: false, type_frais: "Frais mensuel Mai" },
    { month: 'Juin', amount: 50000, checked: false, type_frais: "Frais mensuel Juin" },
  ]);

  const [fees, setFees] = useState([
    { name: 'Frais Scolarité', amount: 450000, checked: true, type_frais: "Frais de scolarité" },
    { name: 'Frais d\'Examen', amount: 0, checked: false, type_frais: "Frais d'examen" },
    { name: 'Frais Dossier', amount: 50000, checked: true, type_frais: "Frais d'inscription" },
    { name: 'Frais Soutenance', amount: 0, checked: false, type_frais: "Frais de soutenance" },
    { name: 'Frais d\'Uniforme', amount: 60000, checked: true, type_frais: "Frais d'uniforme" },
    { name: 'Frais d\'Assurance', amount: 5000, checked: true, type_frais: "Frais d'assurance" },
    { name: 'Frais Amicale', amount: 5000, checked: true, type_frais: "Frais d'amicale" },
  ]);

  const [totalAmount, setTotalAmount] = useState(0);

  // Calcul du montant total à payer
  useEffect(() => {
    const monthlyTotal = monthlyPayments
      .filter(payment => payment.checked)
      .reduce((sum, payment) => sum + payment.amount, 0);
    
    const feesTotal = fees
      .filter(fee => fee.checked)
      .reduce((sum, fee) => sum + fee.amount, 0);
    
    setTotalAmount(monthlyTotal + feesTotal);
  }, [monthlyPayments, fees]);

  // Gestion des changements d'état des paiements mensuels
  const handleMonthlyPaymentChange = (index) => {
    const updatedPayments = [...monthlyPayments];
    updatedPayments[index].checked = !updatedPayments[index].checked;
    setMonthlyPayments(updatedPayments);
  };

  // Gestion des changements d'état des frais
  const handleFeeChange = (index) => {
    const updatedFees = [...fees];
    updatedFees[index].checked = !updatedFees[index].checked;
    setFees(updatedFees);
  };
  
  // Gestion de la saisie du montant de transaction
  const handleTransactionAmountChange = (e) => {
    // N'accepte que les chiffres
    const value = e.target.value.replace(/[^\d]/g, '');
    setTransactionAmount(value);
  };
  
  // Préparation des données pour l'envoi au backend
  const preparePaiementData = () => {
    // Collecter tous les frais sélectionnés (mensuels et frais divers)
    const selectedMonthlyPayments = monthlyPayments
      .filter(payment => payment.checked)
      .map(payment => ({
        type_frais: payment.type_frais,
        montant: payment.amount
      }));
    
    const selectedFees = fees
      .filter(fee => fee.checked)
      .map(fee => ({
        type_frais: fee.type_frais,
        montant: fee.amount
      }));
    
    // Combiner les deux types de frais
    const lignes_paiement = [...selectedMonthlyPayments, ...selectedFees];
    
    // Préparer l'objet de données complet
    return {
      montant_paiement: totalAmount,
      inscription_id: inscription_id,
      mode_paiement_id: paymentMethodsMap[selectedPaymentMethod] || 8, // Utiliser l'ID correspondant ou la valeur par défaut
      lignes_paiement: lignes_paiement
    };
  };
  
  // Validation et soumission du paiement au backend
  const validatePayment = async () => {
    if (!transactionAmount) {
      setAlertMessage('Veuillez saisir le montant de la transaction.');
      setAlertType('error');
      setShowAlert(true);
      return;
    }
    
    const amount = parseInt(transactionAmount, 10);
    
    if (amount !== totalAmount) {
      setAlertMessage(`Le montant saisi (${amount.toLocaleString()} FCFA) ne correspond pas au montant total attendu (${totalAmount.toLocaleString()} FCFA).`);
      setAlertType('error');
      setShowAlert(true);
      return;
    }
    
    // Si montant OK, préparer les données
    const paiementData = preparePaiementData();
    
    try {
      setIsSubmitting(true);
      
      // Envoi des données au backend via useCrudAxios
      const response = await paiementsCrud.create(paiementData);
      
      // Si success
      setAlertMessage(`Paiement de ${amount.toLocaleString()} FCFA enregistré avec succès!`);
      setAlertType('success');
      setShowAlert(true);
      
      // Réinitialiser le montant saisi après succès
      setTransactionAmount('');
      
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du paiement:", error);
      
      // Afficher le message d'erreur du serveur si disponible
      const errorMessage = error.response?.data?.message || 
                          "Une erreur est survenue lors de l'enregistrement du paiement.";
      
      setAlertMessage(errorMessage);
      setAlertType('error');
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentMethods = [
    { id: 'especes', name: 'Espèces', description: 'Paiement au bureau', icon: '💵' },
    { id: 'carte', name: 'Carte Bancaire', description: 'Visa, Mastercard', icon: '💳' },
    { id: 'orange', name: 'Orange Money', description: 'Paiement Mobile', icon: '🔶' },
    { id: 'wave', name: 'Wave', description: 'Paiement Mobile', icon: '🌊' },
    { id: 'yas', name: 'Yas', description: 'Paiement Mobile', icon: '💛' },
    { id: 'free', name: 'Free Money', description: 'Paiement Mobile', icon: '⬛' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un nouveau paiement</h1>
        
        {/* Alert Popup */}
        {showAlert && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 m-4 max-w-md w-full">
              <div className="flex items-center mb-4">
                {alertType === 'error' ? (
                  <svg className="h-6 w-6 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
                <h3 className="text-lg font-medium text-gray-900">{alertType === 'error' ? 'Attention' : 'Succès'}</h3>
              </div>
              <p className="mb-4 text-gray-700">{alertMessage}</p>
              <div className="flex justify-end">
                <button 
                  className={`px-4 py-2 ${alertType === 'error' ? 'bg-blue-900' : 'bg-green-600'} text-white rounded-md hover:${alertType === 'error' ? 'bg-blue-800' : 'bg-green-700'}`}
                  onClick={() => setShowAlert(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Left panel - Payment tracking */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Suivi des paiements</h2>
            <div className="space-y-3">
              {monthlyPayments.map((payment, index) => (
                <div key={payment.month} className="flex items-center bg-white rounded-lg p-3 border border-gray-200">
                  <div className="flex-1 flex items-center">
                    {payment.checked ? (
                      <div 
                        className="h-6 w-6 rounded-md flex items-center justify-center border border-gray-300 bg-blue-50 text-blue-600 cursor-pointer"
                        onClick={() => handleMonthlyPaymentChange(index)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <input 
                        type="checkbox" 
                        className="h-5 w-5 rounded text-blue-600" 
                        checked={payment.checked}
                        onChange={() => handleMonthlyPaymentChange(index)}
                      />
                    )}
                    <span className="ml-2">{payment.month}</span>
                  </div>
                  <div className="text-right">
                    {payment.amount.toLocaleString()} FCFA
                    {payment.checked && (
                      <span className="ml-2 inline-block w-2 h-2 rounded-full bg-green-500"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Middle panel - Fee details */}
          <div className="bg-white rounded-lg p-4 border border-gray-100">
            <div className="flex items-center mb-4">
              <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h2 className="text-lg font-semibold">Détails des Frais</h2>
            </div>
            <div className="space-y-3">
              {fees.map((fee, index) => (
                <div key={fee.name} className="flex items-center bg-blue-50 rounded-lg p-3">
                  <div className="flex-1 flex items-center">
                    {fee.checked ? (
                      <div 
                        className="h-6 w-6 rounded-md flex items-center justify-center border border-gray-300 bg-blue-50 text-blue-600 cursor-pointer"
                        onClick={() => handleFeeChange(index)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <input 
                        type="checkbox" 
                        className="h-5 w-5 rounded text-blue-600" 
                        checked={fee.checked}
                        onChange={() => handleFeeChange(index)}
                      />
                    )}
                    <span className="ml-2">{fee.name}</span>
                  </div>
                  <div className="text-right font-medium">
                    {fee.amount.toLocaleString()} FCFA
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right panel - Mode de paiement */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 relative">
            <div className="flex items-center mb-4">
              <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
              <h2 className="text-lg font-semibold">Mode de paiement</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id}
                  className={`border rounded-lg p-3 cursor-pointer flex items-center ${selectedPaymentMethod === method.id ? 'border-green-500 bg-blue-50' : 'border-gray-200'}`}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                >
                  <div className={`h-8 w-8 flex items-center justify-center rounded-lg mr-2 ${selectedPaymentMethod === method.id ? 'bg-teal-100 text-teal-700' : 'bg-gray-100'}`}>
                    <span className="text-lg">{method.icon}</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{method.name}</div>
                    <div className="text-xs text-gray-500">{method.description}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Montant de la transaction */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Montant transféré ({paymentMethods.find(m => m.id === selectedPaymentMethod)?.name})
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="block w-full p-2 pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Entrez le montant transféré"
                  value={transactionAmount}
                  onChange={handleTransactionAmountChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">FCFA</span>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Entrez le montant exact que vous avez transféré via {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom panel - Total amount and validation button */}
        <div className="bg-white rounded-lg p-4 border border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <div className="text-sm text-gray-500">Montant total</div>
              <div className="text-xl font-bold text-blue-900">{totalAmount.toLocaleString()} FCFA</div>
            </div>
          </div>
          
          <button 
            className="w-full md:w-auto flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={validatePayment}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Traitement...
              </>
            ) : (
              <>
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Valider
              </>
            )}
          </button>
        </div>
        
        {/* Footer */}
        <div className="mt-10 text-center text-xs text-gray-500">
          Copyright © ISI SUPTECH 2024. Tous Droits Réservés
        </div>
      </div>
    </div>
  );
};

export default PaiementEnLigne;