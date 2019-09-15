import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import FireworkEmitter from '../FireworkEmitter.js';

import {
  ViroSceneNavigator,
  ViroScene,
  ViroCamera,
  ViroText,
  ViroARScene,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroConstants
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
      degrees: this.props.sceneNavigator.viroAppProps.mode,
      crypto: this.props.sceneNavigator.viroAppProps.crypto,
      created: false,
      parachutes:[],
      totalValue: 100,
      amount: 10,
      hasStarted:false
    };

   this._updateScore = this._updateScore.bind(this);
   this._createAllParachutes = this._createAllParachutes.bind(this);
   this._createParachutes = this._createParachutes.bind(this);
   this._getValues = this._getValues.bind(this);
   this._onTrackingUpdated = this._onTrackingUpdated.bind(this);
  }

  componentDidMount() {
    let parachuteItems = this._createAllParachutes(
      this.state.amount, 
      this.state.totalValue, 
      10);

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
      this._createParachutes(10, totalValue, false));
    parachutes.push(
      this._createParachutes(1, bombValue, true));
      
    return parachutes;
  }

  _getValues(amount, totalValue) {

    let values = [];
    let currentSum = 0;
    for(let i=0; i<amount; i++) {
      values.push(Math.random());
      currentSum += values[i];
    }

    for(let i=0; i<values.length; i++) {
      values[i] = values[i] / currentSum * totalValue;
    }

    return values;
  }

  /*
  Generates random distance between near and far distances
  */
  _getDistance(near, far) {
    return Math.random() * (far - near) + near;
  }

  _createParachutes(amount, totalValue, isBomb) {

    const MIN_SPEED = 0.1;
    const SPEED_RATIO = 5;
    const PARACHUTES_ON_SCREEN = 10;
    let DISTANCE = this._getDistance(6, 15);

    let lives = Math.floor(PARACHUTES_ON_SCREEN / amount);

    let parachuteValue = totalValue / amount;
    let items = [];
    let parachuteData = [];
    let values = this._getValues(amount, totalValue);

    for(let i=0; i<amount; i++) {

      let angle = Math.random()*Math.PI*2;

      //180 degree mode
      if(this.state.degrees === 180) {
        angle = Math.random()*(Math.PI / 1.4);
      }

      //let speed = (Math.random() + MIN_SPEED) / SPEED_RATIO;

      let xPosition = Math.cos(angle)*DISTANCE;
      let zPosition = Math.sin(angle)*DISTANCE;
      let speed = 3.5;

      items.push(<Parachute
        xPos={xPosition}
        zPos={zPosition}
        initialSpeed={speed}
        isBomb={isBomb}
        value={1}//values[i]
        crypto={this.state.crypto}
        lives={10}
        updateScore={this.props.sceneNavigator.viroAppProps.updateScore}
      />);

    }

     // this.props.sceneNavigator.viroAppProps.parachuteInfo(parachuteData);
      return items;
  }


  _onTrackingUpdated(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL){
      if(!this.state.hasStarted) {
        this.props.sceneNavigator.viroAppProps.stopwatchStart();
        this.setState({hasStarted: true});
      }
    } else {
      // TODO: pause game? show reason
    }
  }

  render() {
    
    return (
      <ViroARScene onTrackingUpdated={this._onTrackingUpdated}
      physicsWorld={{
        gravity:[0,5,0]
      }}>
        <ViroAmbientLight color="#ffffff" intensity={500}/>

        {this.state.parachutes}
      </ViroARScene>
    );
  }
}

module.exports = ParachuteScene;
