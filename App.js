import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import productReducers from "./store/reducers/productReducers";
import cartReducers from "./store/reducers/cartReducers";
import AppNavigator from "./navigation/AppNavigator";
import orderReducer from "./store/reducers/orderReducer";

// root-reducr setup so we can have access to all reducers for state management
const rootReducer = combineReducers({
  products: productReducers,
  cart: cartReducers, 
  orders: orderReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); //We can use devtools here as another argument: composeWithDevTools() - Make sure to remove before deployment

// Function for use of fonts - need to install expo-font and expo-app-loading
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    //function needed to load fonts - calls with the startAsync prop
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
 
  return (
    <Provider store={store}>
     <AppNavigator/>
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
