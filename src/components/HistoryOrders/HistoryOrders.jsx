import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import styled from './HistoryOrders.module.css';
import { URL } from '../../api/api';

import HistoryOrder from './HistoryOrder/HistoryOrder';

class HistoryOrders extends Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    axios
      .get(`${URL}/orders.json`)
      .then((res) => {
        const orders = Object.values(res.data);

        this.setState({
          orders,
        });
      })
      .catch((err) => console.log(err));
  }

  renderOrders = () => {
    return this.state.orders.map((order) => (
      <HistoryOrder price={this.props.price} order={order} />
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
