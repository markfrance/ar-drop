import React, { Component } from 'react';

import ARViewScreen from './js/pages/ARViewScreen.js';
import MapViewScreen from './js/pages/MapViewScreen.js';
import renderIf from './renderif';
import { Gyroscope } from "react-native-sensors";


export default class ARMapTiltScreen extends Component {

  constructor() {
    super();

    this.state = {
     showMap : false,
     deviceRotationX : 0
    }
    
    this._startGyroscope = this._startGyroscope.bind(this);
  }

   componentDidMount() {
    this._startGyroscope();
  }

   componentDidUpdate(){
   		if(this.state.deviceRotationX > 280 
   			|| this.state.deviceRotationX < 25)
   		{
   			this.setState({
   				showMap: true
   			})
   		} else {
   			this.setState({
   				showMap: false
   			})
   		}
   }

  _startGyroscope() {
    new Gyroscope({
      updateInterval: 50
    })
      .then(observable => {
        observable.subscribe(({ x }) => {
          this.setState(state => ({
            deviceRotationX: x
          }));
        });
      })
      .catch(error => {
        console.log("The sensor is not available");
      });
  }

  	render() {
	return (
		{renderIf(this.state.showMap,
			<MapViewScreen/>)}

		{renderIf(!this.state.showMap,
			<ARViewScreen/>)}
	)}

}