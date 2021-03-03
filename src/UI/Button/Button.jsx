import React from 'react';
import styled from './Button.module.css';

export default function Button(props) {
  const { clicked, btnType, idDisabled, configStyle } = props;
  return (
    <button
      disabled={idDisabled}
      className={`${styled.Button} ${styled[btnType]} ${configStyle}`}
      onClick={clicked}>
      {props.children}
    </button>
  );
}
