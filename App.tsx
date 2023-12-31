// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Products from './screens/Products';
import ShoppingCart from './screens/ShoppingCart';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Products">
        <Stack.Screen name="Products" component={Products} options={{ title: 'Products' }} />
        <Stack.Screen name="ShoppingCart" component={ShoppingCart} options={{ title: 'Shopping Cart' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
