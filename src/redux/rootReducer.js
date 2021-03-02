import IngReducer from './reducers/IngredientsReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  IngReducer: IngReducer,
});

export default rootReducer;
