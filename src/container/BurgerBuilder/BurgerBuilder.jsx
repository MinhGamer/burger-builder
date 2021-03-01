import React, { Component } from 'react';
import BurgerControls from '../../components/BurgerControls/BurgerControls';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import Checkout from '../../components/Checkout/Checkout';
import Modal from '../../UI/Modal/Modal';

const MENU_PRICE = { meat: 3.2, cheese: 2.6, bacon: 2.8, salad: 0.7 };

export default class BurgerBuilder extends Component {
  state = {
    ingredients: { meat: 0, cheese: 0, bacon: 0, salad: 0 },
    //base price
    price: 3,
    isOrdering: false,
  };

  onIncrementIngredient = (type) => {
    if (!type) return;

    //update ingredients
    const updateIngredients = { ...this.state.ingredients };
    updateIngredients[type]++;

    //update price
    let updatePrice = this.state.price;
    updatePrice += MENU_PRICE[type];

    this.setState({
      ingredients: updateIngredients,
      price: +updatePrice.toFixed(1),
    });
  };

  onDecrementIngredient = (type) => {
    if (!type) return;
    if (this.state.ingredients[type] === 0) return;

    //update ingredients
    const updateIngredients = { ...this.state.ingredients };
    updateIngredients[type]--;

    //update price
    let updatePrice = this.state.price;
    updatePrice -= MENU_PRICE[type];

    this.setState({
      ingredients: updateIngredients,
      price: +updatePrice.toFixed(1),
    });
  };

  onOrderBurger = () => {
    this.setState({
      isOrdering: true,
    });
  };

  onCancleOrder = () => {
    this.setState({
      isOrdering: false,
    });
  };

  render() {
    return (
      <React.Fragment>
        {/* modal show when click order burger */}
        <Modal
          isShowed={this.state.isOrdering}
          backdropClicked={this.onCancleOrder}>
          <Checkout />
        </Modal>
        <BurgerIngredients ingredients={this.state.ingredients} />
        <BurgerControls
          price={this.state.price}
          onIncrementIngredient={this.onIncrementIngredient}
          onDecrementIngredient={this.onDecrementIngredient}
          ingredients={this.state.ingredients}
          onOrderBurger={this.onOrderBurger}
        />
      </React.Fragment>
    );
  }
}
