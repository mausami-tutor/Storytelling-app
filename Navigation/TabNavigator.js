import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {Ionicons} from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';
import * as firebase from 'firebase';

import Feed from '../screens/Feed';
import CreateStory from '../screens/CreateStory';

const Tab= createMaterialBottomTabNavigator()

export default class BottomTabNavigator extends React.Component{
  constructor(){
    super()
    this.state={
      light_theme: true,
      isUpdated: false
    }
  }
  componentDidMount(){
    let theme 
    firebase
      .database()
      .ref("/users/"+firebase.auth().currentUser.uid)
      .on("value", function(snapshot){
        theme=snapshot.val().current_theme
      })
    this.setState({ light_theme: theme==="light"})
  }

  changeUpdated=()=>{
    this.setState({isUpdated: true})
  }
  removeUpdated=()=>{
    this.setState({isUpdated: false})
  }

  renderFeed=()=>{
    return <Feed setUpdatetoFalse={this.removeUpdated} {...this.props} />
  }
  
  renderStory=()=>{
    return <CreateStory setUpdatetoTrue={this.changeUpdated} {...this.props} />
  }
  render(){
  return (
   
      <Tab.Navigator
        labeled={false}
        barStyle={this.state.light_theme? styles.bottomTabStyleLight : styles.bottomTabStyle}
        screenOptions={({route})=>({
          tabBarIcon:({focused, color, size})=>{
            let iconName;
            if(route.name==='Feed'){
              iconName=focused? 'home' : 'home-outline'
            }
            else if (route.name==='CreateStory'){
              iconName= focused? 'add-circle' : 'add-circle-outline'
            }
            return <Ionicons name={iconName} size= {30} color= {color} style={styles.icons}/>
            }
          })
        }
        activeColor={'#ee8249'}
        inactiveColor={'gray'}>

        <Tab.Screen name='Feed' component={this.renderFeed} options={{ unmountOnBlur: true }}/>
        <Tab.Screen name='CreateStory' component={this.renderStory} options={{ unmountOnBlur: true }}/>

      </Tab.Navigator>

    
  );
  }
}

const styles=StyleSheet.create({
  bottomTabStyle:{
    backgroundColor:'#2f345d',
    height: '8%',
    borderTopLeftRadius: 30,
    borderTopRightRadius:30,
    overflow: 'hidden',
    position: 'absolute'
  },
  bottomTabStyleLight:{
    backgroundColor:'#eaeaea',
    height: '8%',
    borderTopLeftRadius: 30,
    borderTopRightRadius:30,
    overflow: 'hidden',
    position: 'absolute'
  },
  icons:{
    width: RFValue(30),
    height:RFValue(30)
  }
})

