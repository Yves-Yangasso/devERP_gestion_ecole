import React from 'react';

const InputSaisie = ({ className, id, type = "checkbox" ? "checkbox" : "radio", name, value }) => {
  return (
    <input 
      className={className}
      id={id}
      type={type}
      name={name}
      value={value}
    />
  );
};

export default InputSaisie;
