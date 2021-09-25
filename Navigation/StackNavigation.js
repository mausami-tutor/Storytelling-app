import React from 'react'
import {View, Text} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import StoryScreen from '../screens/StoryScreen'
import BottomTabNavigator from './TabNavigator'

const Stack=createStackNavigator()

const StackNavigator=()=>{
    return(
        <Stack.Navigator initialRouteName="Feed" screenOptions={{headerShown: false}}>
            <Stack.Screen name='Feed' component={BottomTabNavigator}/>
            <Stack.Screen name='StoryScreen' component={StoryScreen}/>
        </Stack.Navigator>
    )
}

export default StackNavigator