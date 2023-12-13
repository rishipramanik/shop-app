import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetailsScreen from './screens/ProductDetails';
import BottomTabNavigation from './navigations/BottomTabNavigation';
import IconButton from './components/UI/IconButton';
import CartScreen from './screens/CartScreen';
import { store } from './store';
import { Provider } from 'react-redux';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar style='auto' />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='BottmTabNavigator'
              component={BottomTabNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='ProductDetails'
              component={ProductDetailsScreen}
              options={({ navigation }) => ({
                title: '',
                headerRight: ({ tintColor }) => (
                  <IconButton
                    icon='shopping-cart'
                    size={24}
                    color={tintColor}
                    onPress={() => navigation.navigate('Cart')}
                  />
                ),
              })}
            />
            <Stack.Screen name='Cart' component={CartScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
