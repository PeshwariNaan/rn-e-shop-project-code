import React from 'react';
import { useSelector } from 'react-redux';
import { ProductsNavigator } from './ShopNavigator'
import { NavigationContainer } from '@react-navigation/native';

const AppNavigator = props => {
    return (
        <NavigationContainer>
            <ProductsNavigator />
        </NavigationContainer>
    )
}

export default AppNavigator