import React from 'react';

const InfoRow = ({ label, value, className }) => (
    <div className={className}>
      <span className="">{label}:</span>
      <span>{value}</span>
    </div>
);



export default InfoRow;