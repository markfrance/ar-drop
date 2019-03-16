import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroConstants,
  ViroAnimatedImage,
  ViroParticleEmitter,
  ViroARCamera
} from 'react-viro';

import renderIf from './renderif';
import locationMath from './locationMath'

export default class ARScene extends Component {

  constructor() {
    super();

    this.state = {
     runFireworks : false,
     showLeft : false,
     showRight : false,
     bitcoinLocation: locationMath.transformPointToAR(51.547564,0.0308595),
      latitude:0,
      longitude:0,
      headingIsSupported:false,
      headingDirection:0,
      currentLocationX:0,
      currentLocationZ:0,
      meters:0,
      deviceRotationX:0
    };

    this._onInitialized = this._onInitialized.bind(this);
  //  this._startHeading = this._startHeading.bind(this);

  }


  componentDidMount() {

  //  this._startHeading();
  }
/*
 _startHeading() {
     ReactNativeHeading.start(1)
    .then(didStart => {
        this.setState({
            headingIsSupported: didStart,
        })
    })
    
    DeviceEventEmitter.addListener('headingUpdated', data => {
      this.setState({
            headingDirection: data.heading,
        })
    });
  }

componentWillUnmount() {
    ReactNativeHeading.stop();
    this.listener.removeAllListeners('headingUpdated');
  }
*/

startGeolocation() {
     Geolocation.watchPosition(
      (position) => {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var location = locationMath.transformPointToAR(lat, lon);

        var distanceInMeters = locationMath.calculateDistance(lat, lon, 52.692791, -2.738000);

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
   
      <ViroARScene onTrackingUpdated={this._onInitialized} 
      style={{backgroundColor:'transparent'}} >
       
       {renderIf(false,
        <ViroAnimatedImage
          source={require('../public/images/BTC-Spinning_small.gif')} 
          scale={[.5, .5, .5]} 
          position={[0, 0, -1]}
        />)}

         <ViroImage
          source={require('../public/images/ar_d_marker.png')} 
          scale={[.1, .1, .1]} 
          position={[]}
          style={localStyles.centreArrow}
        />
        
        {renderIf(this.state.runFireworks,
        <ViroParticleEmitter
          position={[0, 0, -1]}
          duration={20000}
          run={this.state.runFireworks}
          
          image={{
            source:require('../public/images/Icons/icon_twitter.png'),                 
            height:0.1,
            width:0.1,
          }}
        />)}


        <ViroARCamera>
        
        {renderIf(this.state.showLeft,
         <ViroImage
          source={require('../public/images/ar_d_left.png')} 
          scale={[.1, .1, .1]} 
          position={[0, 0, -10]}
          style={localStyles.centreArrow}
        />
        )}

        {renderIf(this.state.showRight,
         <ViroImage
          source={require('../public/images/ar_d_right.png')} 
          scale={[.1, .1, .1]} 
          position={[0, 0, -10]}
          style={localStyles.centreArrow}
        />
        )}


    </ViroARCamera>


      </ViroARScene>
 
    );
    
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      //Test
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }


}

var localStyles = StyleSheet.create({
   arrowContainer : {
    alignItems: 'center',
    justifyContent: 'center'
  },
  centreArrow : {
    width: 50,
    height: 50
    
  }
});


module.exports = ARScene;
