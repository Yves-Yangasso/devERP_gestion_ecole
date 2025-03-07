import React from 'react';

const Documents = ({ docs }) => {
  const renderAvatar = (name) => (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
        <img 
          src="images/photo-profile.png" 
          className="w-full h-full object-cover"
          alt="Avatar"
        />
      </div>
      <span>{name}</span>
    </div>
  );

  const renderStatus = (status) => {
    const bgColor = status === 'Terminé' ? 'bg-green-400' : 'bg-yellow-300';
    return (
      <div className={`${bgColor} text-center rounded-full py-1 px-3`}>
        {status}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <div className="bg-blue-900 text-white rounded-t-lg py-3 px-4 grid grid-cols-4">
          <div className="text-left">Nom Document</div>
          <div className="text-center">Dernière mise à jour</div>
          <div className="text-center">Uploader par</div>
          <div className="text-right pr-4">Status</div>
        </div>
        <div className="divide-y divide-gray-200">
          {docs.map((doc, index) => (
            <div key={index} className="grid grid-cols-4 py-4 px-4 items-center bg-white">
              <div className="text-left">{doc.type || 'N/A'}</div>
              <div className="text-center">{renderAvatar(doc.updated_at || 'N/A')}</div>
              <div className="flex justify-center">.........</div>
              <div className="flex justify-end">{renderStatus(doc.statut)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;