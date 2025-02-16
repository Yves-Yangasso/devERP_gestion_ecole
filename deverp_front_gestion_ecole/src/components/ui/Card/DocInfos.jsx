import React from 'react';
import DocCard from '../DocText/DocCard';
import { FileText } from 'lucide-react';
import Title from '../DocText/Title';

const DocInfos = ({ documents = {} }) => {
  const documentEntries = Object.entries(documents); // Convertir l'objet en tableau

  return (
    <div className="p-6 bg-[#E5F1FF] shadow-md rounded-xl w-full">
      <Title icon={FileText} title="Documents requis" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {documentEntries.map(([key, file], index) => (
          <DocCard 
            key={index} 
            label={key}
            title={`${file?.name || 'Aucun fichier sélectionné'}`} // Afficher le nom du fichier
          />
        ))}
      </div>
    </div>
  );
};

export default DocInfos;
