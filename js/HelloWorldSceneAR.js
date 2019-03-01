//Test scene
import React, { Component } from 'react';

import {StyleSheet, DeviceEventEmitter} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroImage,
  ViroAnimatedImage,
  ViroParticleEmitter,
  ViroARCamera
} from 'react-viro';


export default class HelloWorldSceneAR extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bitcoinPointX: 0,//this.props.bitcoinPointX,
      bitcoinPointZ: 0 //this.props.bitcoinPointZ
    };

    this._onInitialized = this._onInitialized.bind(this);
    this._latLongToMerc = this._latLongToMerc.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
  }


  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}
      postProcessEffects={['thermalvision']} >

        <ViroAnimatedImage
          source={require('../public/images/BTC-Spinning.gif')} 
          scale={[.5, .5, .5]} 
          transformBehaviors={["billboard"]}
          position={[this.state.bitcoinPointX, 0, this.state.bitcoinPointZ]}
        />

 <ViroARCamera>
        

         <ViroImage
          source={require('../public/images/ar_d_left.png')} 
          scale={[.1, .1, .1]} 
          position={[0, 0, -10]}
          style={localStyles.centreArrow}
        />


   </ViroARCamera>
      

      </ViroARScene>
    );
  }
//
  _onInitialized() {
    var bitcoin = this._transformPointToAR(52.692791, -2.738000);
     this.setState({
      bitcoinPointX: bitcoin.x,
      bitcoinPointZ: bitcoin.z,
    });
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
    var devicePoint = this._latLongToMerc(52.692791, -2.738000);
    // latitude maps to the z axis in AR
    // longitude maps to the x axis in AR
    var objFinalPosZ = objPoint.y - devicePoint.y;
    var objFinalPosX = objPoint.x - devicePoint.x;
    //flip the z, as -z(is in front of us which is north, +z is behind(south).
    return ({x:objFinalPosX, z:-objFinalPosZ});
  }
}


var localStyles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
   arrowContainer : {
    alignItems: 'center',
    justifyContent: 'center'
  },
  centreArrow : {
    width: 50,
    height: 50
    
  }
});

module.exports = HelloWorldSceneAR;
