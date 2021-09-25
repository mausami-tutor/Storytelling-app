import { Ionicons } from '@expo/vector-icons'

import React from 'react'
import { View,SafeAreaView, Platform,StatusBar, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import * as Font from 'expo-font'
import { RFValue } from 'react-native-responsive-fontsize'
import AppLoading from 'expo-app-loading'
import firebase from 'firebase'

let customFonts={
    'Bubblegum-Sans': require("../assets/fonts/BubblegumSans-Regular.ttf")  
}

export default class StoryCard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            fontsLoaded: false,
            light_theme:true,
            story_id:this.props.story.key,
            story_data: this.props.story.value
        }
    }
    componentDidMount(){
        this._loadFontsAsync()
        this.fetchUser()
    }
    async _loadFontsAsync(){
        await Font.loadAsync(customFonts)
        this.setState({fontsLoaded:true})
    }
    async fetchUser(){
        let theme
        await firebase
            .database()
            .ref('/users/'+firebase.auth().currentUser.uid)
            .on("value",function (snapshot){
                theme=snapshot.val().current_theme
               
            })
        this.setState({
            light_theme: theme==="light"
        })
        
    }
    render() {
        let story= this.state.story_data
        if (!this.state.fontsLoaded) {
          return <AppLoading />;
        } else {
            let images={
                "image_1": require("../assets/story_image_1.png"),
                "image_2": require("../assets/story_image_2.png"),
                "image_3": require("../assets/story_image_3.png"),
                "image_4": require("../assets/story_image_4.png"),
                "image_5": require("../assets/story_image_5.png")
            }
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                this.props.navigation.navigate("StoryScreen", {
                  story: this.props.story
                })
              }
            >
            <SafeAreaView style={styles.droidSafeArea} />
            <View style={this.state.light_theme ? styles.cardContainerLight :
styles.cardContainer}>
                
                <Image source={images[story.preview_image]}
                    style={{resizeMode:'contain', width:Dimensions.get('window').width-60, height:250, borderRadius:10}}/>
            
                <View style={styles.titleContainer}>
                    <View style={styles.titleTextContainer}>
                        <View style={styles.storyTitle}>
                            <Text style={this.state.light_theme ?
styles.storyTitleTextLight : styles.storyTitleText}>{story.title}</Text>
                        </View>
                        <View style={styles.storyAuthor}>
                            <Text style={this.state.light_theme ?
styles.storyAuthorTextLight : styles.storyAuthorText}>{story.author}</Text>
                        </View>                    
                    </View>
                </View>

                <View style={styles.descriptionContainer}>
                    <Text style={this.state.light_theme ?
styles.descriptionTextLight : styles.descriptionText}>{this.props.story.description}</Text>
                </View>

                <View style={styles.actionContainer}>
                    <View style={styles.likeButton  }>
                        <View style={styles.likeIcon}>
                            <Ionicons name={'heart'} size={30} color={this.state.light_theme ? "black" : "white"} 
                                style={{width:30, marginLeft:20, marginTop:5}}/>
                        </View>
                        <View>
                            <Text style={this.state.light_theme ?
styles.likeTextLight : styles.likeText}>12k</Text>
                        </View>
                    </View>

                </View>
            </View>
            </TouchableOpacity>
        )
        }
    }
}
const styles=StyleSheet.create({
    cardContainer: {
        marginTop: 0,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#2f345d",
        borderRadius: 20,
        height: undefined,
        padding: 10
        },
    cardContainerLight: {
        marginTop: -20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "white",
        borderRadius: 20,
        height: undefined,
        padding: 10,
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 2,
    },
    droidSafeArea:{
        marginTop: Platform.OS==='android' ? StatusBar.currentHeight: 0
    },
    titleContainer: {
        flexDirection: "row"
    },
    titleTextContainer: {
        flex: 1
    },
    storyTitleText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        color: "white"
    },
    storyTitleTextLight: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 25,
        color: "black"
    },
    storyAuthorText: {
        fontFamily: "Bubblegum-Sans",
        fontSize:RFValue(18),
        color: "white"
    },
    storyAuthorTextLight:{
        fontFamily: "Bubblegum-Sans",
        fontSize: 18,
        color: "black"
    },

    descriptionContainer: {
        marginTop: 5
    },
    descriptionText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(13),
        color: "white"
    },
    descriptionTextLight: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 13,
        color: "black"
        },
    actionContainer: {
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    likeButton: {
        backgroundColor: "#eb3948",
        borderRadius: 30,
        width: 160,
        height: 40,
        flexDirection: "row"
    },
    likeText: {
        color: "white",
        fontFamily: "Bubblegum-Sans",
        fontSize: 25,
        marginLeft: 25,
        marginTop: 6
    },
    likeTextLight:{
        
        fontFamily: "Bubblegum-Sans",
        fontSize: 25,
        marginLeft: 25,
        marginTop: 6
        
    }
})