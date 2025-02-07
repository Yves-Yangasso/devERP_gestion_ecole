import React from 'react';

const IconeLabel = ({ text, icon, className }) => (
  <div className="mb-4 flex flex-col lg:flex-row gap-2">
    <label className={className}>
      <i className={`fas fa-${icon} mr-2`}></i>{text}
    </label>
  </div>
);

export default IconeLabel;
