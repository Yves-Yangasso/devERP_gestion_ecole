import React from "react";

const InputSaisie = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  className,
  ...rest
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value || ''}
      onChange={onChange}
      className={className}
      {...rest}
    />
  );
};

export default InputSaisie;