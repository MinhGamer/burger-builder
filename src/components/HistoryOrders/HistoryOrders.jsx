import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from './HistoryOrders.module.css';

import HistoryOrder from './HistoryOrder/HistoryOrder';

import { callApi } from '../../api/api';
import Order from '../../model/order';

import { updateOrder } from '../../redux/actions/OrderActions';

import { RESULTS_PER_PAGE } from '../../helpers/config';
import Button from '../../UI/Button/Button';

class HistoryOrders extends Component {
  state = {
    orders: [],
    page: 1,
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

  onUpdateOrder = (id) => {
    //fetch order
    callApi(`orders/${id}`, 'GET')
      .then((res) => {
        this.props.updateOrder(res.data);
        this.props.history.push('/');
      })
      .catch((err) => console.log(err));
  };

  renderOrders = (page) => {
    const start = (page - 1) * RESULTS_PER_PAGE;
    const end = page * RESULTS_PER_PAGE;

    return this.state.orders
      .slice(start, end)
      .map((order) => (
        <HistoryOrder
          key={order.id}
          onDeleteOrder={() => this.onDeleteOrder(order.id)}
          onUpdateOrder={() => this.onUpdateOrder(order.id)}
          price={order.price}
          order={order}
        />
      ));
  };

  pagination = (results) => {
    const PAGES = results / RESULTS_PER_PAGE;

    //no pagination button
    if (results < RESULTS_PER_PAGE) {
    }
  };

  render() {
    const PAGES = Math.ceil(this.state.orders.length / RESULTS_PER_PAGE);
    const currentPage = this.state.page;

    return (
      <div className={styled.OrdersHistory}>
        {this.renderOrders(this.state.page)}

        {this.state.page === 1 ? null : (
          <Button
            configStyle={`${styled.PaginationBtn} ${styled.PaginationPrev}`}
            clicked={() => this.setState({ page: +currentPage - 1 })}
            btnType='Danger'>
            Previous
          </Button>
        )}
        {this.state.page === PAGES ? null : (
          <Button
            configStyle={`${styled.PaginationBtn} ${styled.PaginationNext}`}
            clicked={() => this.setState({ page: +currentPage + 1 })}
            btnType='Danger'>
            Next
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { ingredients, price } = state.OrderReducer.order;
  return {
    ingredients,
    price,
  };
};

const mapDispatchToProps = { updateOrder };

export default connect(mapStateToProps, mapDispatchToProps)(HistoryOrders);
