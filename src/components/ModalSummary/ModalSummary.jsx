import React from 'react';

import { upperCaseFirstLetter } from '../../helpers/helpers';
import Button from '../../UI/Button/Button';

import styled from './ModalSummary.module.css';

export default function ModalSummary(props) {
  const { ingredients, onCancleOrder, price, onContinueOrder } = props;
  const renderIngredients = [];

  for (let ingKey in ingredients) {
    const ingredientEle = (
      <p
        key={ingKey}
        className={`${styled[upperCaseFirstLetter(ingKey)]} ${
          styled.Ingredient
        }`}>
        {upperCaseFirstLetter(ingKey)} - {ingredients[ingKey]}
      </p>
    );
    renderIngredients.push(ingredientEle);
  }

  return (
    <div>
      <h1 className={styled.Title}>Your lovely burger</h1>
      {renderIngredients}
      <p className={styled.Price}>Price: {price}$</p>
      <Button clicked={onContinueOrder} btnType='Success'>
        CONTINUE
      </Button>
      <Button clicked={onCancleOrder} btnType='Danger'>
        CANCLE
      </Button>
    </div>
  );
}
