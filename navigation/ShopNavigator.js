import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import ProductOverviewScreen, {
  screenOptions as ProductOverviewScreenOptions,
} from "../screens/shop/ProductOverviewScreen";
import Colors from "../constants/Colors";

//Set up default nav options
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

// Set up first stack nav
const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductOverviewScreen}
        options={ProductOverviewScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};
