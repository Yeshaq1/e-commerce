import { combineReducers } from 'redux';
import { productListReducer, productDetailReducer } from './productReducer';

export default combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
});
