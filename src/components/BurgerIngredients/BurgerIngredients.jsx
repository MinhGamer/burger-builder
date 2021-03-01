import React from 'react';

import styled from './BurgerIngredients.module.css';

const upperCaseFirstLetter = (string) => {
  return string.substring(0, 1).toUpperCase() + string.substring(1);
};

export default function BurgerIngredients(props) {
  const { ingredients } = props;

  const renderIngredients = [];

  for (let ingKey in ingredients) {
    // console.log(upperCaseFirstLetter(ingKey));

    //add ingredient base on its type
    //Ex: bacon, salad ...
    for (let i = 0; i < ingredients[ingKey]; i++) {
      const ingredient = (
        <div
          key={Math.random()}
          className={styled[upperCaseFirstLetter(ingKey)]}></div>
      );
      renderIngredients.push(ingredient);
    }
  }

  return (
    <div className={styled.Ingredients}>
      <div className={styled.BreadTop}>
        <div className={styled.Seeds1}></div>
        <div className={styled.Seeds2}></div>
      </div>
      {renderIngredients}
      <div className={styled.BreadBottom}></div>
    </div>
  );
}
