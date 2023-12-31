// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from './screens/LoginScreen';
// import SignUpScreen from './screens/SignUpScreen';
import Products from './screens/Products';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Signup" component={SignUpScreen} options={{ title: 'Signup' }} /> */}
        <Stack.Screen name="Products" component={Products} options={{ title: 'Products' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;