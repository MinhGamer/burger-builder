import React from 'react';
import BurgerControl from './BurgerControl/BurgerControl';

import { upperCaseFirstLetter } from '../../helpers/helpers';

import styled from './BurgerControls.module.css';

export default function BurgerControls(props) {
  const {
    ingredients,
    addIngredient,
    removeIngredient,
    price,
    onOrderBurger,
    isUpdateMode,
  } = props;

  const renderControls = [];

  let totalIngredients = 0;

  for (let ingKey in ingredients) {
    totalIngredients += ingredients[ingKey];
    renderControls.push(
      <BurgerControl
        IsDisabled={ingredients[ingKey] === 0 ? true : false}
        addIngredient={() => addIngredient(ingKey)}
        removeIngredient={() => removeIngredient(ingKey)}
        label={upperCaseFirstLetter(ingKey)}
        key={ingKey}
      />
    );
  }

  return (
    <div className={styled.BuildControls}>
      <div className={styled.Price}>Price: {price} $</div>
      {renderControls}
      <button
        disabled={totalIngredients === 0 ? true : false}
        onClick={onOrderBurger}
        className={styled.OrderButton}>
        {isUpdateMode ? 'UPDATE' : 'ORDER NOW'}
      </button>
    </div>
  );
}
