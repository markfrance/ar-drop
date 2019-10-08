import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ViroAnimatedImage,
  ViroNode,
  ViroSound

  } from 'react-viro';

export default class BombExplosionGif extends Component {

	constructor(props) {
      super(props);

	    this.state = {
	     
      };
	}

  	render() {
  		return(
         <ViroNode position={[0,0,0]}>
         <ViroSound paused={false} muted={false} loop={false}
            source={require("../../../public/sounds/explosion.wav")}
            volume={1.0} />
            <ViroAnimatedImage
          scale={[8, 8, 8]} 
          position={[0, 0, 0]}
          transformBehaviors={['billboard']}
          source={require("../../../public/images/explosion.gif")}
          />
        </ViroNode>
      		);
  	}
}

module.exports = BombExplosionGif;