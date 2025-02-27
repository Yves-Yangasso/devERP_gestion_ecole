import React from 'react';
import { Eye } from 'lucide-react';

const DocumentsSection = ({ documents, onPreview }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((document) => (
                <div key={document.id} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="font-medium text-gray-900">{document.type}</h5>
                            <p className={`text-sm ${
                                document.statut === 'validé' ? 'text-green-600' : 
                                document.statut === 'en_attente' ? 'text-yellow-600' : 
                                'text-red-600'
                            }`}>
                                {document.statut}
                            </p>
                        </div>
                        <button 
                            onClick={() => onPreview(document)}
                            className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors"
                        >
                            <Eye className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DocumentsSection;
// import React, { useState } from 'react';
// import { FileText, Eye } from 'lucide-react';
// import DocumentPreview from './DocumentPreview';

// const DocumentsSection = ({ documents }) => {
//   const [selectedDoc, setSelectedDoc] = useState(null);

//   console.log("Documents reçus:", documents);
//   console.log("Document sélectionné:", selectedDoc);

//   if (!documents || documents.length === 0) {
//     return (
//       <div className="p-4 text-center text-gray-500">
//         Aucun document disponible
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <div className="grid gap-4">
//         {documents.map((doc, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
//           >
//             <div className="flex items-center space-x-3">
//               <FileText className="w-5 h-5 text-gray-500" />
//               <span className="font-medium">{doc.type_document}</span>
//             </div>
//             <button
//               onClick={() => {
//                 console.log("Document cliqué:", doc);
//                 setSelectedDoc(doc);
//               }}
//               className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
//             >
//               <Eye className="w-5 h-5" />
//               <span>Voir le document</span>
//             </button>
//           </div>
//         ))}
//       </div>

//       {selectedDoc && (
//         <DocumentPreview
//           document={selectedDoc}
//           onClose={() => setSelectedDoc(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default DocumentsSection;