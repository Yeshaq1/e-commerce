import { combineReducers } from 'redux';
import { productListReducer, productDetailReducer } from './productReducer';
import { cartReducer } from './cartReducer';
import { authReducer } from './authReducer';

export default combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cartDetail: cartReducer,
  authDetail: authReducer,
});
