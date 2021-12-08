import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { View, Text, FlatList, Button, Platform, Alert, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from '../../constants/Colors';
import * as productActions from "../../store/actions/productActions";
import ProductItem from '../../components/shop/ProductItem'

const UserProductScreen = (props) => {
    const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = id => {
    props.navigation.navigate('EditProducts', {productId: id})
  }

  //Added alert for extra layer of protection when deleting items
  const deleteHandler = id => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productActions.deleteProduct(id));
        }
      }
    ]);
  };


    return (
        <FlatList
        data={userProducts}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              editProductHandler(itemData.item.id)
            }}
          >
            <Button
              color={Colors.primary}
              title="Edit"
              onPress={() => {
                editProductHandler(itemData.item.id)
              }}
            />
            <Button
              color={Colors.primary}
              title="Delete"
              onPress={() => {deleteHandler(itemData.item.id)}}
            />
          </ProductItem>
        )}
      />
        
        
    )
}

export const screenOptions = (navData) => {
    return {
      headerTitle: "Your Products",
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add"
            iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
            onPress={() => {
              navData.navigation.navigate("EditProducts");
            }}
          />
        </HeaderButtons>
      ),
    };
  };
  
  export default UserProductScreen;
  
  const styles = StyleSheet.create({
    noProducts: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
  });




