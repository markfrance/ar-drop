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
      degrees: 360,
      created: false,
      parachutes:[]
    };

   this._updateScore = this._updateScore.bind(this);
   this._createParachutes = this._createParachutes.bind(this);
   //
  }


  componentDidMount() {
    let parachuteItems = this._createParachutes(10);

    this.setState({
      parachutes: parachuteItems
    });
  }


  _updateScore(value) {
    this.props.sceneNavigator.viroAppProps.updateScore(value);
  }
  
  _createParachutes(amount) {
    let parachutes = [];
    let zLimit = 5;

    if(this.state.degrees === 180) {
      zLimit = 10;
    }

    for(let i=0; i<amount; i++) {

      let angle = Math.random()*Math.PI*2;
      let speed = Math.random() + 0.1;
      parachutes.push(

        <Parachute
          xPos={Math.cos(angle)*8}
          zPos={Math.sin(angle)*8}
          initialSpeed={speed}
          isBomb={false}
          value={1}
          updateScore={this._updateScore}
      />
         
          );
    }

    let bombAngle = Math.random()*Math.PI*2;
    parachutes.push(
    <Parachute
          xPos={Math.cos(bombAngle)*8}
          zPos={Math.sin(bombAngle)*8}
          initialSpeed={0.5}
          isBomb={true}
          value={1}
          updateScore={this._updateScore}
      />)
    return parachutes;
  }

  render() {
    

    return (
      <ViroARScene>
        <ViroAmbientLight color="#ffffff" intensity={200}/>
        <ViroDirectionalLight
          color="#ffffff"
          direction={[0, -1, 0]}
        />

        {this.state.parachutes}
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
