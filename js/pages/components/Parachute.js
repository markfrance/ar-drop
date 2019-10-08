import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ViroAmbientLight,
  Viro3DObject,
  ViroNode,
  ViroSound,
  ViroAnimations
} from 'react-viro';

import renderIf from '../../renderif';
import CoinExplosion from './CoinExplosion.js';
import BombExplosion from './BombExplosion.js';


const parachuteState = {
    parachute: 1,
    coinExplosion: 2,
    bombExplosion: 3,
    collected: 4
  };

const START_Y_POSITION = 20;
const PARACHUTE_OPEN_Y = 7;
const CLICK_BELOW = 15;
const FLOOR = -15;

export default class Parachute extends Component {

  constructor(props) {
      super(props);

      this.state = {
        yPos: START_Y_POSITION - 10,
        parachuteOpened: false,
        speed: props.initialSpeed,
        currentState: parachuteState.parachute,
        crypto: props.crypto,
        isBomb: false,
        show: false
        };

      this._startFalling = this._startFalling.bind(this);
      this._renderParachute = this._renderParachute.bind(this);
      this._renderCoinExplosion = this._renderCoinExplosion.bind(this);
      this._renderBombExplosion = this._renderBombExplosion.bind(this);
      this._coinClick = this._coinClick.bind(this);
      this._bombClick = this._bombClick.bind(this);
      this._coinHitsGround = this._coinHitsGround.bind(this);
      this._bombHitsGround = this._bombHitsGround.bind(this);
      this._restart = this._restart.bind(this);
      this._hitGround = this._hitGround.bind(this);
      this._setParachuteRef = this._setParachuteRef.bind(this);
      this._decideIfBomb = this._decideIfBomb.bind(this);
      this._onAnimationFinished = this._onAnimationFinished.bind(this);
      this._animateFalling = this._animateFalling.bind(this);
      this._stopFalling = this._stopFalling.bind(this);

    }


    componentWillMount() {
      this._decideIfBomb();
    }


    _decideIfBomb() {
      this.setState({
        isBomb: Math.random() < 0.28
      });
    }

    componentDidMount() {

      //randomise short delay before falling
      let animationDelay = Math.random() * 3000;

      if(this.props.delay != 0) {
        animationDelay = (animationDelay + 3000) * this.props.delay;
      }

      this.timeout = setTimeout(() =>{
      this.animation = requestAnimationFrame(this._animateFalling)
      this.setState({show:true})
        }, animationDelay);

  /*    ViroAnimations.registerAnimations({
    fall:{properties:{positionY:-15.0},
                   easing:"Linear", 
                 duration: 6000,
                 delay:animationDelay},
    });
*/
    }

    _animateFalling() {
      this.setState({
        yPos: this.state.yPos - this.state.speed
      })

      requestAnimationFrame(this._animateFalling);
    }

    componentWillUnmount() {
      clearTimeout(this.timeout);
      cancelAnimationFrame(this.animation);
    }

    componentDidUpdate() {
      if(this.state.yPos < FLOOR && 
        this.state.currentState === parachuteState.parachute) {
          this._hitGround();
      }

     if(this.state.yPos < PARACHUTE_OPEN_Y && !this.state.parachuteOpened) {
        this.setState({
          speed: this.props.initialSpeed / 10,
          parachuteOpened: true,
        });
      }
      
      
    }

    _startFalling() {
      this._decideIfBomb();

      this.setState({
        currentState: parachuteState.parachute,
        speed: this.props.initialSpeed / 26,
        yPos: START_Y_POSITION
      });

   /*   this.state.parachuteRef.setNativeProps({
      position : [this.props.xPos, START_Y_POSITION, this.props.zPos]
    });
*/
    }


    _stopFalling() {

      clearTimeout(this.timeout);
      cancelAnimationFrame(this.animation);
    }

    _restart() {

      this.timeout = setTimeout(this._startFalling, 1000);
    }


    _coinClick() {

      requestAnimationFrame(() => {
        this.setState( {
          falling: false,
        parachuteOpened: false,
          currentState: parachuteState.coinExplosion
        });
        
        this.props.updateScore(this.props.value);
        this._stopFalling();
        this._restart(); 
      });
    }

    _bombClick() {

      requestAnimationFrame(() => {
        this.setState( { 
          falling: false,
          parachuteOpened: false,
          currentState: parachuteState.bombExplosion
        });

        this.props.updateScore(-this.props.value);
        this._stopFalling();
        this._restart();
      });
    }

    _bombHitsGround() {


      this._stopFalling();

      this.setState( {
        falling: false,
        currentState: parachuteState.bombExplosion,
        parachuteOpened: false,
      });
      this._restart();
    }

    _coinHitsGround() {
      this.setState( { 
        falling: false,
        currentState: parachuteState.collected,
        parachuteOpened: false,
      });
      this._restart();
    }

    _hitGround() {
      if(this.state.currentState === parachuteState.parachute) {
     
        if(this.state.isBomb) {
          this._bombHitsGround();
        }
        else {
          this._coinHitsGround();
        }
      }
    }

    _renderCoinExplosion() {
      return(
        <CoinExplosion particle={this.props.particleImage}
        sound={this.props.coinExplosionSound}/>
      );
    }

    _renderBombExplosion() {
      return(
        <BombExplosion particle={this.props.bombParticleImage} 
        sound={this.props.bombExplosionSound}/>
      );
    }

    _renderParachute() {
      return(
        <Viro3DObject
          source={this.props.parachuteModel}
          resources={this.props.resources}
          position={[0,0,0]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[-90, 0, 0]}
          type="VRX"
          onClick={this._coinClick}
            />);
    }

    _renderParachuteBomb() {
      return(
         <Viro3DObject
          source={this.props.bombModel}
          resources={this.props.bombResources}
          position={[0,0,0]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[-90, 0, 0]}
          type="VRX"
          onClick={this._bombClick}
            />);
    }


    _setParachuteRef(component) {
      this.setState({
        parachuteRef: component
      })
    }

    _onAnimationFinished() {
      this._startFalling();
    }

    render() {

      if(!this.state.show) {
        return null;
      }
  
      return(
        <ViroNode
        position={[this.props.xPos, this.state.yPos, this.props.zPos]}
        
        ref={this._setParachuteRef}
        >

         <ViroAmbientLight color="#ffffff" intensity={300}/>
          
          {renderIf(this.state.isBomb === false &&
            this.state.currentState === parachuteState.parachute,
            this._renderParachute()
          )}

          {renderIf(this.state.isBomb === true &&
            this.state.currentState === parachuteState.parachute,
            this._renderParachuteBomb()
          )}

          {renderIf(
            this.state.currentState === parachuteState.bombExplosion,
            this._renderBombExplosion()
          )}

          {renderIf(
            this.state.currentState === parachuteState.coinExplosion,
            this._renderCoinExplosion()
          )}
          
        </ViroNode>
      
      );
    }
}


  

module.exports = Parachute;