'use strict';

import React, { Component } from 'react';

import {StyleSheet, View, Image} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroConstants,
  ViroAnimatedImage,
  ViroParticleEmitter
} from 'react-viro';

export default class ARScene extends Component {

  constructor() {
    super();

    this.state = {
     runFireworks : false
    };

    this._onInitialized = this._onInitialized.bind(this);
  }


  render() {
    return (
   
      <ViroARScene onTrackingUpdated={this._onInitialized} 
      style={{backgroundColor:'transparent'}} >
       
        <ViroAnimatedImage
          source={require('../public/images/BTC-Spinning_small.gif')} 
          scale={[.5, .5, .5]} 
          position={[0, 0, -1]}
          onClick={this._clicked}
        />

        <ViroParticleEmitter
          position={[0, 0, -1]}
          duration={20000}
          run={this.state.runFireworks}
          
          image={{
            source:require('../public/images/Icons/icon_twitter.png'),                 
            height:0.1,
            width:0.1,
          }}
        />

      </ViroARScene>
 
    
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      //Show tracking status
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

module.exports = ARScene;
