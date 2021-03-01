import React from 'react';
import BurgerControl from './BurgerControl/BurgerControl';

import { upperCaseFirstLetter } from '../../helpers/helpers';

import styled from './BurgerControls.module.css';

export default function BurgerControls(props) {
  const {
    ingredients,
    onIncrementIngredient,
    onDecrementIngredient,
    price,
    onOrderBurger,
  } = props;

  const renderControls = [];

  for (let ingKey in ingredients) {
    renderControls.push(
      <BurgerControl
        IsDisabled={ingredients[ingKey] === 0 ? true : false}
        onIncrementIngredient={() => onIncrementIngredient(ingKey)}
        onDecrementIngredient={() => onDecrementIngredient(ingKey)}
        label={upperCaseFirstLetter(ingKey)}
        key={ingKey}
      />
    );
  }

  return (
    <div className={styled.BuildControls}>
      <div className={styled.Price}>Price: {price} $</div>
      {renderControls}
      <button onClick={onOrderBurger} className={styled.OrderButton}>
        ORDER NOW
      </button>
    </div>
  );
}
