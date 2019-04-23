//Placeholder for wallet section
import React, { Component } from 'react';
import {View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {StackNavigator, NavigationComponent} from 'react-navigation'

export default class WalletScreen extends Component {

	constructor() {
	  super();

	  this.state = {
	  }
	}

	render() {
	  return (
       	  <View style={{flex:1}}>
            <Image source={require("../../public/images/CryptoClashHowTo3.png")}
            	style={localStyles.splashImage}/>
          </View >
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