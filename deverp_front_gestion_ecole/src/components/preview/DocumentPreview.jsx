import React, { useState } from 'react';
import { FileText, X, ExternalLink } from 'lucide-react';

const DocumentPreview = ({ document, onClose }) => {
  const [loading ] = useState(false);

  // Fonction pour gérer le type de document
  const getDocumentType = (chemin) => {
    if (!chemin) return 'unknown';
    const ext = chemin.split('.').pop().toLowerCase();
    return ext === 'pdf' ? 'pdf' :
      ['jpg', 'jpeg', 'png'].includes(ext) ? 'image' :
        'unknown';
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full  h-[100vh] flex flex-col">
        {/* Header */}
        <div className="px-4 py-2 border-b flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold">{document.type_document}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => document.chemin_fichier && window.open(document.chemin_fichier, '_blank')}
              className="p-2 hover:bg-gray-200 rounded-full"
              title="Ouvrir dans un nouvel onglet"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div className="flex-1 overflow-auto p-1 bg-gray-100">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="bg-white rounded-lg h-full flex items-center justify-center border-2 border-dashed">
              {document.chemin_fichier ? (
                getDocumentType(document.chemin_fichier) === 'pdf' ? (
                  <iframe
                    src={`https://docs.google.com/viewer?url=${document.chemin_fichier}&embedded=true`}
                    className="w-full h-full rounded-lg"
                    title={document.type_document}
                  />

                ) : getDocumentType(document.chemin_fichier) === 'image' ? (
                  <img
                    src={document.chemin_fichier}
                    alt={document.type_document}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-4">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p>Aperçu non disponible</p>
                    <p className="text-sm text-gray-500">Cliquez sur le bouton d'ouverture pour voir le document</p>
                  </div>
                )
              ) : (
                <div className="text-center p-4">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p>Document exemple</p>
                  <p className="text-sm text-gray-500">Aucun document n'est actuellement disponible</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;