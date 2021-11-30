import * as orderActions from '../actions/orderActions';
import Order from '../../models/order';

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case orderActions.ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),  // temp id before we implement the firebase db
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)  // Set up to preserve immutability 
      };
  }

  return state;
};