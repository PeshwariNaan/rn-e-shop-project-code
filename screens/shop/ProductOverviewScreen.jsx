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
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import * as CartActions from '../../store/actions/cartActions'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const ProductOverviewScreen = (props) => {
  //Allows us to tap into the state to get access to the availableProducts
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch()

  // Function: Receives product id and title to navigate to particular items detail page
const selectItemHandler = (id, title) => {
  props.navigation.navigate('ProductDetail', {
    productId: id,
    productTitle: title // These identifiers are used in the Details screen - take note of the syntax as they are used to understand how react nav 6x works
  })
}

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
        onSelect={() => {selectItemHandler(itemData.item.id, itemData.item.title)}}
        >
        <Button
        color={Colors.primary}
        title="View Details"
        onPress={() => {selectItemHandler(itemData.item.id, itemData.item.title)}}
         />
         <Button
        color={Colors.primary}
        title="To Cart"
        onPress={() => {dispatch(CartActions.addToCart(itemData.item))}}
         />

        </ProductItem>
      )}
    />
    
  );
};

export const screenOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
            title='Menu'
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
            />
          </HeaderButtons>
        ),
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Cart"
              iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              onPress={() => {
                navData.navigation.navigate('Cart');
              }}
            />
          </HeaderButtons>
        )
    }
}

export default ProductOverviewScreen;

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
