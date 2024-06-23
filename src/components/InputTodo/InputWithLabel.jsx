import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';

const InputWithLabel = ({
  type = "text",
  id,
  name,
  value,
  onChange,
  isFocused,
}) => {

  const inputRef = useRef();

  return (
    <input className="input-todo"
      ref={inputRef}
      type={type}
      id={id}
      value={value}
      name={name}
      onChange={onChange}
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
