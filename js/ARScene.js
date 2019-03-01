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

import renderIf from './renderif';

export default class ARScene extends Component {

  constructor() {
    super();

    this.state = {
     runFireworks : false,
     showLeft :false,
     showRight : false
    };

    this._onInitialized = this._onInitialized.bind(this);
  }


  componentDidMount() {

    startHeading();
  }

 startHeading() {
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

        renderIf(this.state.showRight,
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

module.exports = ARScene;
