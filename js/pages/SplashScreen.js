//Test page, replace with splash
import React, { Component } from 'react';
import {View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {StackNavigator, NavigationComponent} from 'react-navigation'

export default class SplashScreen extends Component {

	constructor() {
	  super();

	  this.state = {
	  }
	}

	render() {
	  return (
       	<TouchableWithoutFeedback
       	  onPress={()=>this.props.navigation.navigate('HowToSplash') } > 
          <View style={{flex:1}}>
            <Image source={require("../../public/images/AR-DSplash.png")}
            	style={localStyles.splashImage}/>
          </View >
        </TouchableWithoutFeedback>
    );
	}
}

var localStyles = StyleSheet.create({

	splashImage : {
    flex:1, 
    width:400,
    resizeMode:'contain'
  }
});