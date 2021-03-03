import React, { Component } from 'react';
import { connect } from 'react-redux';

import BurgerControls from '../../components/BurgerControls/BurgerControls';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import ModalSummary from '../../components/ModalSummary/ModalSummary';
import Modal from '../../UI/Modal/Modal';
import styled from './BurgerBuilder.module.css';

import Order from '../../model/order';

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

  onUpdateOrder = () => {
    const { id, ingredients, price, customer } = this.props.order;

    const updateOrder = new Order(id, customer, ingredients, price);

    console.log(updateOrder);

    callApi(`orders/${id}`, 'PUT', updateOrder)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className={styled.BurgerBuilder}>
        {/* modal show when click order burger */}
        <Modal
          isShowed={this.state.isOrdering}
          backdropClicked={this.onCancleOrder}>
          <ModalSummary
            price={this.props.order.price}
            ingredients={this.props.order.ingredients}
            onCancleOrder={this.onCancleOrder}
            onContinueOrder={this.onContinueOrder}
            onUpdateOrder={this.onUpdateOrder}
            isUpdateMode={this.props.isUpdateMode}
          />
        </Modal>
        <BurgerIngredients ingredients={this.props.order.ingredients} />
        <BurgerControls
          price={this.props.order.price}
          addIngredient={this.props.addIngredient}
          removeIngredient={this.props.removeIngredient}
          ingredients={this.props.order.ingredients}
          onOrderBurger={this.onOrderBurger}
          isUpdateMode={this.props.isUpdateMode}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // const { id, ingredients, price } = state.OrderReducer.order;
  return {
    order: state.OrderReducer.order,
    isUpdateMode: state.OrderReducer.isUpdateMode,
  };
};

const mapDispatchToProps = { addIngredient, removeIngredient };

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
