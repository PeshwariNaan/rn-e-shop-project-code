import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import ProductOverviewScreen, {
  screenOptions as ProductOverviewScreenOptions,
} from "../screens/shop/ProductOverviewScreen";
import Colors from "../constants/Colors";
import ProductDetailsScreen, {screenOptions as ProductDetailsScreenOptions } from '../screens/shop/ProductDetailsScreen'
import CartScreen, {screenOptions as CartScreenOptions} from "../screens/shop/CartScreen";

//Set up default nav options
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

// Set up first stack nav - this will handle all navigation for Product Overview, Product Detail and the Cart screens
const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductOverviewScreen}
        options={ProductOverviewScreenOptions}
      />
    <ProductsStackNavigator.Screen 
      name="ProductDetail"
      component={ProductDetailsScreen}
      options={ProductDetailsScreenOptions}
    />
    <ProductsStackNavigator.Screen
    name="Cart"
    component={CartScreen}
    options={CartScreenOptions}
    />
    </ProductsStackNavigator.Navigator>
  );
};
