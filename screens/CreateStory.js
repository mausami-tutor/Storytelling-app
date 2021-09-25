import React from 'react'
import { Text, View, SafeAreaView, StatusBar, Platform, StyleSheet, Image, ScrollView, TextInput, Alert, Button, Dimensions} from 'react-native'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import {RFValue}  from 'react-native-responsive-fontsize'
import DropDownPicker from 'react-native-dropdown-picker'
import firebase from 'firebase'

let customFonts={
    'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf')
}

export default class CreateStory extends React.Component{
    constructor(props){
        super(props)
        this.state={
            fontsLoaded:false,
            previewImage: "image_1",
            dropdownHeight: 40,
            light_theme: true,
            title:'',
            author:'',
            story:'',
            moral:'',
            description:'   '
        }
    }
    componentDidMount(){
        this._loadFontsAsync()
        let theme 
        firebase
      .database()
      .ref("/users/"+firebase.auth().currentUser.uid)
      .on("value", function(snapshot){
        theme=snapshot.val().current_theme
      })
    this.setState({ light_theme: theme==="light"})
    }

    async _loadFontsAsync(){
        await Font.loadAsync(customFonts)
        this.setState({ fontsLoaded:true})
    }

    async addStory() {
        if (this.state.title && this.state.description && this.state.story && this.state.moral) {
            let storyData = {
                preview_image: this.state.previewImage,
                title: this.state.title,
                description: this.state.description,
                story: this.state.story,
                moral: this.state.moral,
                author: firebase.auth().currentUser.displayName,
                created_on: new Date(),
                author_uid: firebase.auth().currentUser.uid,
                likes: 0
            }
            await firebase
            .database()
            .ref("/posts/" + (Math.random().toString(36).slice(2)))
            .set(storyData)
            .then(function (snapshot) {
            })
            this.props.setUpdatetoTrue()
            this.props.navigation.navigate("Feed")
        } else {
            Alert.alert(
            'Error',
            'All fields are required!',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
            );
        }
    }

