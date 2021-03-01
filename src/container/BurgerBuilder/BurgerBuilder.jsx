import React, { Component } from 'react';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';

export default class BurgerBuilder extends Component {
  state = {
    ingredients: { meat: 0, cheese: 1, bacon: 1, salad: 1 },
    price: 3,
  };

  onIncrementIngredient = (type) => {
    if (!type) return;

    const updateIngredients = { ...this.state.ingredients };
    updateIngredients[type]++;
    this.setState({
      ingredients: updateIngredients,
    });
  };

  onDecrementIngredient = (type) => {
    if (!type) return;
    if (this.state.ingredients[type] === 0) return;

    const updateIngredients = { ...this.state.ingredients };
    updateIngredients[type]--;
    this.setState({
      ingredients: updateIngredients,
    });
  };

  render() {
    return (
      <React.Fragment>
        Burger Builder
        <BurgerIngredients ingredients={this.state.ingredients} />
        <BurgerControls
          onIncrementIngredient={this.onIncrementIngredient}
          onDecrementIngredient={this.onDecrementIngredient}
          ingredients={this.state.ingredients}
        />
      </React.Fragment>
    );
  }
}
