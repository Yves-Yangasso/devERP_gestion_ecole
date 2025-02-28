import React, { useState } from 'react';
import Informations_Etudiants from '../pages/Admins/Informations_Etudiants';
import Frais_et_mensualités from '../pages/Admins/Frais_et_mensualités';
import Documents from '../pages/Admins/Documents';
import Paiement_Detail_inscription from '../pages/Admins/Paiement_Detail_inscription';
import NavigationTabs_Detail_inscription from '../ui/Button/NavigationTabs_Detail_inscription';

const PopupLayout_Details_Inscription = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState({});
  const [downloadProgress, setDownloadProgress] = useState({
    csv: false,
    xls: false,
    pdf: false,
    jpg: false
  });

  const handleDownload = (fileId) => {
    setDownloadProgress(prev => ({
      ...prev,
      [fileId]: true
    }));
    
    setDownloadStatus(prev => ({
      ...prev,
      [fileId]: 'downloading'
    }));
    
    setTimeout(() => {
      setDownloadStatus(prev => ({
        ...prev,
        [fileId]: 'downloaded'
      }));
      setDownloadProgress(prev => ({
        ...prev,
        [fileId]: false
      }));
    }, 2000);
  };

  const handleCancel = (fileId) => {
    setDownloadProgress(prev => ({
      ...prev,
      [fileId]: false
    }));
    setDownloadStatus(prev => ({
      ...prev,
      [fileId]: null
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return <Informations_Etudiants />;
      case 2:
        return <Frais_et_mensualités />;
      case 3:
        return <Documents />;
      case 4:
        return <Paiement_Detail_inscription />;
      default:
        return <Informations_Etudiants />;
    }
  };

  const renderFileDownloadRow = (fileType, fileName, color, size) => (
    <div className="flex items-center justify-between p-2 border-b pb-3">
      <div className="flex items-center">
        <div className={`w-8 h-10 bg-${color}-100 flex items-center justify-center rounded mr-3`}>
          <span className={`text-${color}-600 text-xs font-medium`}>{fileType}</span>
        </div>
        <div>
          <p className="text-sm font-medium">{fileName}</p>
          {downloadProgress[fileType.toLowerCase()] && (
            <div className="w-32 h-1 bg-gray-200 rounded-full mt-1">
              <div className="h-1 bg-blue-500 rounded-full w-2/3"></div>
            </div>
          )}
          <p className="text-xs text-gray-500">Marvin McKinney</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-xs text-gray-500 mr-3">{size}</span>
        {downloadProgress[fileType.toLowerCase()] ? (
          <button 
            className="text-red-500 text-xs font-medium"
            onClick={() => handleCancel(fileType.toLowerCase())}
          >
            Cancel
          </button>
        ) : (
          <button 
            className="text-blue-500 text-xs font-medium"
            onClick={() => handleDownload(fileType.toLowerCase())}
          >
            {downloadStatus[fileType.toLowerCase()] === 'downloading' ? 'Downloading...' : 
             downloadStatus[fileType.toLowerCase()] === 'downloaded' ? 'Downloaded' : 'Download'}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[45%] mx-4 flex flex-col min-h-[600px]">
        {/* Header section remains the same */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
            <h2 className="text-xl font-semibold">Détails Inscription</h2>
            <span className="ml-3 bg-blue-100 text-blue-800 px-2 py-0.5 text-xs rounded-md">INSC - 009000</span>
          </div>
          <div className="flex items-center">
            <button 
              className="flex items-center px-3 py-2 mr-3 text-sm bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors"
              onClick={() => setShowDownloadPopup(true)}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Télécharger le fiche
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full" onClick={onClose}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Tabs section */}
        <NavigationTabs_Detail_inscription activeTab={activeTab} onTabChange={setActiveTab}/>
        
        <div className="flex-1 bg-white">
          {renderContent()}
        </div>
        
        {/* Download Popup */}
        {showDownloadPopup && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-medium">Télécharger en format</h3>
                <button onClick={() => setShowDownloadPopup(false)} className="p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-4 space-y-3">
                {renderFileDownloadRow('CSV', 'User-journey.csv', 'orange', '12 MB')}
                {renderFileDownloadRow('XLS', 'Contact-data.xls', 'green', '1 MB')}
                {renderFileDownloadRow('PDF', 'Contact-data.pdf', 'red', '1 MB')}
                {renderFileDownloadRow('JPG', 'Contact-data.jpg', 'blue', '1 MB')}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupLayout_Details_Inscription;