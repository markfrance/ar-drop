import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ViroText,
  ViroAmbientLight,
  ViroDirectionalLight,
  Viro3DObject,
  ViroMaterials,
  ViroNode,
  ViroSound
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

export default class Parachute extends Component {

	constructor(props) {
      super(props);

	    this.state = {
	      yPos: 20,
        yRotation:0,
	      parachuteOpened: false,
	      speed: props.initialSpeed,
	      currentState: parachuteState.parachute,
        pauseParachuteSound: true,
        crypto: props.crypto,
        lives: props.lives
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
      let delay = Math.random() * 10000;
      this.timeout = setTimeout(
         () => this._startFalling(),
         delay);
      
  	}

    componentWillUnmount() {
      clearInterval(this.interval);
      clearTimeout(this.timeout);
    }

    _loadResources() {

      this.setState({resources:[require('../../../public/models/b_difuse.png'),
          require('../../../public/models/box_gradient_2.png'),
          require('../../../public/models/boxgradient_1.png'),
          require('../../../public/models/clash_opacity.png'),
          require('../../../public/models/parachute_gradient_1.png'),
          require('../../../public/models/string_gradient_1.png'),
          require('../../../public/models/clash_difuse.jpg'),
          require('../../../public/models/stripes_orange.jpg'),
          require('../../../public/models/white.jpg')]
        });
    }

    _loadParachuteModel() {

      let parachute;
      
      if(this.state.crypto === "BTC")  {
        parachute = require('../../../public/models/BTCParachuteLowPoly.vrx');
      } else if (this.state.crypto === "ETH") {
        parachute = require('../../../public/models/ETHParachuteLowPoly.vrx')
      } else {
        parachute = require('../../../public/models/CLASHParachuteLowPoly.vrx')
      }
      this.setState({
        parachuteModel:parachute
      });
    }

    _loadBombModel() {
      let bomb;
      
      if(this.state.crypto === "BTC")  {
        bomb = require('../../../public/models/BTCParachuteLowPoly.vrx');
      } else if (this.state.crypto === "ETH") {
        bomb = require('../../../public/models/ETHParachuteLowPoly.vrx')
      } else {
        bomb = require('../../../public/models/CLASHParachuteLowPoly.vrx')
      }
      this.setState({
        bombModel:bomb
      });
    }

  	_startFalling() {
      this.setState({
        currentState: parachuteState.parachute,
        pauseParachuteSound:false,
        speed: this.props.initialSpeed,
        yPos: 20
      });

  		this.interval = setInterval(
	    () => this.setState({ 
        yPos: this.state.yPos-(this.state.speed / 10),
        yRotation: this.state.yRotation+0.5 }),
	    16
	    );
  	}

  	componentDidUpdate() {
  		
  		//Parachute hits ground
	    if(this.state.yPos <= -8 && 
        this.state.currentState === parachuteState.parachute) {
	   
        if(this.props.isBomb) {
          this._bombHitsGround();
        }
        else {
          this._coinHitsGround();
        }
        
        this._restart();
	    }
  	}

    _restart() {
      if(this.state.lives === 0)
        return;

      clearInterval(this.interval);
      this.interval = setTimeout(() => 
        this._startFalling(), 1000);
    }

    _coinClick = () => {
      this.props.updateScore(this.props.value);
      this.setState( {
        lives: this.state.lives--,
        currentState: parachuteState.coinExplosion
      });
      this._restart();
    }

    _bombClick = () => {
      this.setState( { 
        currentState: parachuteState.bombExplosion
      });
      this.props.updateScore(-this.props.value);
      this._restart();
    }

    _bombHitsGround() {
      this.setState( {
        lives: this.state.lives--,
        currentState: parachuteState.bombExplosion
      });
      this._restart();
    }

    _coinHitsGround() {
      this.setState( { 
        currentState: parachuteState.bombExplosion
      });
      this.props.updateScore(-this.props.value);
      this._restart();
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
        <CoinExplosion />
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
          scale={[3, 3, 3]}
          rotation={[0, 0, 0]}
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
          scale={[3, 3, 3]}
          rotation={[0, 0, 0]}
          type="VRX"
          onClick={this._bombClick}
            />);
    }

    _onFinishSound() {
      this.setState({
        pauseParachuteSound: true
      });
    }

  	render() {
      if(this.props.lives === 0) {
        return (null);
      }

  		return(
        <ViroNode
        position={[this.props.xPos, this.state.yPos, this.props.zPos]}
        
          >
         <ViroAmbientLight color="#ffffff"/>

         <ViroSound paused={this.state.pauseParachuteSound}
           muted={this.state.pauseParachuteSound}
           source={require('../../../public/sounds/parachuteopening.mp3')}
           loop={false}
           volume={1.0}
           onFinish={this.onFinishSound}/>
          
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

module.exports = Parachute;