import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import productReducers from "./store/reducers/productReducers";

// root-reducr setup so we can have access to all reducers for state management
const rootReducer = combineReducers({
  products: productReducers,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); //We can use devtools here as another argument: composeWithDevTools() - Make sure to remove before deployment

export default function App() {
  return (
    <Provider>
      <View>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
