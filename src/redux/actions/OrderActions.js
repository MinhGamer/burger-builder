import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
} from './actionType';

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

export const setIngredients = (ingredients) => {
  return {
    type: SET_INGREDIENTS,
    payload: {
      ingredients,
    },
  };
};
