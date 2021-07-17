import { combineReducers } from 'redux';
import { productListReducer, productDetailReducer } from './productReducer';
import { cartReducer } from './cartReducer';
import { authReducer } from './authReducer';
import { profileReducer } from './profileReducer';
import {
  orderCreateReducer,
  orderGetReducer,
  ordersGetReducer,
} from './orderReducer';
import { paymentIntentReducer } from './paymentReducer';

export default combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cartDetail: cartReducer,
  authDetail: authReducer,
  profileDetail: profileReducer,
  orderCreate: orderCreateReducer,
  paymentIntent: paymentIntentReducer,
  orderById: orderGetReducer,
  myOrders: ordersGetReducer,
});
