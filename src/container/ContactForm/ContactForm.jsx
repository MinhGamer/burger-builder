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
        validate: {},
        isValid: false,
        value: '',
      },
      email: {
        label: 'email',
        elementConfig: {
          type: 'email',
        },
        elementType: 'input',
        validate: {},
        isValid: false,
        value: '',
      },
      address: {
        label: 'address',
        type: 'text',
        elementConfig: {
          type: 'text',
        },
        elementType: 'input',
        validate: {},
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
        isValid: false,
        value: '',
      },
    },
    isFormValid: false,
  };

  onElementChange = (e, label) => {
    // console.log(e.target.value, label);

    // clone element in form
    const form = { ...this.state.contactForm };
    const inputEle = { ...form[label] };

    //pass value
    inputEle.value = e.target.value;

    //update form
    form[label] = inputEle;

    this.setState({
      contactForm: form,
    });
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
          <Button btnType='Danger'>CANCLE</Button>
        </div>
      </form>
    );
  }
}
