import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import ActionBarImage from './src/components/ActionBarImage';
import { BookMark } from './src/pages/BookMarkList';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Parent"
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={({route, navigation}) => ({
            headerRight: (props) => <ActionBarImage {...props} navigation={navigation} />,
            title: 'Home',
            headerStyle: {
              backgroundColor: 'green',
            },
          })}
          
        />

        <Stack.Screen 
         name= "BookMark"
         component={BookMark}
         options={({route, navigation}) => ({
          title: 'BookMark',
          headerStyle: {
            backgroundColor: 'green',
          },
        })}
       
        
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;