    render(){
        if(!this.state.fontsLoaded){
          console.log(this.state.fontsLoaded)
            return <AppLoading/>
            
        }
        else{console.log(this.state.fontsLoaded)
            let preview_images={
                image_1:require('../assets/story_image_1.png'),
                image_2:require('../assets/story_image_2.png'),
                image_3:require('../assets/story_image_3.png'),
                image_4:require('../assets/story_image_4.png'),
                image_5:require('../assets/story_image_5.png')

            }
            
            return(
                <View style={this.state.light_theme ? styles.containerLight :
                    styles.container}>
                    <SafeAreaView style={styles.droidSafeArea}/>
                        <View style={styles.appTitle}>
                            <View style={styles.appIcon}>
                                <Image source={require('../assets/logo.png')}
                                    style={{width: 50, height: 50, resizeMode:'contain', marginLeft: 10}}/>
                            </View>
                            <View style= {styles.appTitleTextContainer}>
                                <Text style={this.state.light_theme ?
                                styles.appTitleTextLight : styles.appTitleText}>New Story</Text>
                            </View>
                        </View>

                        <View style={styles.fieldsContainer}>
                            <ScrollView>
                                <Image source={preview_images[this.state.previewImage]}
                                        style={styles.previewImage}/>
                                
                                <View style={{height: RFValue(this.state.dropdownHeight)}}>
                                    <DropDownPicker
                                        items={[
                                            {label: 'Image 1', value: 'image_1'},
                                            {label: 'Image 2', value: 'image_2'},
                                            {label: 'Image 3', value: 'image_3'},
                                            {label: 'Image 4', value: 'image_4'},
                                            {label: 'Image 5', value: 'image_5'}
                                        ]}
                                        defaultValue= {this.state.previewImage}
                                        containerStyle={{height: 40, borderRadius: 20, marginBottom: 10}}
                                        style={{backgroundColor: 'transparent'}}
                                        itemStyle= {{justifyContent: 'flex-start'}}
                                       dropDownStyle={{ backgroundColor:
                                        this.state.light_theme ? "#eee" : '#2f345d' }}
                                        labelStyle={this.state.light_theme ?
                                            styles.dropdownLabelLight : styles.dropdownLabel}
                                        arrowStyle={this.state.light_theme ?
                                            styles.dropdownLabelLight : styles.dropdownLabel}
                                        onChangeItem={item =>
                                            this.setState({
                                              previewImage: item.value
                                            })
                                          }
                                        onOpen={()=>{
                                          this.setState({dropdownHeight:170});
                                          }}
                                        onClose={()=>{
                                          this.setState({dropdownHeight: 40});
                                          }}
                                    />

                                </View>
                                                      
                                <View style={styles.fieldContainer}>
                                    <TextInput
                                    style={[this.state.light_theme ? styles.inputFontLight :
                                        styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                                    onChangeText={(title) => this.setState({ title })}
                                    placeholder={"Title"}
                                    placeholderTextColor={this.state.light_theme ? "black" :
                                    "white"}
                                    />
                                </View>
                                <View style={styles.fieldContainer}>
                                    <TextInput style={[this.state.light_theme ? styles.inputFontLight :
                                    styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                                    onChangeText={(description) => this.setState({ description })}
                                    placeholder={"Description"}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholderTextColor={this.state.light_theme ? "black" :
                                    "white"}
                                    />
                                </View>
                                <View style={styles.fieldContainer}>
                                    <TextInput
                                   style={[this.state.light_theme ? styles.inputFontLight :
                                    styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                                    onChangeText={(story) => this.setState({ story })}
                                    placeholder={"Story"}
                                    multiline={true}
                                    numberOfLines={20}
                                    placeholderTextColor={this.state.light_theme ? "black" :
                                    "white"}
                                    />
                                </View>
                                <View style={styles.fieldContainer}>
                                    <TextInput
                                   style={[this.state.light_theme ? styles.inputFontLight :
                                    styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                                    onChangeText={(moral) => this.setState({ moral })}
                                    placeholder={"Moral of the story"}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholderTextColor={this.state.light_theme ? "black" :
                                    "white"}
                                    />
                                </View>
                                <View style={styles.submitButton}>
                                    <Button onPress={()=>this.addStory()}
                                        title="submit"
                                        color="#841584"/>
                                </View>
                                </ScrollView>
                        
                        </View>  
                    
                </View>
            )
        }
    }
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#15193c'
    },
    containerLight: {
        flex: 1,
        backgroundColor: "white"
        },
    droidSafeArea:{
        marginTop: Platform.OS==='android' ? StatusBar.currentHeight: 0
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row"
    },

    appIcon: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28),
        fontFamily: "Bubblegum-Sans"
    },
    appTitleTextLight: {
        color: "black",
        fontSize: 28,
        fontFamily: "Bubblegum-Sans",
        paddingLeft: 20
        },
    fieldsContainer: {
        flex: 0.8
    },
    previewImage: {
        width: "93%",
        height: RFValue(250),
        alignSelf: "center",
        borderRadius: RFValue(10),
        marginVertical: RFValue(10),
        resizeMode: "contain"
      },
    inputFont: {
        height: RFValue(40),
        borderColor: "white",
        borderWidth: RFValue(1),
        borderRadius: RFValue(10),
        paddingLeft: RFValue(10),
        color: "white",
        fontFamily: "Bubblegum-Sans",
        height: undefined
    },
inputFontLight: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    color: "black",
    fontFamily: "Bubblegum-Sans"
    },
inputFontExtra: {
marginTop: RFValue(15)
},
inputTextBig: {
textAlignVertical: "top",
padding: RFValue(5)
},
dropdownLabel: {
    color: "white",
    fontFamily: "Bubblegum-Sans"
    },
    dropdownLabelLight: {
    color: "black",
    fontFamily: "Bubblegum-Sans"
    },
})