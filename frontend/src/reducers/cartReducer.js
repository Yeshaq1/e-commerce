import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_RESET_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartProducts: [], shippingAddress: {} },
  action
) => {
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

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      };

    case CART_RESET_ITEM:
      return {
        ...state,
        cartProducts: [],
      };

    default:
      return state;
  }
};
