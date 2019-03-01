import React, { Component } from 'react';
import {View, Image, Text, StyleSheet, TouchableHighlight} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class MapViewScreen extends Component {
	

  constructor() {
    super();

    this.state = {
      sharedProps : sharedProps,
      bitcoinLat : 0,
      bitcoinLong : 0,
      currentLatitude : 0,
      currentLongitude : 0
    }
    this._randomiseLocation = this._randomiseLocation.bind(this);
    this._pointAtDistance = this._pointAtDistance.bind(this);
  }

  componentWillMount() {

    _this._randomiseLocation();
  }

	render() {
	return (
     <View style={localStyles.mainContainer} transparent={true} >
        
        <View style={localStyles.mainView}>
          <Image source={require("../../public/images/ARD.png")} 
          style={localStyles.ARDLogo}/>
   
        </View>

       <MapView
        style={{flex: 1}}
        region={{
          latitude: {this.props.currentLatitude},
          longitude: {this.props.currentLongitude},
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
      >
      <MapView.Marker
            coordinate={{latitude: {this.props.bitcoinLat},
            longitude: {this.props.bitcoinLong}}}
            title={"Bitcoin"}
         />
      </MapView>

        <View style={{height:60,
          backgroundColor:'#f86e00' }}>
          <Text style={localStyles.bottomText}>{"CLICK TO GRAB!"}</Text>
          <TouchableHighlight onPress={this._randomiseLocation()}
            style={localStyles.redropButton} >
          <Image source={require("../../public/images/ar_d_camera_icon.png")}
          style={localStyles.smallIcon} />
          </TouchableHighlight >
           </View>
      </View>

    );
	}

  _randomiseLocation() {
    var newLocation = _pointAtDistance(
    this.state.currentLatitude,
    this.state.currentLongitude,
    100);

    this.setState({
      bitcoinLat = newLocation.latitude;
      bitcoinLong = newLocation.longitude;
    });
  }

  _pointAtDistance(latitude, longitude, distance) {
    const result = {}
    const coords = toRadians(inputCoords)
    const sinLat =  Math.sin(coords.latitude)
    const cosLat =  Math.cos(coords.latitude)

    const bearing = Math.random() * (Math.PI * 2)
    const theta = distance/6371000 //Earth radius in meters (todo)
    const sinBearing = Math.sin(bearing)
    const cosBearing =  Math.cos(bearing)
    const sinTheta = Math.sin(theta)
    const cosTheta =    Math.cos(theta)

    result.latitude = Math.asin(sinLat*cosTheta+cosLat*sinTheta*cosBearing);
    result.longitude = coords.longitude + 
        Math.atan2( sinBearing*sinTheta*cosLat, cosTheta-sinLat*Math.sin(result.latitude )
    );

    result.longitude = ((result.longitude+(Math.PI *3))%(Math.PI * 2))-Math.PI

    return toDegrees(result)
}

  _toRadians(deg) {
    return (deg / 180.0 * Math.PI);
  }

  _pointInCircle(latitude, longitude, distance) {
   // const rnd =  Math.random()
    
  //  const randomDist = Math.sqrt(rnd) * distance
    return pointAtDistance(latitude, longitude, randomDist)
  }
  
}

var localStyles = StyleSheet.create({
  mainContainer :{
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
  	top:0, 
  	left:0, 
  	width:50, 
  	height:50
  },
  redropButton : {
  	position:'absolute',
  	top:0,
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