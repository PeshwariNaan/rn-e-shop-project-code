import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/productActions";

const initialState = {
  availableProducts: PRODUCTS, // array of all products
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1") // products that were added by individual user.
};

export default (state = initialState, action) => {
  switch(action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== action.pid),
        availableProducts: state.availableProducts.filter(product => product.id !== action.pid),
      }
  }
  return state;
};
