import React, { Component } from 'react';
import {View, Text} from 'react-native';

import ARViewScreen from './ARViewScreen.js';
import MapViewScreen from './MapViewScreen.js';
import MapViewNoRedrop from './MapViewNoRedrop.js';
import renderIf from '../renderif.js';
import { gyroscope } from "react-native-sensors";

export default class ARMapTiltScreen extends Component {

  constructor() {
    super();
    
    this.state = {
     showMap : false,
     deviceRotationX : 0,
     subscription: null
    }

     this._startGyroscope = this._startGyroscope.bind(this);

     this._startGyroscope();

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
    const subscription = gyroscope.subscribe(({ x }) => {
           this.setState(state => ({
        deviceRotationX: x + state.deviceRotationX
      }));
        });

    this.state.subscription = subscription;
   }

  render() {
	return (
    <View style={{flex:1}}>
    <Text>{this.state.deviceRotationX}</Text>
		{renderIf(this.state.showMap,
			<MapViewNoRedrop navigation={this.props.navigation}/>)}

		{renderIf(!this.state.showMap,
			<ARViewScreen navigation={this.props.navigation}/>)}
    </View>
	)}

}