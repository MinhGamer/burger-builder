import React from 'react';

import styled from './BurgerControl.module.css';

export default function BurgerControl(props) {
  const { label, addIngredient, removeIngredient, IsDisabled } = props;
  return (
    <div className={styled.BuildControl}>
      <div className={styled.Label}>{label}</div>
      <button onClick={addIngredient} className={styled.More}>
        More
      </button>
      <button
        disabled={IsDisabled}
        onClick={removeIngredient}
        className={styled.Less}>
        Less
      </button>
    </div>
  );
}
