import React from 'react';
import '../../css/Attestation.css';

const AttestationModern = () => {
  return (
    <div className="attestation-modern-container">
      {/* En-tête avec logo et informations de l'institut */}
      {/* <header className="header">
        <div className="logo">
          <span className="isi-logo">ISI</span>
        </div>
       
      </header> */}

      {/* Carte principale */}
      <div className="attestation-card">
        <div className="card-header">

        <div className="row">
            <div className="col-lg-6">
                <h5>Attestation d'Inscription</h5>
                <p className="academic-year">Année Académique : 2024-2025</p>
                <div className="document-number">N° 00092</div>
            </div>

            <div className="col-lg-6">
                <div className="institute-info">
                    <h5>Institut Supérieur d'Informatique (ISI DAKAR)</h5>
                    <p className="slogan">Institut de référence dans les TIC</p>
                    <p className="agreement">Agrément N° 00289 du 21 Août 2007</p>
                </div>
            </div>
        </div>

       
        </div>

        <div className="card-content">
          {/* Section des départements (fond décoratif) */}
          <div className="departments-section">
            <h3>Domaines d'Excellence</h3>
            <div className="departments-list">
              <span>Formation Initiale</span>
              <span>Formation Continue</span>
              <span>Génie Informatique</span>
              <span>Réseaux & Systèmes</span>
              <span>Gestion</span>
              <span>Certification Cisco</span>
              <span>Certification TOEIC</span>
              <span>Cycle d'Ingénieur</span>
              <span>École Doctorale</span>
            </div>
          </div>

          {/* Détails de l'étudiant */}
          <div className="student-details">
            <h3>Détails de l'Inscription</h3>
            <p><strong>Nom :</strong> Mme Syntiche </p>
            <p><strong>Date de naissance :</strong> 11/11/2003 à Bangui</p>
            <p><strong>Programme :</strong> Licence Professionnelle</p>
            <p><strong>Spécialité :</strong> Informatique Appliquée à la Gestion des Entreprises</p>
            <p><strong>Niveau :</strong> 3ème année</p>
          </div>
        </div>

        <div className="card-footer">
          <p className="validation">
            En foi de quoi, la présente attestation est délivrée pour servir et faire valoir ce que de droit.
          </p>
          <div className="date-authority">
            <p>Fait le : 04/02/2025</p>
            <p>Directrice des Études</p>
            <div className="signature-section">
              <p>Aissatou Diaby GASSAMA</p>
              <div className="signature-placeholder">Signature</div>
              <div className="stamp-placeholder">Tampon ISI DAKAR</div>
            </div>
          </div>
          <div className="contact-section">
            <p>ISI | Km1, avenue Cheikh Anta DIOP | Tel: +221 33 822 19 81</p>
            <p>Email: contact@groupeisi.com | Site: www.groupeisi.com</p>
            <div className="qr-code-placeholder">QR Code</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttestationModern;