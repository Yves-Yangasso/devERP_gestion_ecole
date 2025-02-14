import React from 'react';

export default function StatusBadge({ status }) {
  const statusColors = {
    'Terminé': 'bg-green-500',
    'En Cours': 'bg-yellow-500',
    'En Attente': 'bg-red-500'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${statusColors[status] || 'bg-gray-500'}`}>
      {status}
    </span>
  );
}
