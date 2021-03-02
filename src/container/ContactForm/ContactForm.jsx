import React, { Component } from 'react';

import styled from './ContactForm.module.css';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

import { upperCaseFirstLetter } from '../../helpers/helpers';

export default class ContactForm extends Component {
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
        isValid: true,
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
        isValid: true,
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
        isValid: true,
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
    isFormValid: true,
  };

  onElementChange = (e, fieldName) => {
    const fieldValue = e.target.value;

    // clone element in form
    const form = { ...this.state.contactForm };
    const inputEle = { ...form[fieldName] };

    //pass value
    inputEle.value = fieldValue;

    //validate
    inputEle.isValid = this.validate(fieldValue, inputEle.validate);

    //update form
    form[fieldName] = inputEle;

    this.setState({
      contactForm: form,
    });
  };

  validate = (fieldValue, validate) => {
    let isValid = true;

    if (validate.isName) {
      isValid &= /^[a-zA-Z]+$/.test(fieldValue);
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

  onElementTouched = (e, fieldName) => {
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

    console.log(this.props);
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
          onFocus={(e) => this.onElementTouched(e, form[inputEle].label)}
          onChange={(e) => this.onElementChange(e, form[inputEle].label)}
        />
      );
    }

    return (
      <form className={styled.ContactForm}>
        <h1>Contact Form</h1>
        {renderForm}
        <div>
          <Button btnType='Success'>ORDER</Button>
          <Button clicked={this.onCancleOrder} btnType='Danger'>
            CANCLE
          </Button>
        </div>
      </form>
    );
  }
}
