import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BooksList from './views/screens/BooksList';
import AddingBooks from './views/screens/AddingBooks';
import { ADD_BOOK_PAGE, BOOKS_LIST_PAGE } from './helpers/constants'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['...']);

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={BOOKS_LIST_PAGE} screenOptions={{
        headerShown: true, headerStyle: { backgroundColor: '#6c4f8b66' }
      }}>
        <Stack.Screen name={BOOKS_LIST_PAGE} component={BooksList} />
        <Stack.Screen name={ADD_BOOK_PAGE} component={AddingBooks} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

