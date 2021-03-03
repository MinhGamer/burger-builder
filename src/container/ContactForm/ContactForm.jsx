import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from './ContactForm.module.css';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';

import { upperCaseFirstLetter } from '../../helpers/helpers';
import { callApi } from '../../api/api';

import { updateOrder } from '../../redux/actions/OrderActions';

import Order from '../../model/order';

class ContactForm extends Component {
  state = {
    contactForm: {
      name: {
        label: 'name',
        elementConfig: {
          type: 'text',
        },
        elementType: 'input',
        validate: {
          isName: true,
          isRequired: true,
        },
        isValid: false,
        value: '',
        isTouched: false,
      },
      email: {
        label: 'email',
        elementConfig: {
          type: 'email',
        },
        elementType: 'input',
        validate: {
          isEmail: true,
          isRequired: true,
        },
        isValid: false,
        value: '',
        isTouched: false,
      },
      address: {
        label: 'address',
        type: 'text',
        elementConfig: {
          type: 'text',
        },
        validate: {
          isRequired: true,
        },
        elementType: 'input',
        isValid: false,
        value: '',
      },
      method: {
        label: 'method',
        elementType: 'select',
        elementConfig: {
          options: ['fastest', 'cheapest', 'normal'],
        },
        validate: {},
        isValid: true,
        value: 'fastest',
      },
    },
    isFormValid: false,
    isSubmitted: false,
  };

  componentDidMount() {
    //if user try to fill the form before building burger
    //push them to go back to builder page
    const { ingredients } = this.props;

    const totalIngs = Object.values(ingredients).reduce(
      (preValue, curValue) => preValue + curValue,
      0
    );

    if (totalIngs === 0) {
      this.props.history.push('/');
    }
  }

  onFieldChange = (e, fieldName) => {
    const fieldValue = e.target.value;

    // clone element in form
    const form = { ...this.state.contactForm };
    const inputEle = { ...form[fieldName] };

    //pass value
    inputEle.value = fieldValue;

    //validate field
    inputEle.isValid = this.validate(fieldValue, inputEle.validate);

    //update form
    form[fieldName] = inputEle;

    let isFormValid = true;
    //validate form
    for (let fieldKey in form) {
      isFormValid &= form[fieldKey].isValid;
    }

    this.setState({
      contactForm: form,
      isFormValid,
    });
  };

  validate = (fieldValue, validate) => {
    let isValid = true;

    if (validate.isName) {
      isValid &= /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/.test(
        fieldValue
      );
    }

    if (validate.isEmail) {
      isValid &= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        fieldValue
      );
    }

    if (validate.required) {
      isValid &= fieldValue.trim() !== '';
    }

    return isValid;
  };

  onFieldTouched = (e, fieldName) => {
    // clone form
    const form = { ...this.state.contactForm };
    const field = { ...form[fieldName] };

    //set touched to true and validate
    field.isTouched = true;
    field.value = e.target.value;
    field.isValid = this.validate(field.value, field.validate);

    form[fieldName] = field;
    this.setState({
      contactForm: form,
    });
  };

  onCancleOrder = (e) => {
    e.preventDefault();
    this.props.history.push('/');
  };

  resetForm = () => {
    const form = { ...this.state.contactForm };
    for (let field in form) {
      form[field].value = '';
    }

    this.setState({
      contactForm: form,
    });
  };

  onSubmitOrder = (e) => {
    e.preventDefault();

    const { name, email, address } = this.state.contactForm;
    const order = {
      customer: {
        name: name.value,
        email: email.value,
        address: address.value,
      },
      ingredients: this.props.ingredients,
      price: this.props.price,
    };

    this.resetForm();

    callApi('orders', 'POST', order)
      .then((res) => {
        this.setState({
          isSubmitted: true,
        });

        const resetOrder = new Order(
          '',
          {},
          { meat: 0, cheese: 0, bacon: 0, salad: 0 },
          0
        );

        //set order back to 0 before switching to home page
        this.props.updateOrder(resetOrder);
      })
      .catch((err) => console.log(err));
  };

  renderSubmittedSuccessModal = () => {
    return (
      <Modal
        isShowed={this.state.isSubmitted}
        backdropClicked={this.goToHomePage}>
        <h1>Your order is completed!</h1>
      </Modal>
    );
  };

  goToHomePage = () => {
    this.props.history.push('/');
  };

  render() {
    const renderForm = [];

    const form = this.state.contactForm;

    for (let inputEle in form) {
      renderForm.push(
        <Input
          key={form[inputEle].label}
          label={upperCaseFirstLetter(form[inputEle].label)}
          elementType={form[inputEle].elementType}
          elementConfig={form[inputEle].elementConfig}
          value={form[inputEle].value}
          isValid={form[inputEle].isValid}
          isTouched={form[inputEle].isTouched}
          onFocus={(e) => this.onFieldTouched(e, form[inputEle].label)}
          onChange={(e) => this.onFieldChange(e, form[inputEle].label)}
        />
      );
    }

    return (
      <form className={styled.ContactForm}>
        {/* //render when submit succees */}
        {this.renderSubmittedSuccessModal()}

        <h1>Contact Form</h1>
        {renderForm}
        <div>
          <Button
            // idDisabled={true}
            idDisabled={!this.state.isFormValid}
            clicked={this.onSubmitOrder}
            btnType='Success'>
            ORDER
          </Button>
          <Button clicked={this.onCancleOrder} btnType='Danger'>
            CANCLE
          </Button>
        </div>
      </form>
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

export default connect(mapStateToProps, { updateOrder })(ContactForm);
