import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from '../Navigation/DrawerNavigator'

export default class DashboardScreen extends React.Component{
    render(){
        return(
         <NavigationContainer>
             <DrawerNavigator/>
         </NavigationContainer>
        )
    }
}