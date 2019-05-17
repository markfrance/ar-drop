import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ViroAnimatedImage,
  ViroScene,
  ViroText,
  ViroAmbientLight,
  ViroDirectionalLight,
  ViroImage,
  Viro3DObject,
  ViroMaterials,
  ViroPolygon,
  ViroSpinner,
  ViroNode
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
	      parachuteOpened: false,
	      value: 0,
	      speed: 0.5,
	      currentState: parachuteState.parachute
	    };

	    this._clickParachute = this._clickParachute.bind(this);
	    this._startFalling = this._startFalling.bind(this);
      this._renderParachute = this._renderParachute.bind(this);
      this._bombExplode = this._bombExplode.bind(this);
      this._coinExplode = this._coinExplode.bind(this);
      this._renderCoinExplosion = this._renderCoinExplosion.bind(this);
      this._renderBombExplosion = this._renderBombExplosion.bind(this);

  	}

  	componentDidMount() {
	   // this._startFalling();
  	}

  	_startFalling() {
  		this.interval = setInterval(
	    () => this.setState({ yPos: this.state.yPos-this.state.speed }),
	    100
	    );
  	}

  	componentDidUpdate() {
  		
  		//Open parachute and slow down speed
  		if(this.state.yPos === -5 && this.state.parachuteOpened == false) {
  		  this.setState({
  		  	parachuteOpened: true, 
  		  	speed: this.state.speed / 2
  		  })
  		}
  		

  		//Parachute hits ground
	    if(this.state.yPos === -5) {
	      this.setState({
	      	yPos: 20,
	      	parachuteOpened:false,
	      	speed: this.props.initialSpeed});      
	      //Stop falling
	      clearInterval(this.interval);
	      //Restart falling after animation
	      setTimeout(() => this._startFalling(), 3000);
	    }
  	}

  	_bombExplode() {
  		this.setState({currentState: parachuteState.bombExplosion });

  		this._collectedAfterAnimation(3000);
  	}

  	_coinExplode() {
  		this.setState({currentState: parachuteState.coinExplosion });
  		this.props.updateScore(1);
  		this._collectedAfterAnimation(3000);
  	}

  	_collectedAfterAnimation(duration) {
  		this.interval = setInterval(
	    () => this.setState({ currentState: parachuteState.collected}),
	    duration
	    );
  	}

  	_clickParachute() {
  		if(this.props.isBomb) {
  			this._bombExplode();
  		} else {
  			this._coinExplode();
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
          source={require('../../../public/models/Parachute_clash_flipped_OBJ.obj')}
          resources={[require('../../../public/models/Parachute_clash_flipped_OBJ.mtl'),
          require('../../../public/models/b_difuse.png'),
          require('../../../public/models/box_gradient_2.png'),
          require('../../../public/models/boxgradient_1.png'),
          require('../../../public/models/clash_opacity.png'),
          require('../../../public/models/parachute_gradient_1.png'),
          require('../../../public/models/string_gradient_1.png'),
          require('../../../public/models/clash_difuse.jpg')]}
          highAccuracyEvents={true}
          position={[0,0,0]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[0, 0, 0]}
          type="OBJ"
          onClick={() => this._clickParachute()}
          physicsBody={{
            type:'static',
            velocity:[0,1,0]
            }}
            />
      )
    }

  	render() {
  		return(
  			
        <ViroNode
        position={[this.props.xPos, this.state.yPos, this.props.zPos]}>
         <ViroAmbientLight color="#ffffff"/>
             
          {renderIf(
            this.state.currentState === parachuteState.parachute,
            this._renderParachute()
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