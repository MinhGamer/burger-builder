import React, { Component } from 'react';
import { connect } from 'react-redux';

import BurgerControls from '../../components/BurgerControls/BurgerControls';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import ModalSummary from '../../components/ModalSummary/ModalSummary';
import Modal from '../../UI/Modal/Modal';
import styled from './BurgerBuilder.module.css';

import { callApi } from '../../api/api';

import {
  addIngredient,
  removeIngredient,
} from '../../redux/actions/OrderActions';

class BurgerBuilder extends Component {
  state = {
    isOrdering: false,
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

  onContinueOrder = () => {
    this.props.history.push('/contact-form');
  };

  onUpdateOrder = (ingredients, price) => {
    console.log(ingredients, price);

    const order = {
      ingredients,
      price,
    };

    // callApi(`orders/${}`)
  };

  render() {
    return (
      <div className={styled.BurgerBuilder}>
        {/* modal show when click order burger */}
        <Modal
          isShowed={this.state.isOrdering}
          backdropClicked={this.onCancleOrder}>
          <ModalSummary
            price={this.props.price}
            ingredients={this.props.ingredients}
            onCancleOrder={this.onCancleOrder}
            onContinueOrder={this.onContinueOrder}
            onUpdateOrder={this.onUpdateOrder}
            isUpdateMode={this.props.isUpdateMode}
          />
        </Modal>
        <BurgerIngredients ingredients={this.props.ingredients} />
        <BurgerControls
          price={this.props.price}
          addIngredient={this.props.addIngredient}
          removeIngredient={this.props.removeIngredient}
          ingredients={this.props.ingredients}
          onOrderBurger={this.onOrderBurger}
          isUpdateMode={this.props.isUpdateMode}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.OrderReducer.ingredients,
    price: state.OrderReducer.price,
    isUpdateMode: state.OrderReducer.isUpdateMode,
  };
};

const mapDispatchToProps = { addIngredient, removeIngredient };

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
