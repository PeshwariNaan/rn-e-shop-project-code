import PRODUCTS from "../../data/dummy-data";

const initialState = {
  availableProducts: PRODUCTS, // array of all products
  userProducts: PRODUCTS.fileter((prod) => prod.ownerId === "u1"), // products that were added by individual user.
};

export default (state = initialState, action) => {
  return state;
};
