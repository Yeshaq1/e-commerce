import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartProducts: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ADD_ITEM:
      const existsInCart = state.cartProducts.find(
        (item) => item._id === payload._id
      );

      if (existsInCart) {
        return {
          ...state,
          cartProducts: state.cartProducts.map((x) =>
            x === existsInCart ? { ...x, qty: payload.qty } : x
          ),
        };
      }

      return {
        ...state,
        cartProducts: [...state.cartProducts, payload],
      };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          (product) => product._id !== payload
        ),
      };

    default:
      return state;
  }
};
