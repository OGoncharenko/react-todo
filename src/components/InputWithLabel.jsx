import React, { useEffect, useRef, useState } from "react";

const InputWithLabel = ({
  type = "text",
  id,
  name,
  value,
  onChange,
  isFocused,
  children,
}) => {
    
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        ref={inputRef}
        type={type}
        id={id}
        value={value}
        name={name}
        onChange={onChange}
      />
    </>
  );
};

export default InputWithLabel;
