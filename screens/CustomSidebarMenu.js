import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, Platform, Statusbar, Image, StyleSheet } from 'react-native'
import firebase from 'firebase'
import { RFValue } from 'react-native-responsive-fontsize'

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

export default class CustomSidebarMenu extends React.Component{
    constructor(props){
        super(props)
        this.state={
            light_theme:true
        }
    }
    componentDidMount(){
        let theme
        firebase
            .database()
            .ref('/users/'+firebase.auth().currentUser.uid)
            .on("value",function (snapshot){
                theme=snapshot.val().current_theme
               
            })
        this.setState({
            light_theme: theme==="light"
        })
    }

    render(){
        let props=this.props
        return(
            <SafeAreaView style={{
                    flex: 1,
                    backgroundColor:this.state.light_theme? "white" : "#15193c"
            }}>
                <Image source={require("../assets/logo.png")}
                    style={styles.sideMenuProfileIcon}/>

                <DrawerContentScrollView {... props}>
                    <DrawerItemList {... props}/>
                </DrawerContentScrollView>
            </SafeAreaView>
        )   
    }
}

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
    alignSelf: "center",
    marginTop: RFValue(60),
    resizeMode: "contain"
    }
    });