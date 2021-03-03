import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  UPDATE_ORDER,
} from '../actions/actionType';

const originState = {
  order: {
    id: '',
    ingredients: { meat: 0, cheese: 0, bacon: 0, salad: 0 },
    //base price
    price: 3,
    customer: {},
  },
  isUpdateMode: false,
};

const MENU_PRICE = { meat: 3.2, cheese: 2.6, bacon: 2.8, salad: 0.7 };

const ingredientsReducer = (state = originState, action) => {
  let updateIngredients = { ...state.order.ingredients };
  let updatePrice = state.order.price;
  let ingType = '';

  switch (action.type) {
    case UPDATE_ORDER: {
      let updateOrder = action.payload.order;

      return {
        ...state,
        order: { ...updateOrder },
        isUpdateMode: true,
      };
    }

    case ADD_INGREDIENT: {
      ingType = action.payload.ingType;
      //update ingredients
      updateIngredients[ingType]++;

      //update price
      updatePrice += MENU_PRICE[ingType];
      return {
        ...state,
        order: {
          ...state.order,
          ingredients: updateIngredients,
          price: +updatePrice.toFixed(1),
        },
      };
    }

    case REMOVE_INGREDIENT: {
      if (state.order.ingredients[ingType] === 0) return state;
      ingType = action.payload.ingType;

      //update ingredients
      updateIngredients[ingType]--;

      //update price
      updatePrice -= MENU_PRICE[ingType];
      return {
        ...state,
        order: {
          ...state.order,
          ingredients: updateIngredients,
          price: +updatePrice.toFixed(1),
        },
      };
    }

    default:
      break;
  }
  return state;
};

export default ingredientsReducer;
