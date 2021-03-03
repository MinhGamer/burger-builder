import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from './HistoryOrders.module.css';

import HistoryOrder from './HistoryOrder/HistoryOrder';

import { callApi } from '../../api/api';
import Order from '../../model/order';

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
    console.log(id);
    callApi(`orders.json/${id}`, 'DELETE')
      .then((res) => {
        console.log(res);
        this.fetchOrders();
      })
      .catch((err) => console.log(err));
  };

  renderOrders = () => {
    return this.state.orders.map((order) => (
      <HistoryOrder
        key={order.id}
        onDeleteOrder={() => this.onDeleteOrder(order.id)}
        price={this.props.price}
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
    ingredients: state.IngReducer.ingredients,
    price: state.IngReducer.price,
  };
};

export default connect(mapStateToProps, null)(HistoryOrders);
