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
      speed: 10,
      score: 0,
      degrees: 360
    };

   this._updateScore = this._updateScore.bind(this);
   //
  }

  _updateScore(value) {
    this.setState({
      score: this.state.score + value
    });
  }
  
  _renderParachutes(amount) {
    let parachutes = [];
    let zLimit = 5;

    if(this.state.degrees === 180) {
      zLimit = 10;
    }

    for(let i=0; i<amount; i++) {

      let angle = Math.random()*Math.PI*2;
      parachutes.push(

        <Parachute
          xPos={Math.cos(angle)*8}
          zPos={Math.sin(angle)*8}
          initialSpeed={1}
          isBomb={false}
          updateScore={this._updateScore}
      />
         
          );
    }
    return parachutes;
  }

  render() {
    let parachutes = this._renderParachutes(10);

    return (
      <ViroARScene>
        <ViroAmbientLight color="#ffffff" intensity={200}/>
        <ViroDirectionalLight
          color="#ffffff"
          direction={[0, -1, 0]}
        />

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
