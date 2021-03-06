import CartItem from "../../models/cart-item";
import * as CartActionTypes from "../actions/cartActions";
import { ADD_ORDER } from "../actions/orderActions";
import { DELETE_PRODUCT } from "../actions/productActions";

//Note** Our reducers must be synchronous but with the addition of redux thunk - We can include async code in our action creators

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      const addedProduct = action.payload; // Payload is the product - see cart action
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        //already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice, // Update totalAmount from the initial state
        // We are keeping all previous items in the cart with ...state and then using the id of the added product as the key for the new cart item
      };
    case CartActionTypes.REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce quantity if there are more than 1 of any item rather than remove all
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    case ADD_ORDER:
      return initialState
      case DELETE_PRODUCT:
        if (!state.items[action.pid]) {
          return state
        }
        const updatedItems = {
          ...state.items
        }
        const itemTotal = state.items[action.pid].sum;
        delete updatedItems[action.pid]
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount - itemTotal
        }
  }
  return state;
};
