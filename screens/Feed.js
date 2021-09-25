import React from 'react'
import { Text, View, SafeAreaView, StatusBar, Platform, StyleSheet, FlatList, Image} from 'react-native'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import StoryCard from './StoryCard'
import firebase from 'firebase'
import { RFValue } from 'react-native-responsive-fontsize'

let customFonts={
    'Bubblegum-Sans': require("../assets/fonts/BubblegumSans-Regular.ttf")  
}
let stories=require('./temp.json')

export default class Feed extends React.Component{
    constructor(props){
        super(props)
        this.state={
            fontsLoaded:false,
            light_theme: true,
            stories:[]
        }
    }
    
    async _loadFontsAsync(){
        await Font.loadAsync(customFonts);
        this.setState({fontsLoaded: true})
    }

    componentDidMount(){
        this._loadFontsAsync()
        this.fetchUser()
        this.fetchStories()
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
    fetchStories(){
        firebase
        .database()
        .ref("/posts/")
        .on("value", (snapshot) => {
            let stories = []
            if (snapshot.val()) {
                Object.keys(snapshot.val()).forEach(function (key) {
                    stories.push({
                        key: key,
                        value: snapshot.val()[key]
                    })
                });
            }
            this.setState({ stories: stories })
            this.props.setUpdatetoFalse()
        }, function (errorObject) {

            console.log("The read failed: " + errorObject.code);
        })
    }

    renderItem=({item:story})=>{
        return <StoryCard story={story} navigation={this.props.navigation}/>
    }

    render(){
        if(!this.state.fontsLoaded){
            return <AppLoading/>
        }
        else{
            return(
                <View style={this.state.light_theme ? styles.containerLight :
                    styles.container}>
                    <SafeAreaView style={styles.droidSafeArea}/>
                        <View style={styles.appTitle}>
                            <View style={styles.appIcon}>
                                <Image source={require('../assets/logo.png')} 
                                    style={{width:60, height: 60, resizeMode:'contain', marginLeft: 10}}/>
                            </View>
                            <View style={styles.appTitleTextContainer}>
                                <Text style={this.state.light_theme ?
styles.appTitleTextLight : styles.appTitleText}> Storytelling App</Text>
                            </View>
                        </View>
                        {
                        !this.state.stories[0] ?
                        <View style={styles.noStories}>
                                <Text style={this.state.light_theme ?
                                styles.noStoriesTextLight : styles.noStoriesText}>No Stories Available</Text>
                        </View>
                        :<View style={styles.cardContainer}>
                            <FlatList 
                                keyExtractor={(item,index)=>index.toString()}
                                data={this.state.stories}
                                renderItem={this.renderItem}/>

                        </View>

                        }
                </View>
            )
        }
        
    }
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#15193c'
    },
    containerLight: {
        flex: 1,
        backgroundColor: "white"
        },
    droidSafeArea:{
        marginTop: Platform.OS==='android' ? StatusBar.currentHeight: 0
    },
    appTitle:{
        flex: 0.07,
        flexDirection:'row',
        flexWrap:'wrap',
        padding: 5
    },
    appIcon:{
        flex: 0.3
    },
    appTitleTextContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    appTitleText:{
        color:'white',
        fontSize:28,
        fontFamily:'Bubblegum-Sans',
        paddingLeft:20
    },
    appTitleTextLight:{
        color: "black",
        fontSize: 28,
        fontFamily: "Bubblegum-Sans",
        paddingLeft: 20
    },
    cardContainer:{
        flex: 0.85,
        alignItems: 'center',
        width: '100%'
    },
    noStories: {
        flex: 0.85,
        justifyContent: "center",
        alignItems: "center"
        },
        noStoriesTextLight: {
        fontSize: RFValue(40),
        fontFamily: "Bubblegum-Sans"
},
noStoriesText: {
color: "white",
fontSize: RFValue(40),
fontFamily: "Bubblegum-Sans"
}
})