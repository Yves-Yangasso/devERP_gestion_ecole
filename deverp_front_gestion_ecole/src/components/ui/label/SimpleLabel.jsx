import React from 'react';

const SimpleLabel = ({ text, className }) => (
  <div className="mb-1 text-left">
    <label className={className}>
      {text}
    </label>
  </div>
);

export default SimpleLabel;
