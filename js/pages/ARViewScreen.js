import React, { Component } from 'react';
import {View, Image, Text, StyleSheet, TouchableHighlight,  NativeEventEmitter,
  DeviceEventEmitter} from 'react-native';
import {
  ViroARSceneNavigator
} from 'react-viro';

//import ReactNativeHeading from '@zsajjad/react-native-heading';
import Geolocation from 'react-native-geolocation-service';
import { Gyroscope } from "react-native-sensors";

var InitialARScene = require('../ARScene.js');

var sharedProps = {
  apiKey:"284CD604-39DB-4A9C-B094-F1CAFC65CAB4",
   
}

export default class ARViewScreen extends Component {
	
	constructor() {
    	super();

    this.state = {
      sharedProps : sharedProps,
      bitcoinPointX:0,
      bitcoinPointZ:0,
      latitude:0,
      longitude:0,
      headingIsSupported:false,
      headingDirection:0,
      currentLocationX:0,
      currentLocationZ:0,
      meters:0,
      deviceRotationX:0
    }

    this._latLongToMerc = this._latLongToMerc.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
    this._calculateDistance = this._calculateDistance.bind(this);
   
  	}

  componentDidMount() {
  
   // this._startGyroscope();

  }


  startGeolocation() {
     Geolocation.watchPosition(
      (position) => {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var location = this._transformPointToAR(lat, lon);

        var distanceInMeters = this._calculateDistance(lat, lon, 52.692791, -2.738000);

        this.setState({
          meters: distanceInMeters,
          latitude: lat,
          longitude: lon,
          string: String(position.coords.latitude),
          currentLocationX: location.x,
          currentLocationZ: location.z
        });
      },
      (error) => this.setState({ 
          error: error.message 
      }),
      { 
        enableHighAccuracy: true, 
        timeout: 2000, 
        maximumAge: 2000, 
        distanceFilter: 1 
      },
    )
  }


	render() {
	return (
      <View style={localStyles.viroContainer} transparent={true} >
        
        <View style={localStyles.mainView}>
          <Image source={require("../../public/images/ARD.png")} 
          style={localStyles.ARDLogo}/>
   
        </View>

        <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene}}
        viroAppProps={{locationZ:-1}}
        worldAlignment="GravityAndHeading"  />

        <View style={{height:60,
          backgroundColor:'#f86e00' }}>
         
          <TouchableHighlight onPress={() => this.props.navigation.navigate("MapView")}
            style={localStyles.backButton} >
          <Image source={require("../../public/images/ar_d_back_icon.png")}
          style={localStyles.smallIcon} />
          </TouchableHighlight >
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

  _latLongToMerc(lat_deg, lon_deg) {
     var lon_rad = (lon_deg / 180.0 * Math.PI)
     var lat_rad = (lat_deg / 180.0 * Math.PI)
     var sm_a = 6378137.0
     var xmeters  = sm_a * lon_rad
     var ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad))
     return ({x:xmeters, y:ymeters});
  }

  _transformPointToAR(lat, long) {
    var objPoint = this._latLongToMerc(lat, long);
    var devicePoint = this._latLongToMerc(this.state.latitude, this.state.longitude);
    // latitude maps to the z axis in AR
    // longitude maps to the x axis in AR
    var objFinalPosZ = objPoint.y - devicePoint.y;
    var objFinalPosX = objPoint.x - devicePoint.x;
    //flip the z, as -z(is in front of us which is north, +z is behind(south).
    return ({x:objFinalPosX, z:-objFinalPosZ});
  }

  _calculateDistance(lat1,lon1,lat2,lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515 * 1.609344 * 1000;
      return dist;
    }
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