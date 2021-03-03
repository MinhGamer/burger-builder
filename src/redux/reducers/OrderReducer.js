import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
} from '../actions/actionType';

const originState = {
  id: '',
  ingredients: { meat: 0, cheese: 0, bacon: 0, salad: 0 },
  //base price
  price: 3,
  customer: {},
  isUpdateMode: false,
};

const MENU_PRICE = { meat: 3.2, cheese: 2.6, bacon: 2.8, salad: 0.7 };

const ingredientsReducer = (state = originState, action) => {
  let updateIngredients = { ...state.ingredients };
  let updatePrice = state.price;
  let ingType = '';

  switch (action.type) {
    case SET_INGREDIENTS: {
      let updateIngredients = action.payload.ingredients;

      for (let ingKey in updateIngredients) {
        //total price = ingredients amount * price/unit
        updatePrice += updateIngredients[ingKey] * MENU_PRICE[ingKey];
      }

      return {
        ...state,
        ingredients: updateIngredients,
        price: +updatePrice.toFixed(1),
        isUpdateMode: true,
      };
    }

    case ADD_INGREDIENT: {
      updateIngredients = { ...state.ingredients };
      ingType = action.payload.ingType;
      //update ingredients
      updateIngredients[ingType]++;

      //update price
      updatePrice += MENU_PRICE[ingType];
      return {
        ...state,
        ingredients: updateIngredients,
        price: +updatePrice.toFixed(1),
      };
    }

    case REMOVE_INGREDIENT: {
      if (state.ingredients[ingType] === 0) return state;
      ingType = action.payload.ingType;

      //update ingredients
      updateIngredients[ingType]--;

      //update price
      updatePrice -= MENU_PRICE[ingType];
      return {
        ...state,
        ingredients: updateIngredients,
        price: +updatePrice.toFixed(1),
      };
    }

    default:
      break;
  }
  return state;
};

export default ingredientsReducer;
