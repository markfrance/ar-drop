import React, { Component } from 'react';
import {View, Image, Text, StyleSheet, TouchableHighlight} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';
import locationMath from '../locationMath.js';

export default class MapViewScreen extends Component {
	
  constructor() {
    super();
    
    this._startGeolocation();

    this.state = {
      bitcoinLat : 0,
      bitcoinLong : 0,
      currentLatitude : 0,
      currentLongitude : 0,
      meters : 0,
      timer : 5000
    }
    
    this._randomiseLocation = this._randomiseLocation.bind(this);
    this._startGeolocation = this._startGeolocation.bind(this);
    this._msToTime = this._msToTime.bind(this);
  }


  componentDidMount() {
     
    this.interval = setInterval(
    () => this.setState(({ timer: this.state.timer - 10 })),
    1
    );
  }

  componentDidUpdate(){
    if(this.state.timer < 0){ 
      this.setState({timer: 0});
      clearInterval(this.interval);
      this.props.navigation.navigate("Tilt",
        {
          bitcoinLat: this.state.bitcoinLat,
          bitcoinLong: this.state.bitcoinLong
        });
    }
  }

   _startGeolocation() {
    Geolocation.watchPosition(
      (position) => {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        if(this.state.bitcoinLat === 0) {
       var newLocation = locationMath.randomPoint(
          lat,
          lon,
          300
        );

        this.state.bitcoinLat = newLocation.lat;
        this.state.bitcoinLong = newLocation.lon;
      
      }

    var distanceInMeters = locationMath.calculateDistance(
          lat, lon, 
          this.state.bitcoinLat, this.state.bitcoinLong
        );

        this.setState({
          meters: distanceInMeters,
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
      <View style={{backgroundColor:"transparent"}}>
          <Text style={{textAlign:"center", fontSize:55, color:'#f86e00'}}> 
          {this._msToTime(this.state.timer)} </Text>
          
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
          <Text style={localStyles.bottomText}>300 Meters</Text>
          <TouchableHighlight onPress={() => this._randomiseLocation()}
            style={localStyles.redropButton} >
          <Image source={require("../../public/images/ar_d_camera_icon.png")}
          style={localStyles.smallIcon} />
          </TouchableHighlight >
           </View>
      </View>

    );
	}

   _msToTime(milli) {
    return '0' + (milli / 1000).toFixed(2);
  }

  _randomiseLocation() {
     var newLocation = locationMath.randomPoint(
          this.state.currentLatitude,
          this.state.currentLongitude,
          300
        );

        this.state.bitcoinLat = newLocation.lat;
        this.state.bitcoinLong = newLocation.lon;
    
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