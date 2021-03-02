import { ADD_INGREDIENT, REMOVE_INGREDIENT } from './actionType';

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
