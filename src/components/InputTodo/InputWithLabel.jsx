import React, { useEffect, useRef, useState } from "react";
import style from './InputWithLabel.module.css';

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
  });

  return (
    <>
      <label htmlFor={id} className={style["input-todo-title"]}>{children}</label>
      <input className={style["input-todo"]}
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
