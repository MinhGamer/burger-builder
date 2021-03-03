import React from 'react';

import styled from './HistoryOrder.module.css';
import { upperCaseFirstLetter } from '../../../helpers/helpers';
import Button from '../../../UI/Button/Button';

export default function Order(props) {
  const { price, onDeleteOrder } = props;
  const { ingredients } = props.order;

  const renderIngredients = [];

  for (let ingKey in ingredients) {
    const Ingkey = upperCaseFirstLetter(ingKey);
    const ingELe = (
      <span key={ingKey} className={`${styled[Ingkey]} ${styled.Ingredient}`}>
        {Ingkey} - {ingredients[ingKey]}
      </span>
    );
    renderIngredients.push(ingELe);
  }

  return (
    <div className={styled.HistoryOrder}>
      <span className={styled.Title}>Ingrediens</span>
      {renderIngredients}
      <p className={styled.Price}>Price: {price} $</p>
      <div className={styled.ModifyBtn}>
        <Button clicked={onDeleteOrder} btnType='Danger'>
          Delete
        </Button>
        <Button btnType='Success'>Update</Button>
      </div>
    </div>
  );
}