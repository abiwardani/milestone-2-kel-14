import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './HomeScreen' ;
import DiaryScreen from './DiaryScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();
//untuk navigasi
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" >
          <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Diary' component={DiaryScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}