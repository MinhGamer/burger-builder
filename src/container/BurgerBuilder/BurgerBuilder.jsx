import React, { Component } from 'react';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';

export default class BurgerBuilder extends Component {
  state = {
    ingredients: { meat: 1, cheese: 2, bacon: 1, salad: 1 },
    price: 3,
  };

  render() {
    return (
      <React.Fragment>
        Burger Builder
        <BurgerIngredients ingredients={this.state.ingredients} />
        <BurgerControls />
      </React.Fragment>
    );
  }
}
