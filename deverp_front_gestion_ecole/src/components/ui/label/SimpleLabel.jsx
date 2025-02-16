import React from "react";
import clsx from "clsx";

const SimpleLabel = ({ text, className }) => {
  return (
    <label className={clsx("block", className)}>
      {text}
    </label>
  );
};

export default SimpleLabel;