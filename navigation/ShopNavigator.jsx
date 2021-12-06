import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  Platform,
  SafeAreaView,
  Button,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import ProductOverviewScreen, {
  screenOptions as ProductOverviewScreenOptions,
} from "../screens/shop/ProductOverviewScreen";
import Colors from "../constants/Colors";
import ProductDetailsScreen, {
  screenOptions as ProductDetailsScreenOptions,
} from "../screens/shop/ProductDetailsScreen";
import CartScreen, {
  screenOptions as CartScreenOptions,
} from "../screens/shop/CartScreen";
import OrdersScreen, {
  screenOptions as OrdersScreenOptions,
} from "../screens/shop/OrdersScreen";
import UserProductScreen, { screenOptions as UserProductScreenOptions} from "../screens/user/UserProductScreen";
import { NavigationContainer } from "@react-navigation/native";

//Set up default nav options
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
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

// Set up a different stack navigator for orders

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={OrdersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductScreen}
        options={UserProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

// Set up for the drawer navigator - here we can use the stack navigators to create the options in the drawer
const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <Button
                title="Logout"
                color={Colors.primary}
                onPress={() => {}}
              />
            </SafeAreaView>
          </View>
        );
      }}
      screenOptions={{
        activeTintColor: Colors.primary,
        drawerActiveTintColor: Colors.primary,
        drawerStyle: {
          paddingTop: "20%", // Pushes all items in drawer down
        },
        drawerItemStyle: {
          paddingTop: 10,
        },
        drawerInactiveTintColor: "#808080",
        headerShown: false,
      }}
    >
      <ShopDrawerNavigator.Screen
        name="All Products"
        component={ProductsNavigator}
        screenOptions={{}}
        options={({ navigation }) => ({
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
        })}
      />
      <ShopDrawerNavigator.Screen
        name="Your Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

// options={({ navigation }) => ({ //This is an example to use navigation in the default headers

//title: 'All Products',
// backgroundColor: Colors.primary,
// headerTitle: () => (
//   <Text style={styles.headerTitle}>All Products</Text>
// ),
// headerRight: () => (
//   <View style={styles.headerRight}>
//     <Ionicons
//       name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
//       size={23}
//       color={Platform.OS === "android" ? "white" : Colors.primary}
//       onPress={() => {
//         navigation.navigate("Cart");
//       }}
//     />
//   </View>
// ),
