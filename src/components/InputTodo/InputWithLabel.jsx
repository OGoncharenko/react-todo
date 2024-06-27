import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import "/src/App.css";
import style from './InputWithLabel.module.css'

const InputWithLabel = ({
  type = "text",
  id,
  name,
  value,
  onChange,
}) => {

  const inputRef = useRef();

  return (
    <input className={style["input-todo"]}
      ref={inputRef}
      type={type}
      id={id}
      value={value}
      name={name}
      onChange={onChange}
      placeholder="write your todo"
    />
  );
};

InputWithLabel.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default InputWithLabel;
