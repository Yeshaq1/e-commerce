import { combineReducers } from 'redux';
import {
  productListReducer,
  productDetailReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
} from './productReducer';
import { cartReducer } from './cartReducer';
import { authReducer } from './authReducer';
import { profileReducer } from './profileReducer';
import {
  GetAllOrdersReducer,
  orderCreateReducer,
  orderGetReducer,
  ordersGetReducer,
  orderUpdateReducer,
} from './orderReducer';
import { paymentIntentReducer } from './paymentReducer';
import {
  userDeleteReducer,
  userDetailReducer,
  userListReducer,
} from './userListReducer';

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
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userDetail: userDetailReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  allOrders: GetAllOrdersReducer,
  orderUpdate: orderUpdateReducer,
  productReview: productReviewCreateReducer,
  topProducts: productTopRatedReducer,
});
