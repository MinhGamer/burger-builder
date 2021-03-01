import React from 'react';
import styled from './Backdrop.module.css';

export default function Backdrop(props) {
  const { backdropClicked } = props;
  return <div onClick={backdropClicked} className={styled.Backdrop}></div>;
}
