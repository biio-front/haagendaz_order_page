import { combineReducers } from "redux";
import cart from 'reducers/cart';
import checkOrderItem from 'reducers/checkOrderItem';

const rootReducer = combineReducers({
  cart,
  checkOrderItem
})

export default rootReducer;