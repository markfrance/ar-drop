import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ViroParticleEmitter,
  ViroNode,
  ViroSound
  } from 'react-viro';


export default class CoinExplosion extends Component {

	constructor(props) {
      super(props);

	    this.state = {
      };
	}
 
  	render() {


  		return(
        <ViroNode position={[0,0,0]}>
         <ViroSound paused={false} muted={false} loop={false}
            source={this.props.sound} />
          <ViroParticleEmitter
            position={[0, 3, 0]}
            duration={4000}
            visible={true}
            delay={0}
            run={true}
            loop={false}
            fixedToEmitter={true}

            image={{
              source:this.props.particle,                 
              height:0.5,
              width:0.5
            }}

            spawnBehavior={{
              particleLifetime:[1000,3000],
              emissionRatePerSecond:[150, 400], 
              emissionBurst:[
                {time:0, min:30, max:350, cycles:1}],
              spawnVolume:{
                shape:"sphere", 
                params:[3, 1, 3], 
                spawnOnSurface:false
              },
              maxParticles:100
            }}            
           particlePhysics={{
                explosiveImpulse:{impulse:0.12 * 20,
                  position:[0,0,0],
                  decelerationPeriod:1.0}
              }}
          />
        </ViroNode>

      		);
  	}
}

module.exports = CoinExplosion;