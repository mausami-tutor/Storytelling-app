import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'

import Profile from '../screens/Profile'
import StackNavigator from './StackNavigation'
import Logout from '../screens/Logout'
import firebase  from 'firebase'
import CustomSidebarMenu from '../screens/CustomSidebarMenu'

const Drawer= createDrawerNavigator()

export default class DrawerNavigator extends React.Component{
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
            <Drawer.Navigator
                drawerContentOptions={{
                        activeTintColor:'#e91e63',
                        inactiveTintColor: this.state.light,
                        itemStyle:{marginVertical:5}
                }}
                drawerContent={(props)=><CustomSidebarMenu {...props}/>}
            >
                <Drawer.Screen name='Home' component={StackNavigator} options={{unmountOnBlur: true}}/>
                <Drawer.Screen name='Profile' component={Profile} options={{ unmountOnBlur: true }}/>
                <Drawer.Screen name='Logout' component={Logout} options={{ unmountOnBlur: true }}/>
            </Drawer.Navigator>
        )
    }
}
