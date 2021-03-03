import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from './HistoryOrders.module.css';

import HistoryOrder from './HistoryOrder/HistoryOrder';

import { callApi } from '../../api/api';
import Order from '../../model/order';

import { setIngredients } from '../../redux/actions/OrderActions';

class HistoryOrders extends Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = () => {
    callApi('orders', 'GET')
      .then((res) => {
        const orders = [];

        // convert orders object to array
        for (let key in res.data) {
          const { id, customer, ingredients, price } = res.data[key];

          //create an order instance and pass data from api to it
          const order = new Order(id, customer, ingredients, price);
          orders.push(order);
        }

        this.setState({
          orders,
        });
      })
      .catch((err) => console.log(err));
  };

  onDeleteOrder = (id) => {
    callApi(`orders/${id}`, 'DELETE')
      .then((res) => {
        console.log(res);
        this.fetchOrders();
      })
      .catch((err) => console.log(err));
  };

  fetchOrder = (id) => {
    callApi(`orders/${id}`, 'GET')
      .then((res) => {
        this.props.setIngredients(res.data.ingredients);
        this.props.history.push('/');
      })
      .catch((err) => console.log(err));
  };

  onUpdateOrder = (id) => {
    this.fetchOrder(id);
  };

  renderOrders = () => {
    return this.state.orders.map((order) => (
      <HistoryOrder
        key={order.id}
        onDeleteOrder={() => this.onDeleteOrder(order.id)}
        onUpdateOrder={() => this.onUpdateOrder(order.id)}
        price={order.price}
        order={order}
      />
    ));
  };

  render() {
    this.renderOrders();
    return <div className={styled.OrdersHistory}>{this.renderOrders()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.OrderReducer.ingredients,
    price: state.OrderReducer.price,
  };
};

const mapDispatchToProps = { setIngredients };

export default connect(mapStateToProps, mapDispatchToProps)(HistoryOrders);
