import React from 'react';
import { useSelector } from 'react-redux';
import { ShopNavigator, AuthNavigator } from './ShopNavigator'
import { NavigationContainer } from '@react-navigation/native';
import StartupScreen from '../screens/StartUpScreen';

const AppNavigator = (props) => {
    const isAuth = useSelector((state) => !!state.auth.token);
    const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  
  // All of this changed because we no longer have a switch navigator
    return (
      <NavigationContainer>
       {isAuth && <ShopNavigator />}
       {!isAuth && didTryAutoLogin && <AuthNavigator />}
       {!isAuth && !didTryAutoLogin && <StartupScreen />}
      </NavigationContainer>
    );
  };
export default AppNavigator