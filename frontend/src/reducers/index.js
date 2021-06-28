import { combineReducers } from 'redux';
import { productListReducer, productDetailReducer } from './productReducer';
import { cartReducer } from './cartReducer';

export default combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cartDetail: cartReducer,
});
