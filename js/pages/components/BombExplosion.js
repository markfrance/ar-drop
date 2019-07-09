import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ViroParticleEmitter,
  ViroNode,
  ViroSound
  } from 'react-viro';

export default class BombExplosion extends Component {

	constructor(props) {
      super(props);

	    this.state = {
	     
      };

	}

  	render() {
  		return(
            <ViroParticleEmitter
              position={[0, 4.5, 0]}
              duration={2000}
              visible={true}
              delay={0}
              run={true}
              loop={false}
              fixedToEmitter={true}

              image={{
                source:require("../../../public/images/particle_fire.png"),                 
                height:0.1,
                width:0.1,
                bloomThreshold:1.0
              }}

              spawnBehavior={{
                particleLifetime:[4000,4000],
                emissionRatePerSecond:[150, 200], 
                emissionBurst:[
                {time:0, min:300, max:350, cycles:1}],
                spawnVolume:{
                  shape:"sphere", 
                  params:[20, 1, 20], 
                  spawnOnSurface:false
                },
                maxParticles:700
              }}

              particleAppearance={{
                opacity:{
                  initialRange:[0, 0],
                  factor:"time",
                  interpolation:[
                    {endValue:0.5, interval:[0,500]},
                    {endValue:1.0, interval:[4000,5000]}
                  ]
                },

                rotation:{
                  initialRange:[0, 360],
                  factor:"time",
                  interpolation:[
                    {endValue:1080, interval:[0,5000]},
                  ]
                },

                scale:{
                  initialRange:[[5,5,5], [10,10,10]],
                  factor:"time",
                  interpolation:[
                    {endValue:[3,3,3], interval:[0,4000]},
                    {endValue:[0,0,0], interval:[4000,5000]}
                  ]
                },

              }}
              
              particlePhysics={{
                explosiveImpulse:{impulse:0.12 * 8,
                  position:[0,0,0],
                  decelerationPeriod:1.0}
              }}
            />

      		);
  	}
}

module.exports = BombExplosion;