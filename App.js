import React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import firebase from 'firebase'
import { firebaseConfig } from './config';

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
else{
  firebase.app()
}


import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import DashboardScreen from './screens/DashboardScreen'


const SwitchNavigator=createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen:LoginScreen,
  DashboardScreen: DashboardScreen
})

const AppContainer=createAppContainer(SwitchNavigator)

export default function App() {
  return (
  <AppContainer/>
  );
}

