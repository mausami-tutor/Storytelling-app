import React from 'react'
import { Text, View, SafeAreaView, StatusBar, Platform, StyleSheet} from 'react-native'
import firebase  from 'firebase'

export default class Logout extends React.Component{
    componentDidMount(){
        firebase.auth().signOut()
    }
    render(){
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea}>
                <Text>Logout Screen</Text>
                </SafeAreaView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center'
    },
    droidSafeArea:{
        marginTop: Platform.OS==='android' ? StatusBar.currentHeight: 0
    }
})