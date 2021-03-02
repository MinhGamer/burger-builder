import React from 'react';

import { upperCaseFirstLetter } from '../../helpers/helpers';

import styled from './Input.module.css';

export default function Input(props) {
  const { label, elementType, elementConfig, value, onChange } = props;

  switch (elementType) {
    case 'input':
      return (
        <React.Fragment>
          <label className={styled.Label}>{label}</label>
          <input
            onChange={onChange}
            type={elementConfig.type}
            value={value}
            className={styled.InputElement}
          />
        </React.Fragment>
      );
    case 'select':
      return (
        <React.Fragment>
          <label className={styled.Label} htmlFor=''>
            {label}
          </label>
          <select className={styled.Select}>
            {elementConfig.options.map((opt) => (
              <option key={opt} value={opt}>
                {upperCaseFirstLetter(opt)}
              </option>
            ))}
          </select>
        </React.Fragment>
      );
    case 'radio':
      break;
    default:
  }

  return <h1>Input</h1>;
}
