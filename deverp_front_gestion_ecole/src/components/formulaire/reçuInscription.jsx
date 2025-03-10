import React from 'react';
import '../../css/reçuInscription.css'; // Assurez-vous que ce fichier existe

const Invoice = ({ invoiceData }) => {
  const {
    instituteName,
    instituteAddress,
    agreementNumber,
    invoiceNumber,
    infoReceived,
    date,
    cashier,
    borderNumber,
    studentName,
    studentDegree,
    paymentMode,
    nature,
    period,
    year,
    amountReceived,
    stampFee,
    totalReceived,
    restaurantFee,
    transportFee,
    tuitionFee,
    paymentNote,
    outstandingInvoices,
    cachetDate,
    cachetTime,
    signature
  } = invoiceData;

  return (
    <div className="invoice-modern-container">
      {/* En-tête avec logo et informations de l'institut */}
      <header className="invoice-header">
        <div className="institute-logo">
          <span className="isi-logo">ISI</span>
        </div>
        <div className="institute-details">
          <h1>{instituteName}</h1>
          <p className="address">{instituteAddress}</p>
          <p className="agreement">Agrément N° {agreementNumber}</p>
          <p className="service">Service Facturation</p>
        </div>
        <div className="invoice-id">{invoiceNumber}</div>
      </header>

      {/* Informations de l'étudiant */}
      <div className="student-card">
        <h2>{studentName}</h2>
        <p className="degree">{studentDegree}</p>
      </div>

      {/* Détails du reçu */}
      <div className="receipt-details-card">
        <h3>Détails du Reçu</h3>
        <div className="details-grid">
          <p><strong>N° Reçu :</strong> {infoReceived}</p>
          <p><strong>Date :</strong> {date}</p>
          <p><strong>Encaissé par :</strong> {cashier}</p>
          <p><strong>N° Bordereau :</strong> {borderNumber}</p>
          <p><strong>Classe :</strong> 1ère année</p>
          <p><strong>Mode Paiement :</strong> {paymentMode}</p>
          <p><strong>N° Chèque :</strong> -</p>
          <p><strong>Banque Chèque :</strong> -</p>
          <p><strong>Nature :</strong> {nature}</p>
          <p><strong>Période :</strong> {period}</p>
          <p><strong>Année :</strong> {year}</p>
        </div>
      </div>

      {/* Détails financiers */}
      <div className="financial-card">
        <h3>Détails Financiers</h3>
        <div className="financial-grid">
          <p><strong>Montant Reçu :</strong> {amountReceived} FCFA</p>
          <p><strong>Timbre :</strong> {stampFee} FCFA</p>
          <p><strong>Total Reçu :</strong> <span className="highlight">{totalReceived}</span> FCFA</p>
          <p><strong>Restauration :</strong> {restaurantFee} FCFA</p>
          <p><strong>Transport :</strong> {transportFee} FCFA</p>
          <p><strong>Frais Scolarité :</strong> {tuitionFee} FCFA</p>
          <p><strong>Note :</strong> {paymentNote}</p>
        </div>
      </div>

      {/* Factures restantes */}
      <div className="outstanding-card">
        <h3>Rappel des Factures Restantes</h3>
        <table className="outstanding-table">
          <thead>
            <tr>
              <th>Oct</th>
              <th>Fév</th>
              <th>Mars</th>
              <th>Avril</th>
              <th>Mai</th>
              <th>Juin</th>
              <th>Juil</th>
              <th>Sept</th>
              <th>Oct P</th>
              <th>Nov P</th>
              <th>Déc P</th>
              <th>Jan P</th>
              <th>Fév P</th>
              <th>Mars P</th>
              <th>Avril P</th>
              <th>Mai P</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{outstandingInvoices.oct}</td>
              <td>{outstandingInvoices.fev}</td>
              <td>{outstandingInvoices.mars}</td>
              <td>{outstandingInvoices.avril}</td>
              <td>{outstandingInvoices.mai}</td>
              <td>{outstandingInvoices.juin}</td>
              <td>{outstandingInvoices.juil}</td>
              <td>{outstandingInvoices.sept}</td>
              <td>{outstandingInvoices.octP}</td>
              <td>{outstandingInvoices.novP}</td>
              <td>{outstandingInvoices.decP}</td>
              <td>{outstandingInvoices.janP}</td>
              <td>{outstandingInvoices.fevP}</td>
              <td>{outstandingInvoices.marsP}</td>
              <td>{outstandingInvoices.avrilP}</td>
              <td>{outstandingInvoices.maiP}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pied de page avec cachet et signature */}
      <div className="footer-card">
        <p><strong>Cachet et Signature Exigés</strong></p>
        <p><strong>Date :</strong> {cachetDate} <strong>à</strong> {cachetTime}</p>
        <p><strong>{signature}</strong></p>
        <div className="stamp-placeholder">Cachet</div>
        <div className="barcode-placeholder">Code-barres</div>
      </div>
    </div>
  );
};

const App = () => {
  const invoiceData = {
    instituteName: "Institut Supérieur d'Informatique (ISI DAKAR)",
    instituteAddress: "Institut de référence dans les TIC",
    agreementNumber: "V/L n° 00289 du 21 Aout 2007",
    invoiceNumber: "411-23-397/ISI",
    infoReceived: "36 527",
    date: "05/02/2025",
    cashier: "ISIDC",
    borderNumber: "-",
    studentName: "Jean Yves Yowane YANGASSO",
    studentDegree: "Diplôme d'Ingénieur en Techniques Informatiques",
    paymentMode: "Espèce",
    nature: "Mensualité",
    period: "Janvier",
    year: "2024-2025",
    amountReceived: "100 000,00",
    stampFee: "0,00",
    totalReceived: "100 000,00",
    restaurantFee: "0",
    transportFee: "0",
    tuitionFee: "100 000",
    paymentNote: "Paiement le 5 de chaque mois au plus tard",
    outstandingInvoices: {
      oct: "0",
      fev: "100 000",
      mars: "100 000",
      avril: "100 000",
      mai: "100 000",
      juin: "100 000",
      juil: "100 000",
      sept: "0",
      octP: "0",
      novP: "0",
      decP: "0",
      janP: "0",
      fevP: "0",
      marsP: "0",
      avrilP: "0",
      maiP: "0",
    },
    cachetDate: "05/02/2025",
    cachetTime: "à 18:08:07",
    signature: "La Caisse"
  };

  return (
    <div className="app">
      <Invoice invoiceData={invoiceData} />
    </div>
  );
};

export default App;