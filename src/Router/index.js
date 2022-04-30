import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StartedPage, Form, Profile} from "../Pages"
import { IconButton } from 'react-native-paper';

const Stack = createStackNavigator();

const Router = ({ navigation }) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="StartedPage"
            component={StartedPage}
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="Form"
            component={Form}
            options={{
            headerShown: false,
            }}
        />
        <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
            headerShown: false,
            }}
        />
    </Stack.Navigator>
  );
};

export default Router;
