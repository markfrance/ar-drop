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
   this._createAllParachutes = this._createAllParachutes.bind(this);
   this._createParachutes = this._createParachutes.bind(this);
  }

  componentDidMount() {
    let parachuteItems = this._createParachutes(10, 10);

    this.setState({
      parachutes: parachuteItems
    });
  }

  _updateScore(value) {
    this.props.sceneNavigator.viroAppProps.updateScore(value);
  }
  
  /* Creates all parachutes that will be used throughout the game 
   * @param amount Total number of parachutes.
   * @param totalValue Value of total prize for the game
   * @param bombRatio e.g. if bombRatio is 10.
   * 1 in 10 parachutes should be bombs
  */
  _createAllParachutes(amount, totalValue, bombRatio) {
    //let startAngle = 0;
    let parachutes = [];
  
    let bombAmount = Math.floor(amount / bombRatio);
    let parachuteAmount = amount - bombAmount;

    let bombValue = Math.floor(totalValue / bombRatio);
    
    parachutes.push(
      this._createParachutes(parachuteAmount, totalValue, false));
    parachutes.push(
      this._createParachutes(bombAmount, bombValue, true));
      
    return parachutes;
  }

  _createParachutes(amount, totalValue, isBomb) {

    const MIN_SPEED = 0.1;

    let parachuteValue = totalValue / amount;
    let items = [];
    for(let i=0; i<amount; i++) {

      let angle = Math.random()*Math.PI*2;

      //180 degree mode
      if(this.state.degrees === 180) {
        angle = Math.random()*Math.PI;
       }

      let speed = Math.random() + MIN_SPEED;

      items.push(<Parachute
        xPos={Math.cos(angle)*8}
        zPos={Math.sin(angle)*8}
        initialSpeed={speed}
        isBomb={isBomb}
        value={parachuteValue}
      />);

      return items;

      /*
      {
        xPos:Math.cos(angle)*8,
        zPos:Math.sin(angle)*8,
        initialSpeed:speed,
        isBomb: isBomb,
        value: parachuteValue
      }
      */
    }
  }

  render() {
    
    return (
      <ViroARScene>
        <ViroAmbientLight color="#ffffff" intensity={100}/>
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
