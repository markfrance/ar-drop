import React, { Component } from 'react';
import {View, Image, Text, StyleSheet, TouchableHighlight,  NativeEventEmitter,
  DeviceEventEmitter} from 'react-native';
import {
  ViroARSceneNavigator
} from 'react-viro';

import locationMath from '../locationMath.js';

import Geolocation from 'react-native-geolocation-service';
import { Gyroscope } from "react-native-sensors";

var InitialARScene = require('../arScenes/ARScene.js');

var sharedProps = {
  apiKey:"284CD604-39DB-4A9C-B094-F1CAFC65CAB4",
  lat:0,
  long:0,
  currentLatitude:0,
  currentLongitude:0
}

export default class ARViewScreen extends Component {
	
	constructor(props) {
    	super(props);

    this.state = {
      sharedProps : sharedProps,
    }
  }

  componentDidMount() {
    sharedProps.lat = this.props.bitcoinLat; 
    sharedProps.long = this.props.bitcoinLong;
    sharedProps.currentLatitude = this.props.currentLatitude;
    sharedProps.currentLongitude =this.props.currentLongitude;

    this.setState({sharedProps});
  }
	render() {

	return (
      <View style={localStyles.viroContainer} transparent={true} >
        
        <View style={localStyles.mainView}>
          <Image source={require("../../public/images/ARD.png")} 
          style={localStyles.ARDLogo}/>
   
        </View>

        <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene, passProps:{lat:this.props.bitcoinLat, long:this.props.bitcoinLong,
          currentLatitude:this.props.currentLatitude, currentLongitude:this.props.currentLongitude}}}
        worldAlignment="GravityAndHeading"  />

        <View style={{height:60,
          backgroundColor:'#f86e00' }}>
         
          <TouchableHighlight onPress={() => this.props.navigation.navigate("MapView")}
            style={localStyles.backButton} >
          <Image source={require("../../public/images/ar_d_back_icon.png")}
          style={localStyles.smallIcon} />
          </TouchableHighlight >
          <Text style={localStyles.bottomText}> {this.props.meters.toFixed(0)} Meters </Text>
          <TouchableHighlight onPress={() => this._startVideoRecording()}
            style={localStyles.cameraButton} >
          <Image source={require("../../public/images/ar_d_camera_icon.png")}
          style={localStyles.smallIcon} />
          </TouchableHighlight >
          
           </View>
      </View>
    );
	}

  _startVideoRecording() {
   // this.props.sceneNavigator.startVideoRecording("testVideo", true, function(e) {console.log(e)});
  }

  _stopVideoRecording() {
    // this.props.sceneNavigator.stopVideoRecording();
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor:"transparent"
  },
  mainView : {
  	alignItems:'center', 
  	backgroundColor:'transparent'
  },
  ARDLogo : {
  	width: 300, 
  	height: 50, 
    backgroundColor:"transparent"
  },
  backButton : {
  	position:'absolute',
  	top:5, 
  	left:5, 
  	width:50, 
  	height:50
  },
  cameraButton : {
  	position:'absolute',
  	top:5,
  	right:5,
  	width:50, 
  	height:50
  },
  bottomText : {
  	fontSize:25, 
  	color:'#fff', 
  	textAlign:'center', 
  	marginTop:12, 
  	height:60, 
  	flex:1
  },
  smallIcon : {
  	width:50,
  	height:50
  }
});