import React from 'react'
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import * as CartActions from '../../store/actions/cartActions'

const ProductDetailsScreen = (props) => {
    const productId = props.route.params.productId
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
    const dispatch  = useDispatch()


    return (
        <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(CartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
    )
}

// We can send the productTitle using params to the navigator - This will dynamically set the header title
export const screenOptions = navData => {
    return {
        headerTitle: navData.route.params.productTitle
    }
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
      },
      actions: {
        marginVertical: 10,
        alignItems: 'center'
      },
      price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'
      },
      description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
      }
})
