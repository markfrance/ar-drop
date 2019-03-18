import React, { Component } from 'react';
import {View, Image, Text, StyleSheet, TouchableHighlight} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';
import locationMath from '../locationMath.js';

export default class MapViewNoRedrop extends Component {
	
  constructor() {
    super();

    this.state = {
      currentLatitude : 0,
      currentLongitude : 0,
      meters : 0
    }
    
  this._startGeolocation = this._startGeolocation.bind(this);
   
  }



   _startGeolocation() {
    Geolocation.watchPosition(
      (position) => {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

  
        this.setState({
          currentLatitude: lat,
          currentLongitude: lon
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
     <View style={localStyles.mainContainer} transparent={true} >
        
       <MapView
        style={{flex: 1}}
        region={{
          latitude: this.state.currentLatitude,
          longitude: this.state.currentLongitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.005
        }}
        showsUserLocation={true}
      >
      <View style={localStyles.mainView}>
          <Image source={require("../../public/images/ARD.png")} 
          style={localStyles.ARDLogo}/>
   
        </View>
      
      <Marker
            coordinate={{latitude: this.state.bitcoinLat,
            longitude: this.state.bitcoinLong}}
            image={require('../../public/images/ar_d_annotation.png')}
            title={"Bitcoin"}
         />
      </MapView>

        <View style={{height:60,
          backgroundColor:'#f86e00' }}>
          <Text style={localStyles.bottomText}>{this.props.meters.toFixed(0)} Meters</Text>
           </View>
      </View>

    );
	}

}

var localStyles = StyleSheet.create({
  mainContainer :{
    flex : 1,
    backgroundColor:"transparent"
  },
  mainView : {
    marginTop: 15,
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
  	top:0, 
  	left:0, 
  	width:50, 
  	height:50
  },
  redropButton : {
  	position:'absolute',
  	top:5,
  	right:0,
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