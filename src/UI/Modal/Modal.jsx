import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '../Backdrop/Backdrop';

import styled from './Modal.module.css';

export default function Modal(props) {
  const { isShowed, backdropClicked } = props;

  let modal = (
    <React.Fragment>
      <Backdrop isShowed={isShowed} backdropClicked={backdropClicked} />
      <div
        style={{
          transform: isShowed ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: isShowed ? '1' : '0',
        }}
        className={styled.Modal}>
        {props.children}
      </div>
      ;
    </React.Fragment>
  );
  // if (isShowed) {
  //   modal = (
  //     <React.Fragment>
  //       <Backdrop backdropClicked={backdropClicked} />
  //       <div
  //         style={{
  //           transform: isShowed ? 'translateY(0)' : 'translateY(-100vh)',
  //           opacity: isShowed ? '1' : '0',
  //         }}
  //         className={styled.Modal}>
  //         {props.children}
  //       </div>
  //       ;
  //     </React.Fragment>
  //   );
  // }

  return ReactDOM.createPortal(modal, document.getElementById('modal'));
}
