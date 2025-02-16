import React, { useState } from 'react';
import { Eye, FileText } from 'lucide-react';
import DocumentPreview from './DocumentPreview';

const DocumentsSection = ({ documents }) => {
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Si aucun document n'est fourni, utiliser des documents de démonstration
  const docsToShow = documents?.length > 0 ? documents : [
    { type_document: "Document d'identité", chemin_fichier: null },
    { type_document: "Diplôme", chemin_fichier: null },
    { type_document: "Photo d'identité", chemin_fichier: null }
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {docsToShow.map((doc, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>{doc.type}</span>
            </div>
            <button 
              onClick={() => setSelectedDoc(doc)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {selectedDoc && (
        <DocumentPreview 
          document={selectedDoc} 
          onClose={() => setSelectedDoc(null)} 
        />
      )}
    </>
  );
};

export default DocumentsSection;