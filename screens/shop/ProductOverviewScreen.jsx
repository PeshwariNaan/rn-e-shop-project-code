import React from "react";
import {
  Text,
  View,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";

const ProductOverviewScreen = (props) => {
  //Allows us to tap into the state to get access to the availableProducts
  const products = useSelector((state) => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      // keyExtractor={item => item.id} // ** Later versions of react-native no longer need keyExtractor **
      renderItem={(itemData) => 
      (
        <ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        >
        <Button
        color={Colors.primary}
        title="View Details"
        onPress={() => {}}
         />
         <Button
        color={Colors.primary}
        title="To Cart"
        onPress={() => {}}
         />

        </ProductItem>
      )}
    />
    
  );
};

export const screenOptions = navData => {
    return {
        headerTitle: 'All Products'
    }
}

export default ProductOverviewScreen;

const styles = StyleSheet.create({});
