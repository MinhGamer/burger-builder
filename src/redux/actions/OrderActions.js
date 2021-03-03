import { ADD_INGREDIENT, REMOVE_INGREDIENT, UPDATE_ORDER } from './actionType';

export const addIngredient = (ingType) => {
  return {
    type: ADD_INGREDIENT,
    payload: {
      ingType,
    },
  };
};

export const removeIngredient = (ingType) => {
  return {
    type: REMOVE_INGREDIENT,
    payload: {
      ingType,
    },
  };
};

export const updateOrder = (order) => {
  return {
    type: UPDATE_ORDER,
    payload: {
      order,
    },
  };
};
