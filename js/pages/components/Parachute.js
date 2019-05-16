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
	      yPos: 10,
	      parachuteOpened: false,
	      value: 0,
	      speed: 1,
	      isBomb: false,
	      currentState: parachuteState.parachute
	    };

	    this._clickParachute = this._clickParachute.bind(this);
	    this._startFalling = this._startFalling.bind(this);
  	}

  	componentDidMount() {
	    this._startFalling();
  	}

  	_startFalling() {
  		this.interval = setInterval(
	    () => this.setState({ yPos: this.state.yPos-this.state.speed }),
	    100
	    );
  	}

  	componentDidUpdate() {
  		
  		//Open parachute and slow down speed
  		if(this.state.yPos < -5 && this.state.parachuteOpened == false) {
  		  this.setState({
  		  	parachuteOpened: true, 
  		  	speed: this.state.speed / 2
  		  })
  		}

  		//Parachute hits ground
	    if(this.state.yPos < -1) {
	      this.setState({currentState: parachuteState.bombExplosion});      
	      //Stop falling
	      clearInterval(this.interval);
	      //Restart falling after animation
	      setTimeout(() => this._startFalling(), 3000);
	    }
  	}

  	_respawn() {

  	}

  	_bombExplode() {
  		this.setState({currentState: parachuteState.bombExplosion });

  		this._collectedAfterAnimation(3000);
  	}

  	_coinExplode() {
  		this.setState({currentState: parachuteState.coinExplosion });
  		
  		this._collectedAfterAnimation(3000);
  	}

  	_collectedAfterAnimation(duration) {
  		this.interval = setInterval(
	    () => this.setState({ currentState: parachuteState.collected}),
	    duration
	    );
  	}

  	_clickParachute() {
  		if(this.state.isBomb) {
  			this._bombExplode();
  		} else {
  			this._coinExplode();
  		}

  		this.setState({currentState: parachuteState.collected});
  	}

  	/*_renderValueText(value) {
  		return(
  			<ViroText
  			 text=value />
  			)
  	}*/

  	/*_renderCoinExplosion() {
  		return();
  	}*/

  	render() {
  		return(
  			
  <ViroNode
  position={[this.props.xPos, 5, this.props.zPos]}>
   <ViroAmbientLight color="#ffffff" intensity={200}/>
        
  <ViroText
    text="Hello World"
    color="#ff0000"
    width={2} height={2}
    style={{fontFamily:"Arial", fontSize:20, fontStyle:"italic", color:"#0000FF"}}
    position={[0,0,0]}
 />

<Viro3DObject
    source={require('../../../public/models/Parachute_clash_flipped_OBJ.obj')}
    highAccuracyEvents={true}
    position={[0,0,0]}
    scale={[1, 1, 1]}
    rotation={[0, 0, 0]}
    type="OBJ"
    transformBehaviors={["billboard"]}/>

    </ViroNode>
    
      		);
  	}
}

module.exports = Parachute;