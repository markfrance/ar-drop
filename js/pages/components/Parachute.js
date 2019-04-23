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

export default class Parachute extends Component {

	constructor(props) {
      super(props);

	    this.state = {
	      xPos: 0,
	      yPos: 0,
	      zPos: 0,
	      value: 0,
	      speed: 1,
	      isBomb: false,
	      collected: false
	    }

	    this._clickParachute = this._clickParachute.bind(this);
  	}

  	componentDidMount() {
	    this.interval = setInterval(
	    () => this.setState(({ yPos: this.state.yPos-0.1 })),
	    100
	    );
  	}

  	componentDidUpdate() {
	    if(this.state.yPos < -1) {
	      this.setState(({yPos: 10}));
	    }
  	}

  	_clickParachute() {
  		this.setState({collected: true});
  	}

  	render() {
  		return(
  			<ViroImage source={require('../../../public/images/AR-DropEthereumParachute.png')}
         transformBehaviors={['billboard']}
         position={[this.state.xPos, 
              this.state.yPos,
              this.state.zPos]}
      />)
  	}

}


module.exports = Parachute;