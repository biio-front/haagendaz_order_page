import { combineReducers } from "redux";
import cart from 'reducers/cart';
import checkOrderItem from 'reducers/checkOrderItem';
import user from 'reducers/user';

const rootReducer = combineReducers({
  cart,
  checkOrderItem,
  user,
})

export default rootReducer;