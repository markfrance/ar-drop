import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ViroText,
  ViroAmbientLight,
  ViroDirectionalLight,
  Viro3DObject,
  ViroMaterials,
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

const START_Y_POSITION = 22;
const PARACHUTE_OPEN_Y = 10;
const FLOOR = -15;

export default class Parachute extends Component {

  constructor(props) {
      super(props);

      this.state = {
        yPos: START_Y_POSITION,
        yRotation:0,
        parachuteOpened: false,
        speed: props.initialSpeed,
        currentState: parachuteState.parachute,
        pauseParachuteSound: true,
        crypto: props.crypto
      };

      this._startFalling = this._startFalling.bind(this);
      this._renderParachute = this._renderParachute.bind(this);
      this._renderCoinExplosion = this._renderCoinExplosion.bind(this);
      this._renderBombExplosion = this._renderBombExplosion.bind(this);
      this._onFinishSound = this._onFinishSound.bind(this);
      this._coinClick = this._coinClick.bind(this);
      this._bombClick = this._bombClick.bind(this);
      this._coinHitsGround = this._coinHitsGround.bind(this);
      this._bombHitsGround = this._bombHitsGround.bind(this);
      this._restart = this._restart.bind(this);
      this._loadParachuteModel = this._loadParachuteModel.bind(this);
      this._loadBombModel = this._loadBombModel.bind(this);
      this._loadResources = this._loadResources.bind(this);
      this._setParachuteRef = this._setParachuteRef.bind(this);
      this._hitGround = this._hitGround.bind(this);
      this._fallAnimation = this._fallAnimation.bind(this);
    }


    componentWillMount() {
      this._loadResources();

      if(this.props.isBomb) {
        this._loadBombModel()
      } else {
        this._loadParachuteModel();
      }
    }

    componentDidMount() {

      //randomise short delay before falling
      let delay = Math.random() * 3000;
      this.timeout = setTimeout(
         () => this._startFalling(),
         delay);
        
    }

    componentWillUnmount() {
      clearInterval(this.interval);
      clearTimeout(this.timeout);
    //  cancelAnimationFrame(this.animation);
    }

    _loadResources() {

      let res;
      
      if(this.props.isBomb) {
        if(this.state.crypto === "BTC")  {
          res = [require('../../../public/models/bitcoin_bomb.jpg'),
          require('../../../public/models/b_difuse.png'),
          require('../../../public/models/parachute_gradient_1.png'),
          require('../../../public/models/string_gradient_1.png')
          ]
        } else if (this.state.crypto === "ETH") {
          res = [require('../../../public/models/aetherium bomb.jpg'),
          require('../../../public/models/grey baked.jpg'),
          require('../../../public/models/parachute_gradient_1.png'),
          require('../../../public/models/string_gradient_1.png')
          ]
        } else {
          res = [require('../../../public/models/clash bomb.jpg'),
          require('../../../public/models/clash_box_color.jpg'),
          require('../../../public/models/parachute_gradient_1.png'),
          require('../../../public/models/string_gradient_1.png')
          ]
        }
      }
      else {
        if(this.state.crypto === "BTC")  {
          res = [require('../../../public/models/b_difuse.png'),
          require('../../../public/models/parachute_gradient_1.png'),
          require('../../../public/models/string_gradient_1.png')
          ];
        } else if (this.state.crypto === "ETH") {
          res = [ require('../../../public/models/grey baked.jpg'),
          require('../../../public/models/parachute_gradient_1.png'),
          require('../../../public/models/string_gradient_1.png')
         ]
        } else {
          res = [require('../../../public/models/clash_box_color.jpg'),
           require('../../../public/models/parachute_gradient_1.png'),
          require('../../../public/models/string_gradient_1.png')
          ]
        }
      }

      this.setState({
        resources:res
      });

    }

    _loadParachuteModel() {

      let parachute;
      
      if(this.state.crypto === "BTC")  {
        parachute = require('../../../public/models/Bitcoin_Parachute.vrx')
      } else if (this.state.crypto === "ETH") {
        parachute = require('../../../public/models/Ethereum_Parachute.vrx')
      } else {
        parachute = require('../../../public/models/Clash_Parachute.vrx')
      }
      this.setState({
        parachuteModel:parachute
      });
    }

