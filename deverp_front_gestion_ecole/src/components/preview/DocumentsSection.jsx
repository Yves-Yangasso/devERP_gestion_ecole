import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import DocumentPreview from './DocumentPreview';

const DocumentsSection = ({ documents }) => {
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <>
      <div className="grid gap-4">
        {documents.map((doc, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>{doc.type_document}</span>
            </div>
            <button 
              onClick={() => setSelectedDoc(doc)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Voir le document
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