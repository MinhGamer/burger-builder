import React from 'react';
import styled from './Backdrop.module.css';

export default function Backdrop(props) {
  const { isShowed, backdropClicked } = props;
  return (
    <div
      style={{ display: isShowed ? 'block' : 'none' }}
      onClick={backdropClicked}
      className={styled.Backdrop}></div>
  );
}
