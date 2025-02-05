import React from 'react';
import DocCard from '../DocText/DocCard';
import { FileText, PersonStanding } from 'lucide-react';
import Title from '../DocText/Title';

const DocInfos = ({documents}) => {

  return (
    <div className="p-6 bg-[#E5F1FF] shadow-md rounded-xl">
      <Title icon={FileText} title={"Documents recquis"}/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {documents.map((doc, index) => (
          <DocCard key={index} title={doc}/>
        ))}
      </div>
    </div>
  );
};

export default DocInfos;