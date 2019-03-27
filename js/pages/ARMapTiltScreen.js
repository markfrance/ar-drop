import React, { Component } from 'react';
import {View, Text} from 'react-native';

import ARViewScreen from './ARViewScreen.js';
import MapViewScreen from './MapViewScreen.js';
import MapViewNoRedrop from './MapViewNoRedrop.js';
import renderIf from '../renderif.js';
import { gyroscope, accelerometer, magnetometer } from "react-native-sensors";
import Geolocation from 'react-native-geolocation-service';
import locationMath from '../locationMath.js';

export default class ARMapTiltScreen extends Component {

  constructor() {
    super();
    
    this.state = {
     showMap : false,
     deviceRotationX : 0,
     subscription: null,
     meters :0,
     bitcoinLat: 0,
     bitcoinLong: 0

    }

     this._startGyroscope = this._startGyroscope.bind(this);
     this._startGeolocation = this._startGeolocation.bind(this);

     this._startGyroscope();
     this._startGeolocation();

  }
  componentDidMount() {
    this.setState({
      bitcoinLat: this.props.navigation.getParam('bitcoinLat',52.692791),
     bitcoinLong: this.props.navigation.getParam('bitcoinLong',-2.738000)
   });
  }

  componentWillUnmount() {
    this.state.subscription.unsubscribe();
  }

   componentDidUpdate(){
   		if(this.state.deviceRotationX < -1)
   		{
        this.state.showMap = true;
   		} else {
   			this.state.showMap = false;
   		}
   }

   _startGyroscope() {
    const subscription = magnetometer.subscribe(({ x }) => {
           this.setState(state => ({
        deviceRotationX: x
      }));
        });

    this.state.subscription = subscription;
   }

   _startGeolocation() {
    Geolocation.watchPosition(
      (position) => {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        
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
    <View style={{flex:1}}>
    <Text>{this.state.deviceRotationX}</Text>
    <Text>Bitcoin Lat: {this.state.bitcoinLat}</Text>
    <Text>Bitcoin Long: {this.state.bitcoinLong}</Text>
		{renderIf(this.state.showMap,
			<MapViewNoRedrop navigation={this.props.navigation}
      bitcoinLat={this.state.bitcoinLat} 
      bitcoinLong={this.state.bitcoinLong}
      meters={this.state.meters}
      currentLatitude={this.state.currentLatitude}
      currentLongitude={this.state.currentLongitude}/>)}

		{renderIf(!this.state.showMap,
			<ARViewScreen navigation={this.props.navigation}
      bitcoinLat={this.state.bitcoinLat}
      bitcoinLong={this.state.bitcoinLong}
      meters={this.state.meters}
      currentLatitude={this.state.currentLatitude}
      currentLongitude={this.state.currentLongitude}/>)}
    </View>
	)}

}