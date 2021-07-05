import { combineReducers } from 'redux';
import { productListReducer, productDetailReducer } from './productReducer';
import { cartReducer } from './cartReducer';
import { authReducer } from './authReducer';
import { profileReducer } from './profileReducer';

export default combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cartDetail: cartReducer,
  authDetail: authReducer,
  profileDetail: profileReducer,
});
