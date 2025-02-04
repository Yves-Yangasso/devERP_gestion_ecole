import React from 'react';

const SimpleLabel = ({ text, className }) => (
  <div className="mb-4 flex flex-col lg:flex-row gap-2">
    <label className={className}>
      {text}
    </label>
  </div>
);

export default SimpleLabel;
