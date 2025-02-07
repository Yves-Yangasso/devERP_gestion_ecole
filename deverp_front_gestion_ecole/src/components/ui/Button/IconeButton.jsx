import React from 'react';

const IconeButton = ({ className, icon, text, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <i className={`fas fa-${icon} mr-2`}></i>
      {text}
    </button>
  );
};

export default IconeButton;