    _loadBombModel() {
      let bomb;
      
      if(this.state.crypto === "BTC")  {
        bomb = require('../../../public/models/Bomb_Bitcoin.vrx')
      } else if (this.state.crypto === "ETH") {
        bomb = require('../../../public/models/Bomb_Etherum.vrx')
      } else {
        bomb = require('../../../public/models/Bomb_Clash.vrx')
      }
      this.setState({
        bombModel:bomb
      });
    }

    componentDidUpdate() {
      if(this.state.yPos < FLOOR && 
        this.state.currentState === parachuteState.parachute) {
          this._hitGround();
      }

      if(this.state.yPos < PARACHUTE_OPEN_Y && !this.state.parachuteOpened) {
        this.setState({
          speed: this.props.initialSpeed / 45,
          parachuteOpened: true,
          pauseParachuteSound: false
        });
      }

    }

    _startFalling() {
      this.setState({
        currentState: parachuteState.parachute,
        pauseParachuteSound: true,
        parachuteOpened: false,
        speed: this.props.initialSpeed / 10,
        yPos: START_Y_POSITION
      });

      this.interval = setInterval(this._fallAnimation, 14)
    }

    _fallAnimation() {
      this.setState({
          yPos: this.state.yPos - this.state.speed
        });
    }

    _restart() {
    
      clearInterval(this.interval);
     
      this.timeout = setTimeout(() => 
        this._startFalling(), 1000);
    }

    _coinClick = () => {

      if(this.state.yPos <= PARACHUTE_OPEN_Y) {

        this.props.updateScore(this.props.value);
        this.setState( {
          falling: false,
          currentState: parachuteState.coinExplosion
        });
        this._restart();
      }
    }

    _bombClick = () => {

      if(this.state.yPos <= PARACHUTE_OPEN_Y) {

     //cancelAnimationFrame(this.animation);

    //  clearInterval(this.interval);
        this.setState( { 
          falling: false,
          currentState: parachuteState.bombExplosion
        });
        this.props.updateScore(-this.props.value);
        this._restart();
      }
    }

    _bombHitsGround() {

      this.setState( {
        falling: false,
        currentState: parachuteState.bombExplosion
      });
      this._restart();
    }

    _coinHitsGround() {

      this.setState( { 
        falling: false,
        currentState: parachuteState.bombExplosion
      });
      this.props.updateScore(-this.props.value);
      this._restart();
    }

    _hitGround() {
      if(this.state.currentState === parachuteState.parachute) {
     
        if(this.props.isBomb) {
          this._bombHitsGround();
        }
        else {
          this._coinHitsGround();
        }
        
        this._restart();
      }

    }

    _renderValueText(value) {
      return(
        <ViroText
          text={value}
          color="#ff0000"
          width={2} height={2}
          style={{fontFamily:"Arial", fontSize:20, fontStyle:"italic", color:"#0000FF"}}
          position={[0,0,0]}
        />
        )
    }

    _renderCoinExplosion() {
      return(
        <CoinExplosion crypto={this.state.crypto}/>
      );
    }

    _renderBombExplosion() {
      return(
        <BombExplosion />
      );
    }

    _renderParachute() {
      return(
        <Viro3DObject
          source={this.state.parachuteModel}
          resources={this.state.resources}
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
          source={this.state.bombModel}
          resources={this.state.resources}
          position={[0,0,0]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[-90, 0, 0]}
          type="VRX"
          onClick={this._bombClick}
            />);
    }

    _onFinishSound() {
      this.setState({
        pauseParachuteSound: true
      });
    }

    _setParachuteRef(component) {
      this.setState({
        parachuteRef: component
      })
    }

    render() {
  
      let isFalling = this.state.falling;
      let current = this.state.currentAnimation;

      return(
        <ViroNode
        position={[this.props.xPos, this.state.yPos, this.props.zPos]}
        ref={this._setParachuteRef}
                  

          >
         <ViroAmbientLight color="#ffffff" intensity={300}/>

         <ViroSound paused={this.state.pauseParachuteSound}
      
           source={require('../../../public/sounds/parachuteopening.mp3')}
           loop={true}
           volume={1.0}/>
          
          {renderIf(this.props.isBomb === false &&
            this.state.currentState === parachuteState.parachute,
            this._renderParachute()
          )}

          {renderIf(this.props.isBomb === true &&
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

 ViroAnimations.registerAnimations({
    fall:{properties:{positionY:-15.0},
                  easing:"Linear", 
                  duration: 6000},
    restart:{properties:{
      positionY:22},
      easing:"linear",
      duration:1},
      fallRestart:[["fall","restart"],]
});


module.exports = Parachute;