import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home1 from '../components/screens/Home/Home1';
import Results from '../components/screens/Results';

const Stack = createNativeStackNavigator();

export default function Navigation () {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={Home1}/>
                <Stack.Screen name="Results" component={Results}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}