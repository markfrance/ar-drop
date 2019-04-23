import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import FireworkEmitter from '../FireworkEmitter.js';

import {
  ViroSceneNavigator,
  ViroAnimatedImage,
  ViroARPlaneSelector,
  ViroScene,
  ViroARCamera,
  ViroCamera,
  ViroText,
  ViroARScene,
  ViroAmbientLight,
  ViroDirectionalLight,
  Viro360Video,
  Viro360Image,
  ViroImage,
  ViroUtils,
  ViroPortal,
  ViroPortalScene,
  Viro3DObject,
  ViroMaterials,
  ViroPolygon,
  ViroSpinner,
  ViroNode
} from 'react-viro';

import Parachute from '../pages/components/Parachute.js'
import renderIf from '../renderif';

export default class ParachuteScene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      yPos: 10,
      speed: 10
    };

   // this._parachuteClick = this._parachuteClick.bind(this);

   //
  }

  
  _renderParachutes(amount) {
    let parachutes = [];

    for(let i=0; i<amount; i++) {

      parachutes.push(

        <Parachute
          xPos={(Math.random() * 10) - 5}
          yPos={5}
          zPoz={(Math.random() * 10) - 5}
      />
         
          );
    }
    return parachutes;
  }

  render() {
    let parachutes = this._renderParachutes(10);

    return (
      <ViroARScene
      dragType="FixedToWorld" >
        <ViroAmbientLight color="#ffffff" intensity={200}/>
        <ViroDirectionalLight
          color="#ffffff"
          direction={[0, -1, 0]}
        />

        
        {renderIf(false,


        <ViroCamera position={[0,0,0]} active={true}>
        <ViroImage
            source={require('../../public/images/CryptoCreditWave.png')} 
            scale={[1, 0.3, 1]} 
            position={[0, -0.5, -1]}
            renderingOrder={-1}
            ignoreEventHandling={true}
          /> 
           <ViroImage
            source={require('../../public/images/ar_d_left.png')} 
            scale={[.01, .01, .01]} 
            position={[2.5, -3.5, -10]}
            style={localStyles.cryptoLogo}
            renderingOrder={1}

          /> 
          
          <ViroText style={localStyles.score} 
          scale={[1, 1, 1]} 
            position={[0.5, 0, -1]}
            text="0"/> 
        </ViroCamera>
        )}

        {parachutes}
      </ViroARScene>
    );
  }
}

var localStyles = StyleSheet.create({
  cryptoLogo: {
    width:100,
    height:100,
    right:0,
    bottom:0
  },
  score : {
    fontSize: 20
  }
  });

module.exports = ParachuteScene;
