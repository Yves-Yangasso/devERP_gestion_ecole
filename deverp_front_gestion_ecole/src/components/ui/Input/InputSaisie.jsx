import React from 'react';

const InputSaisie = ({ className, type, placeholder, name, value }) => {
  return (
    <input 
      className={className}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
    />
  );
};


export default InputSaisie;
