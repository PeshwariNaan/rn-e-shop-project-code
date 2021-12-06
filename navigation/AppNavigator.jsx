import React from 'react';
import { useSelector } from 'react-redux';
import { ShopNavigator } from './ShopNavigator'
import { NavigationContainer } from '@react-navigation/native';

const AppNavigator = props => {
    return (
        <NavigationContainer>
            <ShopNavigator />
        </NavigationContainer>
    )
}

export default AppNavigator