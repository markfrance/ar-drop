import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';
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
      hasStarted:false,
      parachuteLoaded:false,
      bombLoaded:false,
      resLoaded:false,
      particleLoaded:false,
      soundsLoaded:false
    };

   this._updateScore = this._updateScore.bind(this);
   this._createAllParachutes = this._createAllParachutes.bind(this);
   this._createParachutes = this._createParachutes.bind(this);
   this._getValues = this._getValues.bind(this);
   this._onTrackingUpdated = this._onTrackingUpdated.bind(this);
   this._loadResources = this._loadResources.bind(this);
   this._loadParachuteModel = this._loadParachuteModel.bind(this);
   this._loadBombModel = this._loadBombModel.bind(this);
   this._loadExplosionSounds = this._loadExplosionSounds.bind(this);
   this._loadParticleImage = this._loadParticleImage.bind(this);

  }

  componentWillMount() {
    this._loadParachuteModel();
    this._loadBombModel();
    this._loadResources();
    this._loadExplosionSounds();
    this._loadParticleImage();
  }

  componentDidMount() {

    let parachuteItems = this._createAllParachutes(
      this.state.amount, 
      this.state.totalValue);

    this.setState({
      parachutes: parachuteItems
      });
   }
 
    _loadParachuteModel() {

      var promise = new Promise(resolve => {

        let parachute;
        
        if(this.state.crypto === "BTC")  {
          parachute = require('../../public/models/Bitcoin_Parachute.vrx')
        } else if (this.state.crypto === "ETH") {
          parachute = require('../../public/models/Ethereum_Parachute.vrx')
        } else {
          parachute = require('../../public/models/Clash_Parachute.vrx')
        }
      
        resolve(this.setState({
            parachuteModel:parachute,
            parachuteLoaded:true
          }))
        
      });
    }

    _loadBombModel() {


      var promise = new Promise(resolve => {
        let bomb;
        
        if(this.state.crypto === "BTC")  {
          bomb = require('../../public/models/Bomb_Bitcoin.vrx')
        } else if (this.state.crypto === "ETH") {
          bomb = require('../../public/models/Bomb_Etherum.vrx')
        } else {
          bomb = require('../../public/models/Bomb_Clash.vrx')
        }
        

       resolve(this.setState({
            bombModel:bomb,
            bombLoaded:true
          }))
        
      });
    }


    _loadResources() {

      var promise = new Promise(resolve => {

        let res;
        let bombRes;
        
          if(this.state.crypto === "BTC")  {
            bombRes = [require('../../public/models/bitcoin_bomb.jpg'),
            require('../../public/models/parachute_gradient_1.png'),
            require('../../public/models/string_gradient_1.png'),
            require('../../public/models/b_difuse.png')
            ]
            res = [require('../../public/models/bitcoin.png'),
            require('../../public/models/parachute_gradient_1.png'),
            require('../../public/models/string_gradient_1.png'),
            require('../../public/models/b_difuse.png')
            ];

          } else if (this.state.crypto === "ETH") {
            bombRes = [require('../../public/models/aetherium bomb.jpg'),
            require('../../public/models/grey baked.jpg'),
            require('../../public/models/parachute_gradient_1.png'),
            require('../../public/models/string_gradient_1.png')
            ]
            res = [ require('../../public/models/grey baked.jpg'),
            require('../../public/models/parachute_gradient_1.png'),
            require('../../public/models/string_gradient_1.png')
           ]
          } else {
            bombRes = [require('../../public/models/clash bomb.jpg'),
            require('../../public/models/clash_box_color.jpg'),
            require('../../public/models/parachute_gradient_1.png'),
            require('../../public/models/string_gradient_1.png')
            ]
            res = [require('../../public/models/clash_box_color.jpg'),
             require('../../public/models/parachute_gradient_1.png'),
            require('../../public/models/string_gradient_1.png')
            ]
          }

          resolve(this.setState({
            resources:res,
            bombResources:bombRes,
            resLoaded:true
          }));

      });

    }


    _loadParticleImage() {

      var promise = new Promise(resolve => {
       let image;
        
        if(this.state.crypto === "BTC")  {
          image = require('../../public/images/BitcoinParticle.png');
        } else if (this.state.crypto === "ETH") {
          image = require('../../public/images/ETHParticle.png')
        } else {
          image = require('../../public/images/ClashParticle.png')
        }
        

        let bombParticle = require("../../public/images/particle_fire.png");


       resolve(this.setState({
            particleImage:image,
            bombParticleImage:bombParticle,
            particleLoaded:true
          }));

      });

  }

  _loadExplosionSounds() {

      var promise = new Promise(resolve => {
        let bombSound = require("../../public/sounds/explosion.wav");
        let coinSound = require("../../public/sounds/coins.mp3");

    resolve(this.setState({
      bombExplosionSound:bombSound,
      coinExplosionSound:coinSound,
      soundsLoaded:true
    }));

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
  _createAllParachutes(amount, totalValue) {

    let parachutes = [];
    
    parachutes.push(
      this._createParachutes(10, totalValue));
    
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

  _createParachutes(amount, totalValue) {

    const MIN_SPEED = 0.1;
    const SPEED_RATIO = 5;
    let DISTANCE = 10;
    let rows = 2;

    let parachuteValue = totalValue / amount;
    let items = [];
    let parachuteData = [];
    let values = this._getValues(amount, totalValue);

    if(this.state.degrees == '180') {
      amount = 4;
      rows = 3;
    }

    for(let i=0; i<amount; i++) {

      let angle = ((Math.PI*2) / amount) * i;


      //180 degree mode
      if(this.state.degrees === '180') {
        angle = (((Math.PI / 2.5) / amount) * i) - (Math.PI * 0.65);
      }

      let speed = 3.5;


      for(let i=0; i <rows; i++) {

        if(i==0) {
          DISTANCE = 12
        }
        else{
          DISTANCE = DISTANCE + (5 * i);
        }

        let xPosition = Math.cos(angle)*DISTANCE;
        let zPosition = Math.sin(angle)*DISTANCE;

        items.push(<Parachute
        xPos={xPosition}
        zPos={zPosition}
        initialSpeed={speed}
        delay={i}
        value={1}//values[i]
        crypto={this.state.crypto}
        updateScore={this.props.sceneNavigator.viroAppProps.updateScore}
        parachuteModel={this.state.parachuteModel}
        bombModel={this.state.bombModel}
        resources={this.state.resources}
        bombResources={this.state.bombResources}
        particleImage={this.state.particleImage}
        bombParticleImage={this.state.bombParticleImage}
        coinExplosionSound={this.state.coinExplosionSound}
        bombExplosionSound={this.state.bombExplosionSound}

        />);
    }

    }
      return items;
  }


  _onTrackingUpdated(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL && 
      this.state.parachuteLoaded && 
      this.state.bombLoaded && 
      this.state.resLoaded &&
      this.state.particleLoaded &&
      this.state.soundsLoaded){
      if(!this.state.hasStarted) {
        
      this.props.sceneNavigator.viroAppProps.stopwatchStart();
        this.setState({hasStarted: true});
      }
    }
      this.props.sceneNavigator.viroAppProps.updateTrackingMessages(state, reason);
  }


  render() {

    return( <ViroARScene onTrackingUpdated={this._onTrackingUpdated}
       displayPointCloud={!this.state.hasStarted}
      >
        <ViroAmbientLight color="#ffffff" intensity={500}/>

         {renderIf(this.state.hasStarted,  
          this.state.parachutes
          )}
      </ViroARScene>
      );
  }

}

module.exports = ParachuteScene;
