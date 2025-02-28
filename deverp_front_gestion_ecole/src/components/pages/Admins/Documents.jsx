import React from 'react';

const Documents = () => {
  // Fonction pour rendre l'avatar avec le nom
  const renderAvatar = (name) => (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
        <img 
          src="moi.png" 
          className="w-full h-full object-cover"
        />
      </div>
      <span>{name}</span>
    </div>
  );

  // Fonction pour rendre le statut
  const renderStatus = (status) => {
    const bgColor = status === 'Terminé' ? 'bg-green-400' : 'bg-yellow-300';
    return (
      <div className={`${bgColor} text-center rounded-full py-1 px-3`}>
        {status}
      </div>
    );
  };

  // Entêtes de la table
  const headers = [
    'Nom Document',
    'Dernier mise à jour',
    'Uploader par',
    'Status'
  ];

  // Données de la table
  const tableData = [
    [
      'Copie CNI / Passeport Légalisée',
      '11/11/2024',
      renderAvatar('Dr Kara'),
      renderStatus('Terminé')
    ],
    [
      'Photo d\'identité',
      '11/11/2024',
      renderAvatar('Dr Kara'),
      renderStatus('Terminé')
    ],
    [
      'Certificat de Scolarité',
      '11/11/2024',
      renderAvatar('Dr Kara'),
      renderStatus('Terminé')
    ],
    [
      'Dernier Diplôme',
      '11/11/2024',
      renderAvatar('Dr Kara'),
      renderStatus('Terminé')
    ],
    [
      'Certificat de Residence',
      '11/11/2024',
      renderAvatar('Dr Kara'),
      renderStatus('En attente')
    ],
    [
      'Bulletins de notes de l\'année dernier',
      '11/11/2024',
      renderAvatar('Dr Kara'),
      renderStatus('En attente')
    ]
  ];

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <div className="bg-blue-900 text-white rounded-t-lg py-3 px-4 grid grid-cols-4">
          <div className="text-left">Nom Document</div>
          <div className="text-center">Dernier mise à jour</div>
          <div className="text-center">Uploader par</div>
          <div className="text-right pr-4">Status</div>
        </div>
        <div className="divide-y divide-gray-200">
          {tableData.map((row, index) => (
            <div key={index} className="grid grid-cols-4 py-4 px-4 items-center bg-white">
              <div className="text-left">{row[0]}</div>
              <div className="text-center">{row[1]}</div>
              <div className="flex justify-center">{row[2]}</div>
              <div className="flex justify-end">{row[3]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;