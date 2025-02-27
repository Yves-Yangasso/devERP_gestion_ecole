import React from 'react';
import { X } from 'lucide-react';

const DocumentPreview = ({ document, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-5xl h-[80vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">{document.type}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-1 overflow-hidden">
                    {document.preview_url ? (
                        <iframe
                            src={document.preview_url}
                            className="w-full h-full"
                            title={`Preview of ${document.type}`}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">L'aperçu n'est pas disponible pour ce document.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DocumentPreview;

// import React, { useState } from 'react';
// import { FileText, X, ExternalLink } from 'lucide-react';

// const DocumentPreview = ({ document, onClose }) => {
//   const [loading] = useState(false);

//   console.log("Chemin du fichier:", document.chemin_fichier);

//   // Fonction pour récupérer le type du document
//   const getDocumentType = (chemin) => {
//     if (!chemin) return 'unknown';
//     const ext = chemin.split('.').pop().toLowerCase();
//     return ext === 'pdf' ? 'pdf' :
//       ['jpg', 'jpeg', 'png'].includes(ext) ? 'image' :
//         ['doc', 'docx'].includes(ext) ? 'word' :
//           'unknown';
//   };

//   // Vérification du type de document
//   const docType = getDocumentType(document.chemin_fichier);
//   console.log("Type de document détecté:", docType);

//   // Fonction pour Google Docs Viewer (utilisée uniquement pour les PDF)
//   const getGoogleViewerUrl = (fileUrl) => {
//     if (fileUrl.startsWith("http://localhost") || fileUrl.startsWith("file://")) {
//       return fileUrl; // Ne pas utiliser Google Viewer pour les fichiers locaux
//     }
//     const encodedUrl = encodeURIComponent(fileUrl);
//     return `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true`;
//   };

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg w-full h-[90vh] flex flex-col">
//         {/* Header */}
//         <div className="px-4 py-2 border-b flex items-center justify-between bg-gray-50">
//           <div className="flex items-center gap-2">
//             <FileText className="w-5 h-5 text-blue-600" />
//             <h3 className="font-semibold">{document.type_document}</h3>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => document.chemin_fichier && window.open(document.chemin_fichier, '_blank')}
//               className="p-2 hover:bg-gray-200 rounded-full"
//               title="Ouvrir dans un nouvel onglet"
//             >
//               <ExternalLink className="w-5 h-5" />
//             </button>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-200 rounded-full"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         {/* Contenu de l'aperçu */}
//         <div className="flex-1 overflow-auto p-1 bg-gray-100">
//           {loading ? (
//             <div className="flex items-center justify-center h-full">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//             </div>
//           ) : (
//             <div className="bg-white rounded-lg h-full flex items-center justify-center border-2 border-dashed">
//               {document.chemin_fichier ? (
//                 docType === 'pdf' ? (
//                   <iframe
//                     src={getGoogleViewerUrl(document.chemin_fichier)}
//                     className="w-full h-full rounded-lg"
//                     title={document.type_document}
//                   />
//                 ) : docType === 'image' ? (
//                   <img
//                     src={document.chemin_fichier}
//                     alt={document.type_document}
//                     className="max-w-full max-h-full object-contain"
//                   />
//                 ) : docType === 'word' ? (
//                   <div className="text-center p-4">
//                     <p>Les fichiers Word ne peuvent pas être prévisualisés.</p>
//                     <p className="text-sm text-gray-500">Cliquez sur le bouton d'ouverture pour voir le document</p>
//                   </div>
//                 ) : (
//                   <div className="text-center p-4">
//                     <FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
//                     <p>Aperçu non disponible</p>
//                     <p className="text-sm text-gray-500">Cliquez sur le bouton d'ouverture pour voir le document</p>
//                   </div>
//                 )
//               ) : (
//                 <div className="text-center p-4">
//                   <FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
//                   <p>Aucun fichier disponible</p>
//                   <p className="text-sm text-gray-500">Veuillez vérifier l'URL du document</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DocumentPreview;