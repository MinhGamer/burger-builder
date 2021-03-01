import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '../Backdrop/Backdrop';

import styled from './Modal.module.css';

export default function Modal(props) {
  const { isShowed, backdropClicked } = props;

  let modal = null;
  if (isShowed) {
    modal = (
      <React.Fragment>
        <Backdrop backdropClicked={backdropClicked} />
        <div className={styled.Modal}>{props.children}</div>;
      </React.Fragment>
    );
  }

  return ReactDOM.createPortal(modal, document.getElementById('modal'));
}
