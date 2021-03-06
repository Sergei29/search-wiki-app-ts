import React from "react";
import "./style.scss";

export type InputProps = {
  placeholder?: string;
  restProps?: any;
};
const Input: React.FC<InputProps> = ({ placeholder, ...restProps }) => (
  <input
    type="text"
    className="input-field"
    placeholder={placeholder}
    {...restProps}
  />
);

export default Input;
