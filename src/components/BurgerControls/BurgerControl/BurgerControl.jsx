import React from 'react';

import styled from './BurgerControl.module.css';

export default function BurgerControl(props) {
  const {
    label,
    onIncrementIngredient,
    onDecrementIngredient,
    IsDisabled,
  } = props;
  return (
    <div className={styled.BuildControl}>
      <div className={styled.Label}>{label}</div>
      <button onClick={onIncrementIngredient} className={styled.More}>
        More
      </button>
      <button
        disabled={IsDisabled}
        onClick={onDecrementIngredient}
        className={styled.Less}>
        Less
      </button>
    </div>
  );
}
