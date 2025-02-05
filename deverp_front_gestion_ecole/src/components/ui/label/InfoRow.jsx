import React from 'react';

const InfoRow = ({ label, value }) => (
    <div className="info">
      <span className="label">{label}:</span>
      <span>{value}</span>
    </div>
);



export default InfoRow;