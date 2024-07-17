import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider } from 'react-redux';
import store from './src/store/store';

import Books from './src/BottomTab/BooksPage';
import FavoriteBooks from './src/BottomTab/FavoriteBooks';
import DetailsBooks from './src/Stack/DetailsBooks';
import { BookData } from './src/types/types';

type RootStackParamList = {
  Books: BookData[];
  DetailsBooks: { title: string };
};

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Books" component={StackNavigator} options={{ tabBarIcon: "book" }} />
      <Tab.Screen name="FavoriteBooks" component={FavoriteBooks} options={{ tabBarIcon: "heart" }} />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Books" component={Books} options={{ headerShown: false }} />
      <Stack.Screen name="DetailsBooks" component={DetailsBooks} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TabNavigator />
      </Provider>
    </NavigationContainer>
  );
}
